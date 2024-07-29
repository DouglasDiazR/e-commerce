import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { Users } from 'src/users/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly usersEmailRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailerService,
  ) {}
  async signUp(user: CreateUserDto): Promise<Users> {
    const foundUser = await this.usersEmailRepository.getUserByEmail(
      user.email,
    );
    if (foundUser) {
      throw new BadRequestException('El correo electrónico ya está registrado');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('No se pudo encriptar la contraseña');
    }
    try {
      const createdUser = await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values({ ...user, password: hashedPassword })
        .execute();

      const userId = createdUser.identifiers[0].id;
      const newUser = await this.usersRepository.findOneBy({ id: userId });

      await this.mailService.sendMail(
        newUser.email,
        'bienvenido a nuestra aplicación',
        `hola ${newUser.name} gracias por registrarse en nuestra aplicación`,
      );
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException('No se pudo registrar el usuario');
    }
  }

  async signIn(user: LoginUserDto) {
    const { email, password } = user;
    const findUser = await this.usersEmailRepository.getUserByEmail(email);
    if (!findUser) {
      throw new BadRequestException('Credenciales incorrectas');
    }
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Credenciales Incorrectas');
    }
    try {
      const userPaylop = {
        name: findUser.name,
        email: findUser.email,
        isAdmin: findUser.isAdmin,
      };
      const token = this.jwtService.sign(userPaylop);
      return { message: 'Usuario logueado con éxito', token };
    } catch (error) {
      throw new InternalServerErrorException('No se pudo loguear al usuario');
    }
  }
}
