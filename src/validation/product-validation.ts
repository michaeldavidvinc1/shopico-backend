import { z, ZodType } from "zod";

export class ProductValidation {
    static readonly CREATE: ZodType = z.object({
        storeId: z.string().min(1),
        categoryId: z.string().min(1),
        name: z.string().min(1),
        slug: z.string().min(1),
        image: z.string().array(),
        description: z.string().optional(),
        stock: z.number(),
        price: z.number(),
        weight: z.number().optional()
    });
}
