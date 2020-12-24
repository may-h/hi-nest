import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Validation Pipe 생성 = Middleware, 더 강력한 유효성 검사 체크 : whitelist, forbidNonWhitelisted
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true,
      transform: true //자동으로 DTO 타입으로 변환
    })
  );
  await app.listen(3000);
}
bootstrap();
