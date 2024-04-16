import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './middlewares/first/first.middleware';
import { logger } from './middlewares/first/logger.middleware';

@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(FirstMiddleware, logger).forRoutes(
      {path:'todo', method: RequestMethod.GET}, //here instead of using the default routing method instead we re using RouteInfo
      {path:'todo*', method: RequestMethod.DELETE}  //the * : every route that starts with todo
    );
  }
}
