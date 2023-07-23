import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fmp = require('@fastify/multipart');
import fsf = require('@fastify/static');
import { join } from 'path';

/**
 * main entrypoint
 */
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.register(fsf.default, {
    root: join(__dirname, '..', 'files'),
    prefix: '/files/',
  });
  app.register(fmp.default, {
    throwFileSizeLimit: true,
    limits: {
      fileSize: 1100000,
    },
  });
  // app.register(ncors.default);
  // app.useWebSocketAdapter(new WsAdapter(app));

  app.enableCors();

  await app.listen(3000);
}

bootstrap();
