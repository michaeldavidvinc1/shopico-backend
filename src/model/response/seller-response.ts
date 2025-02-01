import { Category } from "@prisma/client";

export type AllCategory = {
    id: string;
    name: string;
    slug: string;
}

export function toAllCategory(category: Category): AllCategory {
    return {
        id: category.id,
        name: category.name,
        slug: category.slug,
    };
  }
  