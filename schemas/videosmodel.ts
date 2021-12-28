
			
import type { Prisma } from '@prisma/client';
import { z } from 'zod';

const literal = z.union([z.string(), z.number(), z.boolean(), z.null()]);
const jsonValue: z.ZodSchema<Prisma.JsonValue> = z.lazy(() =>
	z.union([literal, z.array(jsonValue), z.record(jsonValue)])
);
const jsonSchema: z.ZodSchema<Prisma.InputJsonValue> = z.lazy(() =>
	z.union([z.undefined(), literal, z.array(jsonValue), z.record(jsonValue)])
);


			export type Include = Prisma.VideosModelInclude;
			export type Fields = Prisma.VideosModelSelect;
			export type Distinct = Prisma.Enumerable<Prisma.VideosModelScalarFieldEnum>;
			export type Query = Prisma.VideosModelWhereInput;
			export type QueryUnique = Prisma.VideosModelWhereUniqueInput;
			export type QueryOptions = {
				orderBy?: Prisma.VideosModelOrderByInput;
				limit?: number;
				offset?: number;
				include?: Include;
				fields?: Fields;
				distinct?: Distinct;
			};

			export type VideosModel = z.infer<typeof schema>
			export const schema = z.object({ id: z.string().min(25).optional(),description: z.string().optional(),galery: z.array(z.string()),dataId: z.number() });
			export const empty = { description: '',galery: [],dataId: 0 };
			 
			export function toDraft() {
				const data = { ...empty } as VideosModel;
				const selected = schema.pick({ description: true,galery: true,dataId: true })

				return { data, schema: selected };
			}

			
		