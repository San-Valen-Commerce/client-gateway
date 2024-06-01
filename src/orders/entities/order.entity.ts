export enum STATUS_ENUM {
  PENDING = 'pending',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export const STATUS_LIST = [
  STATUS_ENUM.PENDING,
  STATUS_ENUM.DELIVERED,
  STATUS_ENUM.CANCELLED,
];

export type Status = (typeof STATUS_LIST)[number];

export class OrderEntity {
  id!: number;
  totalAmount!: number;
  totalItems!: number;
  status!: Status;
  paid!: boolean | null;
  paidAt!: Date | null;
  createdAt!: Date | null;
  updatedAt!: Date | null;
}

export interface IOrder extends OrderEntity {}
