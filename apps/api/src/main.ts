import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const envFile =
    process.env.NODE_ENV === 'development' ? '.env.db.develop' : '.env.db';
  const dbEnv = config({ path: [envFile] });
  expand(dbEnv);

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Dutch Treat App')
    .setDescription('A dutch treat application api.')
    .setVersion('1.0')
    .addTag('dutch-treat-api')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_: string, methodKey: string) => methodKey,
  };
  const documentFactory = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    options,
  );
  SwaggerModule.setup('api', app, documentFactory);

  // Logging Interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  // validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.PORT ?? 3005);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
