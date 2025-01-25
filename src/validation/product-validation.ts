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
    static readonly SEARCH: ZodType = z.object({
        name: z.string().optional(),
        storeId: z.string().optional(),
        categoryId: z.string().optional(),
        status: z.boolean().optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive(),
    });
    static readonly UPDATE: ZodType = z.object({
        storeId: z.string().min(1).optional(),
        categoryId: z.string().min(1).optional(),
        name: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        image: z.string().array().optional(),
        description: z.string().optional(),
        stock: z.number().optional(),
        price: z.number().optional(),
        weight: z.number().optional()
    });
}
