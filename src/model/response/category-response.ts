import { Category } from "@prisma/client";

export type ApiCategory = {
    id: string;
    name: string;
    slug: string;
    image: string | null;
    status: boolean;
}

export function toCategoryResponse(category: Category): ApiCategory {
    return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        image: category.image,
        status: category.status,
    };
  }
  