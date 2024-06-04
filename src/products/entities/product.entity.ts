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
  title!: string;
  description!: string;
  brand!: string;
  price!: number;
  discountPercentage!: number;
  rating!: number;
  stock!: number;
  category!: Category;
  thumbnail!: string;
  available!: boolean;
}

export interface IProductEntity extends ProductEntity {}
