#!/usr/bin/env node

const { generatorHandler, DMMF } = require("@prisma/generator-helper");
const { writeFile } = require("fs/promises");
const { camelCase } = require("lodash");

const dependencies = `
import type { Prisma } from '@prisma/client';
import { z } from 'zod';

const literal = z.union([z.string(), z.number(), z.boolean(), z.null()]);
const jsonValue: z.ZodSchema<Prisma.JsonValue> = z.lazy(() =>
	z.union([literal, z.array(jsonValue), z.record(jsonValue)])
);
const jsonSchema: z.ZodSchema<Prisma.InputJsonValue> = z.lazy(() =>
	z.union([z.undefined(), literal, z.array(jsonValue), z.record(jsonValue)])
);
`;

async function transform(datamodel) {
  function toZodEnums(enums) {
    const result = {};
    for (const item of enums) {
      const values = item.values.map((e) => `'${e.name}'`).join(", ");
      result[item.name] = `z.enum([${values}])`;
    }
    return result;
  }

  function toEmptyField(field, enums) {
    let key = `${field.name}: `;

    if (field.kind === "enum") {
      if (typeof field.default === "string") {
        key += `'${field.default}'`;
      } else {
        key += `'${enums[field.type][0]}'`;
      }
    } else if (field.isList) {
      key += `[]`;
    } else {
      if (field.type == "Boolean") key += `false`;
      else if (field.type == "Int") key += `0`;
      else if (field.type == "Float") key += `0.0`;
      else if (field.type == "Decimal") key += `0.0`;
      else if (field.type == "BigInt") key += `0`;
      else if (field.type == "Json") key += `{}`;
      else if (field.type == "DateTime") key += `new Date()`;
      else if (field.type == "String") key += `''`;
      else key += `''`;
    }

    return key;
  }

  function getFields(model) {
    return model.fields
      .filter((f) => !f.isId)
      .filter((f) => !f.isGenerated)
      .filter((f) => !f.isUpdatedAt)
      .filter((f) => !f.relationName);
  }

  function toEmptyModel(model, enums) {
    const fields = getFields(model)
      .map((f) => toEmptyField(f, enums))
      .join(",");

    return `{ ${fields} }`;
  }

  function toZodField(field, enums) {
    let z = `${field.name}: `;

    if (field.kind == "enum") {
      z += enums[field.type];
    } else if (field.kind == "scalar" && field.isList) {
      const item =
        field.type === "String"
          ? `z.string()`
          : field.type === "Number"
          ? `z.number()`
          : `z.any()`;

      z += `z.array(${item})`;
    } else {
      if (field.type == "Boolean") z += `z.boolean()`;
      else if (field.type == "Int") z += `z.number()`;
      else if (field.type == "Float") z += `z.number()`;
      else if (field.type == "Decimal") z += `z.number()`;
      else if (field.type == "BigInt") z += `z.bigint()`;
      else if (field.type == "DateTime") z += `z.union([z.string(), z.date()])`;
      else if (field.type == "Json") z += `jsonSchema`;
      else if (field.type == "String") {
        z += `z.string()`;
        if (field.name == "email") z += `.email()`;
        if (field.name == "id") z += `.min(25)`;
      }
    }

    const isOptional =
      !field.isRequired || field.hasDefaultValue || field.isUpdatedAt;

    if (isOptional) {
      if (field.type == "DateTime") z += `.optional()`;
      else if (field.kind === "enum") z += `.optional()`;
      else if (field.name.toLowerCase().endsWith("id")) z += `.optional()`;
      else z += `.optional()`;
    }

    return z;
  }

  function toZodSchema(model, enums) {
    const fields = model.fields
      .filter((i) => !i.relationName)
      .map((f) => toZodField(f, enums))
      .join(",");

    return `z.object({ ${fields} })`;
  }

  function toEnum(modelName) {
    const toKeyValue = (v) => `${v.name} = '${v.name}'`;
    const toEnumConst = (e) => `
			export enum ${e.name} { ${e.values.map(toKeyValue).join(",")} }
		`;

    return datamodel.enums
      .filter((e) => e.name.startsWith(modelName))
      .map((e) => toEnumConst(e));
  }

  function toEnumsMap(enums) {
    const map = {};
    for (const { name, values } of enums) {
      map[name] = values.map((v) => v.name);
    }
    return map;
  }

  function toEmptyBooleanMap(model) {
    const toKeyBoolean = (f) => `${f.name}: true`;
    const fields = getFields(model).map(toKeyBoolean).join(",");
    return `{ ${fields} }`;
  }

  const zodEnums = toZodEnums(datamodel.enums);
  const enums = toEnumsMap(datamodel.enums);

  for (const model of datamodel.models) {
    const file = `${process.cwd()}/schemas/${model.name.toLowerCase()}.ts`;

    const content = `
			${dependencies}

			export type Include = Prisma.HasInclude;
			export type Fields = Prisma.${model.name}Select;
			export type Distinct = Prisma.Enumerable<Prisma.${model.name}ScalarFieldEnum>;
			export type Query = Prisma.${model.name}WhereInput;
			export type QueryUnique = Prisma.${model.name}WhereUniqueInput;
			export type QueryOptions = {
				orderBy?: Prisma.${model.name}OrderByWithAggregationInput;
				limit?: number;
				offset?: number;
				include?: Include;
				fields?: Fields;
				distinct?: Distinct;
			};

			export type ${model.name} = z.infer<typeof schema>
			export const schema = ${toZodSchema(model, zodEnums)};
			export const empty = ${toEmptyModel(model, enums)};
			 
			export function toDraft() {
				const data = { ...empty } as ${model.name};
				const selected = schema.pick(${toEmptyBooleanMap(model)})

				return { data, schema: selected };
			}

			${toEnum(model.name).join("\n")}
		`;

    await writeFile(file, content);
  }

  await writeFile(
    `${process.cwd()}/schemas/tables.ts`,
    `
		export default {
			${datamodel.models.map(
        (model) => `
				${camelCase(model.name)}: {
					columns: [${model.fields
            .filter((f) => !f.relationName)
            .map((f) => `'${f.name}'`)
            .join(",")}],
					relation: {
						${model.fields
              .filter((f) => f.relationName)
              .map((f) => `${f.name}: '${f.relationName}'`)
              .join(",")}
					},
					ref: {
						${model.fields
              .filter((f) => f.relationName)
              .map((f) => `${f.name}: '${f.type}'`)
              .join(",")}
					},
				}
			`
      )}
		}	
	`
  );
}

generatorHandler({
  onManifest() {
    return {
      defaultOutput: "schemas",
      prettyName: "Prisma to Zod Schema",
    };
  },
  async onGenerate(options) {
    await transform(options.dmmf.datamodel);
  },
});
