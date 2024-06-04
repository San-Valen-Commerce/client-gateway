import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { IOrderItem } from '../entities/order-item.entity';
import { ApiProperty } from '@nestjs/swagger';

interface IOrderItemDto extends Omit<IOrderItem, 'id' | 'orderId'> {}

export class OrderItemDto implements IOrderItemDto {
  @IsInt()
  @IsPositive()
  @ApiProperty({
    example: 1,
    description: 'Product ID.',
    required: true,
  })
  productId!: number;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    example: 5,
    description: 'Quantity of the product.',
    required: true,
  })
  quantity!: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    example: 1000,
    description: 'Desired Price (is ignored :D).',
    required: false,
  })
  price!: number;
}
