import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { Repository } from 'typeorm';
import { OrderDetails } from 'src/orderDetails/orderDetails.entity';
import { Users } from 'src/users/users.entity';
import { Products } from 'src/products/products.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private readonly ordersDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async createOrder(
    userId: string,
    products: Products[],
  ): Promise<Orders | string> {
    let totalPrice = 0;

    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`Usuario con el id ${userId} no encontrado`);
    }

    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);

    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productsRepository.findOneBy({
          id: element.id,
        });
        if (!product) {
          throw new NotFoundException(
            `Producto con el id ${element.id} no encontrado`,
          );
        }
        const stock = Number(product.stock);
        if (isNaN(stock)) {
          throw new BadRequestException(
            `El stock del producto con id ${element.id} no es un número válido`,
          );
        }

        if (stock < 1) {
          throw new ConflictException(
            `El producto con id ${element.id} no tiene suficiente stock`,
          );
        }
        totalPrice += Number(product.price);
        await this.productsRepository
          .createQueryBuilder()
          .update(Products)
          .set({
            stock: product.stock - 1,
          })
          .where('id = :id', { id: product.id })
          .execute();
        return product;
      }),
    );

    const orderDetails = new OrderDetails();
    orderDetails.price = Number(Number(totalPrice).toFixed(2));
    orderDetails.products = productsArray;
    orderDetails.order = newOrder;
    console.log(orderDetails);
    await this.ordersDetailsRepository.save(orderDetails);

    await this.ordersRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderDetails', 'orderDetails')
      .where('order.id = :id', { id: newOrder.id })
      .getOne();
    return `Orden creada con éxito con el id ${newOrder.id}`;
  }

  async getOrder(id: string): Promise<Orders> {
    try {
      const order = await this.ordersRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.orderDetails', 'orderDetails')
        .where('order.id = :id', { id })
        .getOne();
      return order;
    } catch (error) {
      throw new NotFoundException(`Orden con el id ${id} no encontrada`);
    }
  }

  async deletedOrder(id: string) {
    const foundOrder = await this.ordersRepository.findOneBy({ id });
    if (!foundOrder) {
      throw new NotFoundException('Orden no encontrada');
    }

    try {
      await this.ordersRepository
        .createQueryBuilder()
        .delete()
        .from(Orders)
        .where((id = ':id'))
        .execute();

      return `Orden eliminada con exito`;
    } catch (error) {}
    throw new InternalServerErrorException('Error al eliminar la orden ');
  }
}
