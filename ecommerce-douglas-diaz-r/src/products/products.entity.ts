import { Categories } from 'src/categories/categories.entity';
import { OrderDetails } from 'src/orderDetails/orderDetails.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Products {
  /**
   * id:
   * @example  5a4c9392-85cc-4038-99c0-ac93e1adc1b8
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * name:
   * @example 'Iphone 15'
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  /**
   * description:
   * @example 'The best smartphone in the world'
   */
  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  /**
   * price:
   * @example 199.99
   */
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  /**
   * stock:
   * @example  12
   */
  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number;

  /**
   * imgUrl:
   * @example  https://example.com/images/iphone15.jpg
   */
  @Column({
    default: 'default-image-url',
    nullable: true,
  })
  imgUrl: string;

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;
}
