import {Image} from "@prisma/client";

export type ApiImage = {
    id: string;
    url: string;
    type: string;
    productId: string | null;
    categoryId: string | null;
    reviewId: string | null;
}

export function toImageResponse(image: Image): ApiImage {
    return {
        id: image.id,
        url: image.url,
        type: image.type,
        productId: image.productId,
        categoryId: image.categoryId,
        reviewId: image.reviewId,
    };
}
