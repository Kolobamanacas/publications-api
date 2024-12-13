import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      exceptionFactory: (errors) => {
        const errorText = JSON.stringify(
          errors.reduce<{ [type: string]: string }[]>(
            (constrains, currentError) => {
              if (currentError.constraints === undefined) {
                return constrains;
              }

              return constrains.concat(currentError.constraints);
            },
            [],
          ),
        );

        return new BadRequestException(errorText);
      },
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`Application is running on port: ${port}.`);
}

bootstrap();
