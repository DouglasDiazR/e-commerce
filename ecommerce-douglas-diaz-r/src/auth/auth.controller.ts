import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { PasswordInterceptor } from 'src/interceptors/password-interceptor';
import { RolesInterceptor } from 'src/interceptors/roles-interceptor';

@ApiTags('auth')
@Controller('auth')
export class authController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  @UseInterceptors(PasswordInterceptor, RolesInterceptor)
  async signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }

  @Post('signin')
  @ApiTags()
  @HttpCode(201)
  async signIn(@Body() credentials: LoginUserDto) {
    return await this.authService.signIn(credentials);
  }
}

