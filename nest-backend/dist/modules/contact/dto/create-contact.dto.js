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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContactDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateContactDto {
}
exports.CreateContactDto = CreateContactDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Juan Pérez' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ' -]+$/, {
        message: 'El nombre y apellido solo puede contener letras y espacios.',
    }),
    (0, class_validator_1.Length)(2, 100, { message: 'El nombre y apellido debe tener entre 2 y 100 caracteres.' }),
    __metadata("design:type", String)
], CreateContactDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+54 9 2494 550518' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\+?[0-9\s()-]{6,20}$/, {
        message: 'El teléfono tiene un formato inválido.',
    }),
    __metadata("design:type", String)
], CreateContactDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Quiero más información sobre una propiedad.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 2000, { message: 'El mensaje debe tener al menos 10 caracteres.' }),
    __metadata("design:type", String)
], CreateContactDto.prototype, "message", void 0);
//# sourceMappingURL=create-contact.dto.js.map