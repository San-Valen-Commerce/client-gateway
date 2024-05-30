import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  BadRequestException,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';

@Controller({
  path: 'orders',
  version: '1',
})
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const result = await firstValueFrom(
        this.productsClient.send({ cmd: 'create_order' }, createOrderDto),
      );

      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    try {
      const result = await firstValueFrom(
        this.productsClient.send({ cmd: 'list_orders' }, paginationDto),
      );

      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await firstValueFrom(
        this.productsClient.send({ cmd: 'get_one_order' }, { id }),
      );

      return result;
    } catch (error: any) {
      throw new RpcException(error);
    }
  }

  @Patch(':id/update-status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: string,
    @Body() body: { status: string },
  ) {
    try {
      const result = await firstValueFrom(
        this.productsClient.send(
          { cmd: 'change_order_status' },
          {
            id,
            status: body.status,
          },
        ),
      );

      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
