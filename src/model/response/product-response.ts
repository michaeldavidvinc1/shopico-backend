import { Category, Image, Product } from "@prisma/client";

export type ApiProduct = {
    id: string;
    name: string;
    slug: string;
    storeId: string;
    category: {
        id: string;
        name: string;
        slug: string;
    };
    description: string | null;
    stock: number;
    price: number;
    weight: number | null;
    status: string;
    image: {
        id: string;
        url: string;
        type: string;
    }[];
}

export function toProductResponse(product: Product & { image: Image[], category: Category }): ApiProduct {
    return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        storeId: product.storeId,
        category: {
            id: product.category.id,
            name: product.category.name,
            slug: product.category.slug
        },
        description: product.description,
        stock: product.stock,
        price: product.price,
        weight: product.weight,
        status: product.status,
        image: product.image.map(img => ({
            id: img.id,
            url: img.url,
            type: img.type,
        })),
    };
}
