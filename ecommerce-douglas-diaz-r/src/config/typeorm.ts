import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { Categories } from 'src/categories/categories.entity';
import { OrderDetails } from 'src/orderDetails/orderDetails.entity';
import { Orders } from 'src/orders/orders.entity';
import { Products } from 'src/products/products.entity';
import { Users } from 'src/users/users.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenvConfig({ path: '.development.env' });

const config = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  //host: 'postgresdb',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [Users, Products, Orders, OrderDetails, Categories],
  migrations: ['dist/migrations/*{.ts, .js}'],
  logging: false,
  synchronize: false,
  dropSchema: false,
};

export const typeOrmConfig = registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
