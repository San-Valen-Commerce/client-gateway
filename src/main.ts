import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new RpcCustomExceptionFilter())

  const config = new DocumentBuilder()
    .setTitle('San Valens Commerce API')
    .setDescription('The San Valens Commerce Rest API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(envs.PORT);

  logger.log(`Gateway running on port ${envs.PORT}`);
}
bootstrap();