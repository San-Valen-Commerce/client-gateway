export enum CATEGORY_ENUM {
  ELECTRONICS = 'electronics',
  CLOTHING = 'clothing',
  FURNITURE = 'furniture',
  BOOKS = 'books',
}

export const CATEGORY_LIST = [
  CATEGORY_ENUM.ELECTRONICS,
  CATEGORY_ENUM.CLOTHING,
  CATEGORY_ENUM.FURNITURE,
  CATEGORY_ENUM.BOOKS,
];
export type Category = (typeof CATEGORY_LIST)[number];

export class ProductEntity {
  id!: number;
  title!: string | null;
  description!: string | null;
  brand!: string | null;
  price!: number | null;
  discountPercentage!: number | null;
  rating!: number | null;
  stock!: number | null;
  category!: Category | null;
  thumbnail!: string | null;
  available!: boolean | null;
}

export interface IProduct extends ProductEntity {}
