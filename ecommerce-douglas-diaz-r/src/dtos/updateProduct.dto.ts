import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProductsDto } from './createProducts.dto';

export class UpdateProductDto extends PartialType(CreateProductsDto) {
  @ApiPropertyOptional({
    description: 'name:',
    example: 'Samsung',
    type: 'string',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'description:',
    example: 'The Best SmartPhone',
    type: 'string',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'category:',
    example: 'smartphone',
    type: 'string',
  })
  category?: string;

  @ApiPropertyOptional({
    description: 'price:',
    example: '199.99',
    type: 'number',
  })
  price?: number;

  @ApiPropertyOptional({
    description: 'stock:',
    example: '12',
    type: 'number',
  })
  stock?: number;

  @ApiPropertyOptional({
    description: 'imgUrl',
    example: 'https://example.com/images/samsungS24Ultra.jpg',
    type: 'string',
  })
  imgUrl?: string;
}
