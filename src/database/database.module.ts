import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        // host: configService.getOrThrow('MYSQL_HOST'),
        // port: configService.getOrThrow('MYSQL_PORT'),
        database: configService.getOrThrow('DATABASE_FILE'),
        // username: configService.getOrThrow('MYSQL_USERNAME'),
        // password: configService.getOrThrow('MYSQL_PASSWORD'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
