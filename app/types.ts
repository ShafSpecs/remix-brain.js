export type Book = {
  id: string;
  name: string;
  author: string;
  genre: string;
  category: string;
  description: string;
}

export type Params = {
  page: string | undefined;
  limit: string | undefined;
  sort: string | undefined;
  genre: string | undefined;
  category: string | undefined;
}