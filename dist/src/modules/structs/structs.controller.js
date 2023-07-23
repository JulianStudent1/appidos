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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructsController = void 0;
const common_1 = require("@nestjs/common");
const structs_service_1 = require("./structs.service");
const form_entity_1 = require("../../models/entities/form.entity");
const jwt_guard_1 = require("../../guards/jwt.guard");
let StructsController = class StructsController {
    constructor(structsService) {
        this.structsService = structsService;
    }
    async getAllForms() {
        return await this.structsService.getAllForms();
    }
    async getFormById(id) {
        return await this.structsService.getFormById(id);
    }
    async createForm(body) {
        return await this.structsService.createForm(body);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StructsController.prototype, "getAllForms", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getOne/:idName'),
    __param(0, (0, common_1.Param)('idName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StructsController.prototype, "getFormById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [form_entity_1.FormEntity]),
    __metadata("design:returntype", Promise)
], StructsController.prototype, "createForm", null);
StructsController = __decorate([
    (0, common_1.Controller)('structs'),
    __metadata("design:paramtypes", [structs_service_1.StructsService])
], StructsController);
exports.StructsController = StructsController;
//# sourceMappingURL=structs.controller.js.map