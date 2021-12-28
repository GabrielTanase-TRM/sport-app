
			
import type { Prisma } from '@prisma/client';
import { z } from 'zod';

const literal = z.union([z.string(), z.number(), z.boolean(), z.null()]);
const jsonValue: z.ZodSchema<Prisma.JsonValue> = z.lazy(() =>
	z.union([literal, z.array(jsonValue), z.record(jsonValue)])
);
const jsonSchema: z.ZodSchema<Prisma.InputJsonValue> = z.lazy(() =>
	z.union([z.undefined(), literal, z.array(jsonValue), z.record(jsonValue)])
);


			export type Include = Prisma.ImagesModelInclude;
			export type Fields = Prisma.ImagesModelSelect;
			export type Distinct = Prisma.Enumerable<Prisma.ImagesModelScalarFieldEnum>;
			export type Query = Prisma.ImagesModelWhereInput;
			export type QueryUnique = Prisma.ImagesModelWhereUniqueInput;
			export type QueryOptions = {
				orderBy?: Prisma.ImagesModelOrderByInput;
				limit?: number;
				offset?: number;
				include?: Include;
				fields?: Fields;
				distinct?: Distinct;
			};

			export type ImagesModel = z.infer<typeof schema>
			export const schema = z.object({ id: z.string().min(25).optional(),avatar: z.string().optional(),dataId: z.number() });
			export const empty = { avatar: '',dataId: 0 };
			 
			export function toDraft() {
				const data = { ...empty } as ImagesModel;
				const selected = schema.pick({ avatar: true,dataId: true })

				return { data, schema: selected };
			}

			
		