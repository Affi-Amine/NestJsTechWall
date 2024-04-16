import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    (req: Request, res: Response, next: NextFunction) => {
      console.log('This is a middleware from app.use');
      next();
    }
  )
  app.useGlobalPipes(new ValidationPipe({
    transform: true, //myQueriesParams: GetPaginatedTodoDto, typeOf(myQueriesParams) is not Get..., so we need to
                     //make this transform in the main so when we instatiante an object with TS it actually gives its type
    whitelist: true, //this will remove all the properties that are not in the DTO by @
    forbidNonWhitelisted: true, //this will make the server return an error if we send a property that is not in the DTO
  }
  )); //here we instantiated the object because we cannot do DI beacuse
                                            //main.ts has no module, it is the file which bootstraps the app
  await app.listen(3000);
}
bootstrap();
