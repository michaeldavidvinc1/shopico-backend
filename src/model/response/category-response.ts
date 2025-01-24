import { Category } from "@prisma/client";
import {ApiImage} from "./image-response";

export type ApiCategory = {
    id: string;
    name: string;
    slug: string;
    status: boolean;
}

export function toCategoryResponse(category: Category): ApiCategory {
    return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        status: category.status,
    };
  }
  