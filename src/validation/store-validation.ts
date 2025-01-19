import { z, ZodType } from "zod";

export class StoreValidation {
  static readonly CREATE: ZodType = z.object({
    userId: z.string().min(1),
    name: z.string().min(1),
    slug: z.string().min(1),
  });
}
