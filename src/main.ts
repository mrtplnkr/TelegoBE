import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    //Add your origins here
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
  await app.listen(8080);
}
bootstrap();
