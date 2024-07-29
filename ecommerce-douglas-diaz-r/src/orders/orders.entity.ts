import { OrderDetails } from 'src/orderDetails/orderDetails.entity';
import { Users } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Orders {
  /**
   * id:
   * @example 8b92f908-a023-4d9e-9ee4-7c94a1309f52
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * date:
   * @example '2024-07-03 21:16:47.293'
   */
  @Column()
  date: Date;

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails;
}
