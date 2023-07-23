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
exports.StructsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let StructsService = class StructsService {
    constructor(structs) {
        this.structs = structs;
    }
    async getAllForms() {
        return await this.structs.find();
    }
    async getFormById(idname) {
        const res = await this.structs.find({ 'name': idname });
        const found = res.find(x => x.name === idname);
        if (!found) {
            throw new common_1.NotFoundException('not found the requested resource');
        }
        return found;
    }
    async createForm(body) {
        return await this.structs.create(body);
    }
};
StructsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('forms')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StructsService);
exports.StructsService = StructsService;
//# sourceMappingURL=structs.service.js.map