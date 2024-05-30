import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCTS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  @ApiTags('products')
  @ApiOperation({ summary: 'Create new product' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiBody({
    type: CreateProductDto,
    description: 'JSON structrure to create a new product',
  })
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const result = await firstValueFrom(
        this.productsClient.send({ cmd: 'create_product' }, createProductDto),
      );

      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  @ApiTags('products')
  @ApiOperation({ summary: 'List all available products' })
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
  async findAll(@Query() paginationDto: PaginationDto) {
    try {
      const result = await firstValueFrom(
        this.productsClient.send({ cmd: 'list_products' }, paginationDto),
      );

      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  @ApiTags('products')
  @ApiOperation({ summary: 'Get a product by its id if its available' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await firstValueFrom(
        this.productsClient.send({ cmd: 'get_one_product' }, { id }),
      );

      return result;
    } catch (error: any) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  @ApiTags('products')
  @ApiOperation({ summary: 'Update a product by its id' })
  @ApiBody({
    type: UpdateProductDto,
    description: 'JSON structrure to update an existing product',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const result = await firstValueFrom(
        this.productsClient.send(
          { cmd: 'update_product' },
          {
            id: id,
            ...updateProductDto,
          },
        ),
      );

      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  @ApiTags('products')
  @ApiOperation({ summary: 'Hard deletes a product fromt the database' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await firstValueFrom(
        this.productsClient.send({ cmd: 'delete_hard_product' }, { id }),
      );

      return result;
    } catch (error: any) {
      throw new RpcException(error);
    }
  }

  @Delete(':id/soft')
  @ApiTags('products')
  @ApiOperation({
    summary: 'Soft deletes a product, only set available = false',
  })
  async softRemove(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await firstValueFrom(
        this.productsClient.send({ cmd: 'delete_soft_product' }, { id }),
      );

      return result;
    } catch (error: any) {
      throw new RpcException(error);
    }
  }
}
