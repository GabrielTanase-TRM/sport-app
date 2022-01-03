
			
import type { Prisma } from '@prisma/client';
import { z } from 'zod';

const literal = z.union([z.string(), z.number(), z.boolean(), z.null()]);
const jsonValue: z.ZodSchema<Prisma.JsonValue> = z.lazy(() =>
	z.union([literal, z.array(jsonValue), z.record(jsonValue)])
);
const jsonSchema: z.ZodSchema<Prisma.InputJsonValue> = z.lazy(() =>
	z.union([z.undefined(), literal, z.array(jsonValue), z.record(jsonValue)])
);


			export type Include = Prisma.HasInclude;
			export type Fields = Prisma.UsersSelect;
			export type Distinct = Prisma.Enumerable<Prisma.UsersScalarFieldEnum>;
			export type Query = Prisma.UsersWhereInput;
			export type QueryUnique = Prisma.UsersWhereUniqueInput;
			export type QueryOptions = {
				orderBy?: Prisma.UsersOrderByWithAggregationInput;
				limit?: number;
				offset?: number;
				include?: Include;
				fields?: Fields;
				distinct?: Distinct;
			};

			export type Users = z.infer<typeof schema>
			export const schema = z.object({ id: z.string().min(25).optional(),email: z.string().email(),firstName: z.string(),lastName: z.string(),password: z.string(),disabled: z.boolean().optional(),isTrainer: z.boolean(),deleted: z.boolean().optional(),avatar: z.string(),testimonial: z.string().optional(),created_at: z.union([z.string(), z.date()]).optional() });
			export const empty = { email: '',firstName: '',lastName: '',password: '',disabled: false,isTrainer: false,deleted: false,avatar: '',testimonial: '',created_at: new Date() };
			 
			export function toDraft() {
				const data = { ...empty } as Users;
				const selected = schema.pick({ email: true,firstName: true,lastName: true,password: true,disabled: true,isTrainer: true,deleted: true,avatar: true,testimonial: true,created_at: true })

				return { data, schema: selected };
			}

			
		