import { IsIn, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common';
import { Status, STATUS_LIST } from '../entities/order.entity';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsIn(STATUS_LIST)
  status!: Status;
}
