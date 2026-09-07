import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Enviar una consulta desde el formulario de contacto' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Consulta enviada correctamente',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos inválidos' })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'No se pudo enviar la consulta',
  })
  async create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }
}
