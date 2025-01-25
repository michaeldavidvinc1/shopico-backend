import { Image, Product } from "@prisma/client";

export type ApiProduct = {
    id: string;
    name: string;
    slug: string;
    storeId: string;
    categoryId: string;
    description: string | null;
    stock: number;
    price: number;
    weight: number | null;
    status: boolean;
    image: {
        id: string;
        url: string;
        type: string;
    }[];
}

export function toProductResponse(product: Product & { image: Image[] }): ApiProduct {
    return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        storeId: product.storeId,
        categoryId: product.categoryId,
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
