import { z, ZodType } from "zod";

export class CategoryValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    image: z.string().nullable().optional(),
  });
  static readonly SEARCH: ZodType = z.object({
    name: z.string().optional(),
    status: z.string().optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).optional(),
    slug: z.string().min(1).optional(),
    image: z.string().nullable().optional(),
    status: z.string()
  });
}
