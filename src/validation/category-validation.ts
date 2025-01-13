import { z, ZodType } from "zod";

export class CategoryValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    image: z.string().nullable().optional(),
  });
}
