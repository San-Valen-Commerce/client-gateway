export class OrderItemEntity {
  id!: number;
  productId!: number;
  quantity!: number;
  price!: number;
  orderId!: number | null;
}

export interface IOrderItem extends OrderItemEntity {}
