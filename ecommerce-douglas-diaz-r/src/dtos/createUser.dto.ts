import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDto {
  /**
   * name:
   * Debe tener una longitud entre 3 y 80 caracteres
   * @example pedro
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80, {
    message: 'El nombre debe tener una longitud entre 3 y 80 caracteres.',
  })
  name: string;
  /**
   *email:
   * @example pedro@email.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * password:
   * La contraseña debe tener una longitud entre de 8 y 15 caracteres.
   * La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*'
   * @example Password**23
   */
  @IsNotEmpty()
  @IsString()
  @Length(8, 100, {
    message:
      'La contraseña debe tener una longitud entre de 8 y 15 caracteres.',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
  })
  password: string;
  /**
   * confirmPassword:
   * Las contraseñas deben coincidir
   * @example Password**23
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   * address:
   * La dirección debe tener una longitud entre 3 y 80 caracteres.
   * @example 'calle falsa 123 av 23'
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80, {
    message: 'La dirección debe tener una longitud entre 3 y 80 caracteres.',
  })
  address: string;

  /**
   * phone:
   * @example 5552223
   */
  @IsNotEmpty()
  @IsInt()
  phone: number;

  /**
   * country:
   * El nombre del País debe tener una longitud entre 4 y 20 caracteres.
   * @example Venezuela
   */
  @IsNotEmpty()
  @IsString()
  @Length(4, 20, {
    message:
      'El nombre del País debe tener una longitud entre 4 y 20 caracteres.',
  })
  country: string;
  /**
   * city:
   * El nombre de la ciudad debe tener una longitud entre 4 y 20 caracteres.
   * @example Rubio
   */
  @IsNotEmpty()
  @IsString()
  @Length(4, 20, {
    message:
      'El nombre de la Ciudad debe tener una longitud mínima de 4 caracteres y una longitud máxima de 20 caracteres.',
  })
  city: string;

  @ApiHideProperty()
  @IsEmpty()
  IsAdmin?: boolean;
}
