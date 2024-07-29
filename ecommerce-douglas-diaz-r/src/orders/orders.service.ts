import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Products } from 'src/products/products.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  createOrder(userId: string, products: Products[]) {
    return this.ordersRepository.createOrder(userId, products);
  }

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }

  deletedOrder(id: string) {
    return this.ordersRepository.deletedOrder(id);
  }
}
