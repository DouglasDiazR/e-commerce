import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './createUser.dto';

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {
  @ApiProperty({
    description:
      'Propiedad password;\n' +
      'La contraseña debe tener una longitud entre de 8 y 15 caracteres.\n' +
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
    example: 'Password**23',
    required: true,
  })
  password: string;

  @ApiProperty({
    description: 'Propiedad email;',
    example: 'pedro@email.com',
    required: true,
  })
  email: string;
}
