import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsIn,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import {
  Category,
  CATEGORY_LIST,
  IProductEntity,
} from '../entities/product.entity';

interface ICreateProductDto extends Omit<IProductEntity, 'id' | 'available'> {}

export class CreateProductDto implements ICreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Macbook Pro M3',
    description: 'This field must be unique.',
    required: true,
  })
  title!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Awesome Macbook Pro M3 500Gb with 16Gb of RAM and 13" screen.',
    required: true,
  })
  description!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiProperty({
    example: 2000,
    description: 'Price in USD cents. Ex: 2000 = $20.00',
    required: false,
    default: 0,
    format: 'int32',
  })
  price!: number;

  @IsNotEmpty()
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({
    example: 12,
    description: 'Discount Percentage. Ex: 12 = 12% off.',
    required: false,
    default: 0,
    format: 'int32',
  })
  discountPercentage!: number;

  @IsNotEmpty()
  @IsOptional()
  @Min(0)
  @Max(500)
  @ApiProperty({
    example: 4.56,
    description:
      'Rating from 0 to 5. Only 2 decimal positions if not integer. Ex: 4.56 = 4.56/5.00.',
    required: false,
    default: 0,
    format: 'float',
  })
  rating!: number;

  @IsNotEmpty()
  @IsInt()
  @IsOptional()
  @ApiProperty({
    example: 34,
    description: 'Stock amount. Ex: 34 = 34 items available.',
    required: false,
    default: 0,
    format: 'int32',
  })
  stock!: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: 'Apple',
    required: false,
    default: 'Generic',
  })
  brand!: string;

  @IsNotEmpty()
  @IsIn(CATEGORY_LIST)
  @ApiProperty({
    example: 'electronics',
    description: 'Category of the product',
    anyOf: [
      {
        type: 'string',
        enum: CATEGORY_LIST,
      },
    ],
    required: true,
  })
  category!: Category;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example:
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
    description: 'Product thumbnail image URL',
    required: false,
    default:
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
  })
  thumbnail!: string;
}
