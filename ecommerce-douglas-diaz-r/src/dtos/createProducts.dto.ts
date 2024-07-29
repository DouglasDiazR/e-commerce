import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateProductsDto {
  /**
   * name:
   * @example 'Samsung S24 Ultra'
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 50, {
    message: 'El nombre debe tener una longitud entre 3 y 80 caracteres.',
  })
  name: string;

  /**
   * description:
   * @example 'The best smartphone in the world'
   *
   */
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   * category:
   * @example smartphone
   */
  @IsNotEmpty()
  @IsString()
  category: string;

  /**
   * price:
   * @example 199.99
   */
  @IsNotEmpty()
  @IsNumber()
  price: number;

  /**
   * stock:
   * @example 12
   */
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  /**
   * imgUrl:
   * @example https://example.com/images/samsungS24Ultra.jpg
   */
  @IsNotEmpty()
  @IsString()
  imgUrl: string;
}
