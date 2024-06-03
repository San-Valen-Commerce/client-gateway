import { IsIn } from 'class-validator';
import { Status, STATUS_LIST } from '../entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';

export class StatusDto {
  @IsIn(STATUS_LIST)
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
