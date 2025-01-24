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
    status: boolean;
    page: number;
    size: number;
};