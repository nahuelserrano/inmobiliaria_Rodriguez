import { ConfigService } from '@nestjs/config';
import { CreateContactDto } from './dto/create-contact.dto';
export declare class ContactService {
    private readonly configService;
    private readonly logger;
    private readonly resend;
    private readonly toEmail;
    private readonly fromEmail;
    constructor(configService: ConfigService);
    create(dto: CreateContactDto): Promise<{
        success: boolean;
        message: string;
    }>;
    private buildEmailText;
    private buildEmailHtml;
    private escapeHtml;
}
