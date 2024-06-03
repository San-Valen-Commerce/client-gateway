import { IsIn, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { IOrder, Status, STATUS_LIST } from '../entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';

interface ICreateOrder
  extends Omit<IOrder, 'id' | 'paid' | 'paidAt' | 'createdAt' | 'updatedAt'> {}

export class CreateOrderDto implements ICreateOrder {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: 34,
    description: 'Total amount in USD cents. Ex: 2334 = $23.34',
    required: true,
    format: 'int32',
  })
  totalAmount!: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: 3,
    description: 'Total number of items in the order.',
    required: true,
    format: 'int32',
  })
  totalItems!: number;

  @IsNotEmpty()
  @IsIn(STATUS_LIST)
  @IsOptional()
  @ApiProperty({
    example: 'pending',
    description: 'Status of the order.',
    anyOf: [
      {
        type: 'string',
        enum: STATUS_LIST,
      },
    ],
    required: true,
  })
  status!: Status;
}
