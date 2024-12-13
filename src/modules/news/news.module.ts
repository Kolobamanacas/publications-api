import Handlebars from 'handlebars';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateNewsCommandHandler } from '@news/application/commands/create-news.command-handler';
import { GetAllNewsWithDateHandler } from '@news/application/queries/get-all-news-with-date.query-handler';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NewsApiController } from '@news/user-interface/controllers/news.api-controller';
import { NewsDbEntity } from '@news/infrastructure/database/entities/news.db-entity';
import { NewsRepository } from '@news/infrastructure/database/repositories/news.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsTemplater } from '@news/infrastructure/templater/news.templater';
import { CreateNewsReportCommandHandler } from '@news/application/commands/create-news-report.command-handler';

export const TemplaterProviderToken = Symbol('TemplaterProviderToken');

const modules = [
  CqrsModule,
  HttpModule,
  TypeOrmModule.forFeature([NewsDbEntity]),
];

const apiControllers = [NewsApiController];

const repositories = [{ provide: NewsRepository, useClass: NewsRepository }];

const queryHandlers = [GetAllNewsWithDateHandler];

const commandHandlers = [
  CreateNewsCommandHandler,
  CreateNewsReportCommandHandler,
];

const otherProviders = [
  {
    provide: NewsTemplater,
    useFactory: () => {
      return new NewsTemplater(Handlebars.create());
    },
  },
];

@Module({
  controllers: [...apiControllers],
  imports: [...modules],
  providers: [
    ...repositories,
    ...queryHandlers,
    ...commandHandlers,
    ...otherProviders,
  ],
})
export class NewsModule {}
