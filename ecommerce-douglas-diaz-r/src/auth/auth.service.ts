import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signUp(user: CreateUserDto) {
    return await this.authRepository.signUp(user);
  }

  async signIn(user: LoginUserDto) {
    return await this.authRepository.signIn(user);
  }
}

