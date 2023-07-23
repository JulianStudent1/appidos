"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const structs_controller_1 = require("./structs.controller");
const structs_service_1 = require("./structs.service");
const form_schema_1 = require("../../models/schemas/form.schema");
let StructsModule = class StructsModule {
};
StructsModule = __decorate([
    (0, common_1.Module)({
        controllers: [structs_controller_1.StructsController],
        providers: [structs_service_1.StructsService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'forms', schema: form_schema_1.FormSchema }]),
        ],
    })
], StructsModule);
exports.StructsModule = StructsModule;
//# sourceMappingURL=structs.module.js.map