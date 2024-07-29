import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/dtos/updateUser.dto';
import { Orders } from 'src/orders/orders.entity';
import { OrderDetails } from 'src/orderDetails/orderDetails.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number): Promise<Users[]> {
    const start = (page - 1) * limit;
    let usersList: Users[];
    try {
      usersList = await this.usersRepository.find({
        skip: start,
        take: limit,
      });
      if (usersList.length === 0) {
        throw new NotFoundException('No se encontraron usuarios');
      }
      return usersList;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Error al obtener los usuarios');
      }
    }
  }

  async getUserById(id: string): Promise<Users> {
    try {
      const foundUser = await this.usersRepository.findOneBy({ id });
      if (!foundUser) {
        throw new NotFoundException(
          `No se encontró nigún usuario con el id ${id}`,
        );
      }
      return foundUser;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Error al buscar el usuario`);
    }
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<string> {
    const foundUser = await this.usersRepository.findOneBy({ id });
    if (!foundUser) {
      throw new NotFoundException(
        `No se encontró nigún usuario con el id ${id}`,
      );
    }
    try {
      await this.usersRepository
        .createQueryBuilder()
        .update(Users)
        .set({
          name: user.name,
          password: user.password,
          phone: user.phone,
          country: user.country,
          address: user.address,
          city: user.city,
        })
        .where('id = :id', { id })
        .execute();
      return `Usuario ${foundUser.name} con el id ${id} actualizado correctamente`;
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }

  async deleteUser(id: string): Promise<string> {
    const foundUser = await this.usersRepository.findOneBy({ id });
    if (!foundUser) {
      throw new NotFoundException(
        `No se encontró nigún usuario con el id ${id}`,
      );
    }
    try {
      await this.usersRepository
        .createQueryBuilder()
        .delete()
        .from(OrderDetails)
        .where('order_id IN (SELECT id FROM orders WHERE user_id = :id)', {
          id,
        })
        .execute();

      await this.usersRepository
        .createQueryBuilder('user_id')
        .delete()
        .from(Orders)
        .where('user_Id = :id', { id })
        .execute();

      await this.usersRepository
        .createQueryBuilder()
        .delete()
        .from(Users)
        .where('id = :id', { id })
        .execute();

      return `Usuario ${foundUser.name} con el id ${id} eliminado correctamente`;
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el usuario');
    }
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
