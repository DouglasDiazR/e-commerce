import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { Repository } from 'typeorm';
import { Categories } from 'src/categories/categories.entity';
import productsSeeder from 'src/utils/data';
import { CreateProductsDto } from 'src/dtos/createProducts.dto';
import { UpdateProductDto } from 'src/dtos/updateProduct.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async getProdutcs(page: number, limit: number): Promise<Products[]> {
    const start = (page - 1) * limit;
    let productsList: Products[];
    try {
      productsList = await this.productsRepository.find({
        skip: start,
        take: limit,
      });
      if (productsList.length === 0) {
        throw new NotFoundException(`No hay productos registrados`);
      }
      return productsList;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Error al obtener los productos',
        );
      }
    }
  }

  async getProductById(id: string): Promise<Products> {
    try {
      const foundProduct = await this.productsRepository.findOneBy({ id });
      if (!foundProduct) {
        throw new NotFoundException(`Producto con el id ${id} no encontrado`);
      }
      return foundProduct;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Error al buscar el producto`);
    }
  }

  async seederProducts(): Promise<string> {
    await this.categoriesRepository.find();

    for (const element of productsSeeder) {
      const category = await this.categoriesRepository.findOneBy({
        name: element.category,
      });

      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.imgUrl = element.imgUrl;
      product.stock = element.stock;
      product.category = category;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
        .execute();
    }
    return 'Productos Agregados';
  }

  async createProduct(product: CreateProductsDto): Promise<string> {
    const { name, description, category, price, stock, imgUrl } = product;
    const categoryProduct = await this.categoriesRepository.findOneBy({
      name: category,
    });
    if (!categoryProduct) {
      throw new NotFoundException('No exíste la categoría');
    }
    try {
      const newProduct = new Products();
      newProduct.name = name;
      newProduct.description = description;
      newProduct.category = categoryProduct;
      newProduct.price = price;
      newProduct.stock = stock;
      newProduct.imgUrl = imgUrl;
      console.log('nuevoProducto', newProduct);
      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(newProduct)
        .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
        .execute();
      return `Producto agregado con éxito. id: ${newProduct.id}`;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al cargar el producto');
    }
  }

  async deleteProduct(id: string): Promise<string> {
    const foundProduct = await this.productsRepository.findOneBy({ id });
    if (!foundProduct)
      throw new NotFoundException(`Prducto con el id ${id} no encontrado`);
    try {
      await this.productsRepository
        .createQueryBuilder()
        .delete()
        .from(Products)
        .where('id = :id', { id })
        .execute();
      return `Producto con el id ${id} eliminado conrrectamente`;
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el producto');
    }
  }

  async updateProduct(id: string, product: UpdateProductDto) {
    try {
      const foundProduct = await this.productsRepository.findOneBy({ id });
      console.log('updateProduct', foundProduct);
      if (foundProduct) {
        await this.productsRepository
          .createQueryBuilder()
          .update(Products)
          .set({
            name: product.name,
            description: product.description,
            price: product.price,
            imgUrl: product.imgUrl,
            stock: product.stock,
          })
          .where('id = :id', { id })
          .execute();

        return `Producto con el id ${id} actualizado correctamente`;
      }
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`Producto con el id ${id} no encontrado`);
    }
  }
}
