import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCTS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const result = await firstValueFrom(
        this.productsClient.send({ cmd: 'create_product' }, createProductDto)
      )

      return result
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    try {
      const result = await firstValueFrom(
        this.productsClient.send({ cmd: 'list_products' }, paginationDto)
      )

      return result
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await firstValueFrom(
        this.productsClient.send({ cmd: 'get_one_product' }, { id })
      )

      return result
    } catch (error: any) {
      throw new RpcException(error)
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    try {
      const result = await firstValueFrom(
        this.productsClient.send({ cmd: 'update_product' }, { 
          id: id, 
          ...updateProductDto 
        })
      )

      return result
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await firstValueFrom(
        this.productsClient.send({ cmd: 'delete_hard_product' }, { id })
      )

      return result
    } catch (error: any) {
      throw new RpcException(error)
    }
  }

  @Delete(':id/soft')
  async softRemove(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await firstValueFrom(
        this.productsClient.send({ cmd: 'delete_soft_product' }, { id })
      )

      return result
    } catch (error: any) {
      throw new RpcException(error)
    }
  }
}
