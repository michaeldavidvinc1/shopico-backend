export type CreateProduct = {
    storeId: string;
    categoryId: string;
    name: string;
    slug: string;
    image: string[];
    description: string | null;
    stock: number;
    price: number;
    weight: number | null;
};

export type SearchProduct = {
    name: string;
    status: string;
    page: number;
    size: number;
};

export type UpdateProduct = {
    storeId: string;
    categoryId: string;
    name: string;
    slug: string;
    image: string[];
    description: string | null;
    stock: number;
    price: number;
    weight: number | null;
};