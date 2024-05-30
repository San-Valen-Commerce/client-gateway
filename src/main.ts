import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { ClassSerializerInterceptor, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
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
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(envs.PORT);

  logger.log(`Gateway running on port ${envs.PORT}`);
}
bootstrap();
