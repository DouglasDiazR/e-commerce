import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Categories } from './categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import productsSeeder from '../utils/data.js';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async addCategory(): Promise<string> {
    try {
      for (const product of productsSeeder) {
        await this.categoriesRepository
          .createQueryBuilder()
          .insert()
          .into(Categories)
          .values({ name: product.category })
          .orIgnore()
          .execute();
      }
      return 'Categorías Agregadas';
    } catch (error) {
      throw new InternalServerErrorException('Error al agregar las categorías');
    }
  }
}
