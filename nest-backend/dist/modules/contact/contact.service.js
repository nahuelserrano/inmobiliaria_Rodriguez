"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ContactService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const resend_1 = require("resend");
const SUCCESS_MESSAGE = '¡Mensaje enviado correctamente! Recibimos tu consulta y nos pondremos en contacto con vos a la brevedad.';
let ContactService = ContactService_1 = class ContactService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(ContactService_1.name);
        this.resend = new resend_1.Resend(this.configService.get('RESEND_API_KEY'));
        this.toEmail = this.configService.get('CONTACT_EMAIL', 'propiedadesvilanova@gmail.com');
        this.fromEmail = this.configService.get('EMAIL_FROM');
    }
    async create(dto) {
        if (!this.fromEmail) {
            this.logger.error('EMAIL_FROM no está configurado. No se puede enviar la consulta.');
            throw new common_1.HttpException('No pudimos enviar tu consulta. Revisá los datos e intentá nuevamente.', common_1.HttpStatus.BAD_GATEWAY);
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
        }
        catch (error) {
            this.logger.error('Error al enviar la consulta por email', error);
            throw new common_1.HttpException('No pudimos enviar tu consulta. Revisá los datos e intentá nuevamente.', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    buildEmailText(dto, createdAt) {
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
    buildEmailHtml(dto, createdAt) {
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
    escapeHtml(value) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = ContactService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ContactService);
//# sourceMappingURL=contact.service.js.map