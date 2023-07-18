import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@modules/auth/auth.module';
import { StructsModule } from '@modules/structs/structs.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { EntriesModule } from '@modules/entries/entries.module';
import environment from './environment';

const ENV = environment()

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environment],
    }),
    MongooseModule.forRoot(ENV.db_string_connection),
    ThrottlerModule.forRoot({
      ttl: 120,
      limit: 20,
    }),
    AuthModule,
    EntriesModule,
    StructsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
