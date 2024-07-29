import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/products/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesRepository {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadImg(id: string, image: string): Promise<string> {
    const foundProduct = await this.productsRepository.findOneBy({ id });
    if (!foundProduct) {
      throw new NotFoundException(
        `No se encontró nigún producto con el id ${id}`,
      );
    }
    try {
      this.productsRepository
        .createQueryBuilder()
        .update(Products)
        .set({
          imgUrl: image,
        })
        .where('id = :id', { id })
        .execute();
      return `Imagen Cargada al producto ${foundProduct.name} con el id ${id}`;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
