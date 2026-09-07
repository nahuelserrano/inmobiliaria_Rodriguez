import { IsString, Matches, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ' -]+$/, {
    message: 'El nombre y apellido solo puede contener letras y espacios.',
  })
  @Length(2, 100, { message: 'El nombre y apellido debe tener entre 2 y 100 caracteres.' })
  name: string;

  @ApiProperty({ example: '+54 9 2494 550518' })
  @IsString()
  @Matches(/^\+?[0-9\s()-]{6,20}$/, {
    message: 'El teléfono tiene un formato inválido.',
  })
  phone: string;

  @ApiProperty({ example: 'Quiero más información sobre una propiedad.' })
  @IsString()
  @Length(10, 2000, { message: 'El mensaje debe tener al menos 10 caracteres.' })
  message: string;
}
