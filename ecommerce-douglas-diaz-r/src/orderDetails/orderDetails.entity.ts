import { Orders } from 'src/orders/orders.entity';
import { Products } from 'src/products/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orderDetails' })
export class OrderDetails {
  /**
   * Propiedad id;
   * @example ff235c66-b8ce-443e-a8ed-0166ace0d20d
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Propiedad price;
   * @example 329.89
   */
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @ManyToMany(() => Products, (product) => product.orderDetails)
  @JoinTable({ name: 'order_details_products' })
  products: Products[];

  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Orders;
}
