import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from 'src/products/products.entity';

export class CreateORderDto {
  @ApiProperty({
    example: 'c2f1923b-bc4f-4267-b935-f741f9e1c03f',
    description: 'userId',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    type: [Products],
    description: 'producstId',
    example: [
      { id: 'd69a0a74-bd90-4015-8e83-0677392b5b79' },
      { id: '226e01d6-c04e-42d3-aeb5-5f2ef141bf8a' },
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  products: Products[];
}
