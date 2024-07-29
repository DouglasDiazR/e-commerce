import { Products } from 'src/products/products.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class Categories {
  /**
   * id:
   * @example  1cc8d1c2-a3f8-4607-aa3d-4c367bc98d04
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * name:
   * @example smartphone
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  @OneToMany(() => Products, (product) => product.category)
  products: Products[];
}
