import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({
    description: 'Imagen a Cargar',
    type: 'string',
    format: 'binary',
  })
  image: any;
}
