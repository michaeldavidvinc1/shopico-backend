export type CreateCategory = {
    name: string;
    slug: string;
    image: string | null;
}

export type SearchCategory = {
    name: string;
    status: boolean;
    page: number;
    size: number;
  };