
			
import type { Prisma } from '@prisma/client';
import { z } from 'zod';

const literal = z.union([z.string(), z.number(), z.boolean(), z.null()]);
const jsonValue: z.ZodSchema<Prisma.JsonValue> = z.lazy(() =>
	z.union([literal, z.array(jsonValue), z.record(jsonValue)])
);
const jsonSchema: z.ZodSchema<Prisma.InputJsonValue> = z.lazy(() =>
	z.union([z.undefined(), literal, z.array(jsonValue), z.record(jsonValue)])
);


			export type Include = Prisma.ImagesInclude;
			export type Fields = Prisma.ImagesSelect;
			export type Distinct = Prisma.Enumerable<Prisma.ImagesScalarFieldEnum>;
			export type Query = Prisma.ImagesWhereInput;
			export type QueryUnique = Prisma.ImagesWhereUniqueInput;
			export type QueryOptions = {
				orderBy?: Prisma.ImagesOrderByInput;
				limit?: number;
				offset?: number;
				include?: Include;
				fields?: Fields;
				distinct?: Distinct;
			};

			export type Images = z.infer<typeof schema>
			export const schema = z.object({ id: z.string().min(25).optional(),avatar: z.string().optional(),galery: z.array(z.string()),dataId: z.number().optional(),created_at: z.union([z.string(), z.date()]).optional() });
			export const empty = { avatar: '',galery: [],dataId: 0,created_at: new Date() };
			 
			export function toDraft() {
				const data = { ...empty } as Images;
				const selected = schema.pick({ avatar: true,galery: true,dataId: true,created_at: true })

				return { data, schema: selected };
			}

			
		