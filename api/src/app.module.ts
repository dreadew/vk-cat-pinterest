import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  dbHostEnv,
  dbNameEnv,
  dbPasswordEnv,
  dbPortEnv,
  dbUserEnv,
  envFilePath,
} from './constants/constants';
import { LikeModule } from './like/like.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePath,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(dbHostEnv),
        port: configService.get(dbPortEnv),
        username: configService.get(dbUserEnv),
        password: configService.get(dbPasswordEnv),
        database: configService.get(dbNameEnv),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    UserModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
