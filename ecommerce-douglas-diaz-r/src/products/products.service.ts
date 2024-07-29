import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from './products.entity';
import { CreateProductsDto } from 'src/dtos/createProducts.dto';
import { UpdateProductDto } from 'src/dtos/updateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  seederProducts() {
    return this.productsRepository.seederProducts();
  }

  createProduct(product: CreateProductsDto) {
    return this.productsRepository.createProduct(product);
  }

  getProducts(page: number, limit: number) {
    return this.productsRepository.getProdutcs(page, limit);
  }

  getProductById(id: string) {
    return this.productsRepository.getProductById(id);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }

  updateProduct(id: string, product: UpdateProductDto) {
    return this.productsRepository.updateProduct(id, product);
  }
}

