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
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OrderPaginationDto, CreateOrderDto } from './dto';
import { StatusDto } from './dto/status.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { STATUS_ENUM } from './entities/order.entity';

@Controller({
  path: 'orders',
  version: '1',
})
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  @ApiTags('orders')
  @ApiOperation({ summary: 'Create new Order' })
  @ApiBody({
    type: CreateOrderDto,
    description: 'JSON structrure to create a new order',
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: 'create_order' }, createOrderDto),
      );

      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  @ApiTags('orders')
  @ApiOperation({ summary: 'List Orders' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
    example: 10,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: STATUS_ENUM,
    description: 'Status',
    example: 'pending',
  })
  async findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: 'list_orders' }, orderPaginationDto),
      );

      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  @ApiTags('orders')
  @ApiOperation({ summary: 'Get Order By Id' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await firstValueFrom(
        this.client.send({ cmd: 'get_one_order' }, { id }),
      );

      return result;
    } catch (error: any) {
      throw new RpcException(error);
    }
  }

  @Patch(':id/update-status')
  @ApiTags('orders')
  @ApiOperation({ summary: 'Update Api Status' })
  @ApiBody({
    type: StatusDto,
    description: 'Statua of the order',
  })
  async updateStatus(
    @Param('id', ParseIntPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.client.send(
          { cmd: 'change_order_status' },
          {
            id,
            status: statusDto.status,
          },
        ),
      );

      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
