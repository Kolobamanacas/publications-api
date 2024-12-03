import { CqrsModule } from '@nestjs/cqrs';
import { CreateNewsCommandHandler } from '@news/application/commands/create-news.command-handler';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NewsApiController } from '@news/user-interface/controllers/news.api-controller';
import { NewsDbEntity } from '@news/infrastructure/database/entities/news.db-entity';
import { NewsRepository } from '@news/infrastructure/database/repositories/news.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

const modules = [
  CqrsModule,
  HttpModule,
  TypeOrmModule.forFeature([NewsDbEntity]),
];

const apiControllers = [NewsApiController];

const repositories = [{ provide: NewsRepository, useClass: NewsRepository }];

const commandHandlers = [CreateNewsCommandHandler];

@Module({
  controllers: [...apiControllers],
  imports: [...modules],
  providers: [...repositories, ...commandHandlers],
})
export class NewsModule {}
