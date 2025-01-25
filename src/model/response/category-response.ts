import { Category, Image } from "@prisma/client";

export type ApiCategory = {
    id: string;
    name: string;
    slug: string;
    status: boolean;
    image?: {
        id: string;
        url: string;
        type: string;
    };
};

export function toCategoryResponse(
    category: Category & { image?: Image | null }
): ApiCategory {
    return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        status: category.status,
        image: category.image
            ? {
                id: category.image.id,
                url: category.image.url,
                type: category.image.type,
            }
            : undefined,
    };
}
