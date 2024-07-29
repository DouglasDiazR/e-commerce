import { Orders } from 'src/orders/orders.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  /**
   * Propiedad id;
   * @example 4f7681a2-a842-4d63-86ab-bdd9706f753f
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;
  /**
   * Propiedad name;
   * Debe tener una longitud entre 3 y 80 caracteres
   * @example pedro
   */
  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  name: string;

  /**
   * Propiedad email;
   * @example pedro@email.com
   */
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  email: string;

  /**
   * Propiedad password;
   * La contraseña debe tener una longitud entre de 8 y 15 caracteres.
   * La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*'
   * @example Password**23
   */
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  password: string;

  /**
   * Propiedad phone;
   * @example 5552223
   */
  @Column({
    type: 'int',
  })
  phone: number;

  /**
   * Propiedad country;
   * @example Venezuela
   */
  @Column({
    type: 'varchar',
    length: 20,
  })
  country: string;

  /**
   * Propiedad address;
   * @example 'calle falsa 123 av 23'
   */
  @Column('text')
  address: string;

  /**
   * Propiedad city;
   * @example Rubio
   */
  @Column({
    type: 'varchar',
    length: 20,
  })
  city: string;

  /**
   * Propiedad isAdmin;
   * @example false
   */
  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean;

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Orders[];
}
