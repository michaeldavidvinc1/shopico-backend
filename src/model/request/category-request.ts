export type CreateCategory = {
  name: string;
  slug: string;
  image: string | null;
};

export type SearchCategory = {
  name: string;
  status: string;
  page: number;
  size: number;
};

export type UpdateCategory = {
    name: string;
    slug: string;
    image: string | null;
    status: string;
}
