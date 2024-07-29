import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './createUser.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'name:',
    example: 'pedro',
    type: 'string',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'email:',
    example: 'pedro@email.com',
    type: 'string',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'password:',
    example: 'Password*321',
    type: 'string',
  })
  password?: string;

  @ApiPropertyOptional({
    description: 'confirmPassword:',
    example: 'Password*321',
    type: 'string',
  })
  confirmPassword?: string;

  @ApiPropertyOptional({
    description: 'address:',
    example: 'Calle falsa 567 av 17',
    type: 'string',
  })
  address?: string;

  @ApiPropertyOptional({
    description: 'phone:',
    example: 321654,
    type: 'number',
  })
  phone?: number;

  @ApiPropertyOptional({
    description: 'country:',
    example: 'Colombia',
    type: 'string',
  })
  country?: string;

  @ApiPropertyOptional({
    description: 'city:',
    example: 'Bucaramanga',
    type: 'string',
  })
  city?: string;
}
