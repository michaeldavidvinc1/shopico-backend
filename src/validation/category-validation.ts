import { z, ZodType } from "zod";

export class CategoryValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    image: z.string().nullable().optional(),
  });
  static readonly SEARCH: ZodType = z.object({
    name: z.string().optional(),
    status: z.boolean().optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
}
