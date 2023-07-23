"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const fmp = require("@fastify/multipart");
const fsf = require("@fastify/static");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.register(fsf.default, {
        root: (0, path_1.join)(__dirname, '..', 'files'),
        prefix: '/files/',
    });
    app.register(fmp.default, {
        throwFileSizeLimit: true,
        limits: {
            fileSize: 1100000,
        },
    });
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map