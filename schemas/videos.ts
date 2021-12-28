
			
import type { Prisma } from '@prisma/client';
import { z } from 'zod';

const literal = z.union([z.string(), z.number(), z.boolean(), z.null()]);
const jsonValue: z.ZodSchema<Prisma.JsonValue> = z.lazy(() =>
	z.union([literal, z.array(jsonValue), z.record(jsonValue)])
);
const jsonSchema: z.ZodSchema<Prisma.InputJsonValue> = z.lazy(() =>
	z.union([z.undefined(), literal, z.array(jsonValue), z.record(jsonValue)])
);


			export type Include = Prisma.VideosInclude;
			export type Fields = Prisma.VideosSelect;
			export type Distinct = Prisma.Enumerable<Prisma.VideosScalarFieldEnum>;
			export type Query = Prisma.VideosWhereInput;
			export type QueryUnique = Prisma.VideosWhereUniqueInput;
			export type QueryOptions = {
				orderBy?: Prisma.VideosOrderByInput;
				limit?: number;
				offset?: number;
				include?: Include;
				fields?: Fields;
				distinct?: Distinct;
			};

			export type Videos = z.infer<typeof schema>
			export const schema = z.object({ id: z.string().min(25).optional(),description: z.string().optional(),galery: z.array(z.string()),dataId: z.number(),created_at: z.union([z.string(), z.date()]).optional() });
			export const empty = { description: '',galery: [],dataId: 0,created_at: new Date() };
			 
			export function toDraft() {
				const data = { ...empty } as Videos;
				const selected = schema.pick({ description: true,galery: true,dataId: true,created_at: true })

				return { data, schema: selected };
			}

			
		