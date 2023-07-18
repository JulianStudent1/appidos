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
exports.AuthService = void 0;
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const utils_service_1 = require("../utils/utils.service");
let AuthService = class AuthService {
    constructor(users, jwtService, configService, utilsService) {
        this.users = users;
        this.jwtService = jwtService;
        this.configService = configService;
        this.utilsService = utilsService;
        this.authTokenCode = this.configService.get('token_key');
        this.recoverTokenCode = 'iamlostxd';
    }
    async tokenIsValid(token, userid) {
        try {
            const tokensecret = this.authTokenCode;
            const exists = await this.users.findById(userid);
            const logs = this.jwtService.verify(token, { secret: tokensecret });
            if (!exists || !logs) {
                throw new common_1.BadRequestException('Not logged or invalid token');
            }
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException('Not logged or invalid token');
        }
    }
    async getUserById(id) {
        try {
            const user = await this.users.findById(id);
            if (!user) {
                throw new common_1.NotFoundException('The requested resource was not found');
            }
            return user;
        }
        catch (error) {
            console.warn(error);
            throw new common_1.NotFoundException('The requested resource was not found');
        }
    }
    async getUserByEmail(email) {
        const collection = await this.users.find({ email });
        const user = collection.find((e) => e.email === email);
        if (!user) {
            throw new common_1.BadRequestException('Not found data');
        }
        return user;
    }
    async getAllUsers() {
        const data = await this.users.find();
        return data;
    }
    async createUser(data) {
        try {
            data.password = await this.hash(data.password);
            return await this.users.create(data);
        }
        catch (error) {
            this.utilsService.logError(error, 'auth', 'createuser');
            throw new common_1.BadRequestException('Email/Username already exists.');
        }
    }
    async updateUser(newdata) {
        try {
            const userid = newdata._id;
            const { password } = await this.getUserById(userid);
            newdata.password = password;
            return await this.users.findByIdAndUpdate(newdata._id, newdata, {
                new: true,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Cannot update object, check ID and data types');
        }
    }
    async loginEmailPassword(email, password) {
        const user = await this.getUserByEmail(email);
        const right = await this.compare(password, user.password);
        if (!right) {
            throw new common_1.BadRequestException('Not found data');
        }
        const tokensecret = this.authTokenCode;
        const token = this.jwtService.sign({ id: user._id, role: user.role.roleName }, { expiresIn: '14d', secret: tokensecret });
        return { token, id: user._id };
    }
    async compare(password, hash) {
        const matched = await bcrypt.compare(password, hash);
        return matched;
    }
    async hash(password) {
        const saltrounds = Math.floor(Math.random() * 11);
        const hash = await bcrypt.hash(password, saltrounds);
        return hash;
    }
    async delete(userid) {
        try {
            return await this.users.findByIdAndDelete(userid);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async changePassword(id, newPassword) {
        try {
            const hashed = await this.hash(newPassword);
            return await this.users.findByIdAndUpdate(id, { $set: { password: hashed } }, { new: true });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async generateRecoveryCode(email) {
        try {
            const user = await this.getUserByEmail(email);
            const code = this.jwtService.sign({ id: user._id, password: user.password }, { expiresIn: '1h', secret: this.recoverTokenCode });
        }
        catch (e) {
            this.utilsService.logError(e, 'authModule', 'generaterecoverycode');
            throw new common_1.InternalServerErrorException('Could not send email');
        }
    }
    async recoverAccount(code, newPassword) {
        try {
            if (this.jwtService.verify(code, { secret: this.recoverTokenCode })) {
                const { id, password } = this.jwtService.decode(code);
                const user = await this.getUserById(id);
                if (password === user.password) {
                    await this.changePassword(id, newPassword);
                    return;
                }
                throw new common_1.BadRequestException('Password already changed');
            }
            throw new common_1.NotAcceptableException('Invalid code');
        }
        catch (e) {
            throw new common_1.BadRequestException('Cannot recover this account');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('users')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        config_1.ConfigService,
        utils_service_1.UtilsService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map