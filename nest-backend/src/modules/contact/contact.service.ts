import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { CreateContactDto } from './dto/create-contact.dto';

const SUCCESS_MESSAGE =
  '¡Mensaje enviado correctamente! Recibimos tu consulta y nos pondremos en contacto con vos a la brevedad.';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private readonly resend: Resend;
  private readonly toEmail: string;
  private readonly fromEmail: string | undefined;

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
    this.toEmail = this.configService.get<string>(
      'CONTACT_EMAIL',
      'propiedadesvilanova@gmail.com',
    );
    this.fromEmail = this.configService.get<string>('EMAIL_FROM');
  }

  async create(dto: CreateContactDto): Promise<{ success: boolean; message: string }> {
    if (!this.fromEmail) {
      this.logger.error('EMAIL_FROM no está configurado. No se puede enviar la consulta.');
      throw new HttpException(
        'No pudimos enviar tu consulta. Revisá los datos e intentá nuevamente.',
        HttpStatus.BAD_GATEWAY,
      );
    }

    const createdAt = new Date().toLocaleString('es-AR', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'America/Argentina/Buenos_Aires',
    });

    const subject = 'Nueva consulta desde vilanovapropiedades.com.ar';
    const text = this.buildEmailText(dto, createdAt);
    const html = this.buildEmailHtml(dto, createdAt);

    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: this.toEmail,
        subject,
        text,
        html,
      });

      return { success: true, message: SUCCESS_MESSAGE };
    } catch (error) {
      this.logger.error('Error al enviar la consulta por email', error);
      throw new HttpException(
        'No pudimos enviar tu consulta. Revisá los datos e intentá nuevamente.',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  private buildEmailText(dto: CreateContactDto, createdAt: string): string {
    return [
      'Nueva consulta desde vilanovapropiedades.com.ar',
      '',
      `Nombre y apellido: ${dto.name}`,
      `Teléfono: ${dto.phone}`,
      `Asunto: consulta del interesado`,
      '',
      'Mensaje:',
      dto.message,
      '',
      `Fecha y hora de envío: ${createdAt}`,
    ].join('\n');
  }

  private buildEmailHtml(dto: CreateContactDto, createdAt: string): string {
    return `
      <h2 style="margin-top:0;">Nueva consulta desde vilanovapropiedades.com.ar</h2>
      <p><strong>Nombre y apellido:</strong> ${this.escapeHtml(dto.name)}</p>
      <p><strong>Teléfono:</strong> ${this.escapeHtml(dto.phone)}</p>
      <p><strong>Asunto:</strong> consulta del interesado</p>
      <p><strong>Mensaje:</strong></p>
      <p style="white-space:pre-wrap;">${this.escapeHtml(dto.message)}</p>
      <p><strong>Fecha y hora de envío:</strong> ${createdAt}</p>
    `;
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
