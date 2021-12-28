
			
import type { Prisma } from '@prisma/client';
import { z } from 'zod';

const literal = z.union([z.string(), z.number(), z.boolean(), z.null()]);
const jsonValue: z.ZodSchema<Prisma.JsonValue> = z.lazy(() =>
	z.union([literal, z.array(jsonValue), z.record(jsonValue)])
);
const jsonSchema: z.ZodSchema<Prisma.InputJsonValue> = z.lazy(() =>
	z.union([z.undefined(), literal, z.array(jsonValue), z.record(jsonValue)])
);


			export type Include = Prisma.DataInclude;
			export type Fields = Prisma.DataSelect;
			export type Distinct = Prisma.Enumerable<Prisma.DataScalarFieldEnum>;
			export type Query = Prisma.DataWhereInput;
			export type QueryUnique = Prisma.DataWhereUniqueInput;
			export type QueryOptions = {
				orderBy?: Prisma.DataOrderByInput;
				limit?: number;
				offset?: number;
				include?: Include;
				fields?: Fields;
				distinct?: Distinct;
			};

			export type Data = z.infer<typeof schema>
			export const schema = z.object({ id: z.string().min(25).optional(),userId: z.string(),created_at: z.union([z.string(), z.date()]).optional() });
			export const empty = { userId: '',created_at: new Date() };
			 
			export function toDraft() {
				const data = { ...empty } as Data;
				const selected = schema.pick({ userId: true,created_at: true })

				return { data, schema: selected };
			}

			
		