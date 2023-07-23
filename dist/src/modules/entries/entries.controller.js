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
exports.EntriesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../../guards/jwt.guard");
const entries_service_1 = require("./entries.service");
let EntriesController = class EntriesController {
    constructor(entriesService) {
        this.entriesService = entriesService;
    }
    async getOne(by) {
        return await this.entriesService.getByForm(by);
    }
    async create(body) {
        return await this.entriesService.create(body);
    }
};
__decorate([
    (0, common_1.Get)('getAll/:by'),
    __param(0, (0, common_1.Param)('by')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EntriesController.prototype, "getOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EntriesController.prototype, "create", null);
EntriesController = __decorate([
    (0, common_1.Controller)('entries'),
    __metadata("design:paramtypes", [entries_service_1.EntriesService])
], EntriesController);
exports.EntriesController = EntriesController;
//# sourceMappingURL=entries.controller.js.map