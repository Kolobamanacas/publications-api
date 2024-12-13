import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateNewsCommand } from '@news/application/commands/create-news.command';
import { CreateNewsReportCommand } from '@news/application/commands/create-news-report.command';
import { CreateNewsReportResult } from '@news/application/commands/create-news-report.command-handler';
import { CreateNewsResult } from '@news/application/commands/create-news.command-handler';
import { GetAllNewsWithDateQuery } from '@news/application/queries/get-all-news-with-date.query';
import { GetAllNewsWithDateResult } from '@news/application/queries/get-all-news-with-date.query-handler';
import { GetNewsReportRequest } from '@news/user-interface/controllers/requests/get-news-report.request';
import { NewsDto } from '@news/user-interface/controllers/dtos/news.dto';
import { UnableToCreateNewsError } from '@news/user-interface/controllers/errors/unable-to-create-news.error';
import { UnableToGetNewsError } from '@news/user-interface/controllers/errors/unable-to-get-news.error';

@Controller('news')
export class NewsApiController {
  public constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  public async getNews(): Promise<NewsDto[]> {
    try {
      return this.queryBus.execute<
        GetAllNewsWithDateQuery,
        GetAllNewsWithDateResult
      >(new GetAllNewsWithDateQuery());
    } catch (_error) {
      throw new UnableToGetNewsError();
    }
  }

  @Post()
  public async createNews(@Body() { url }: { url: string }): Promise<string> {
    try {
      const newsId = await this.commandBus.execute<
        CreateNewsCommand,
        CreateNewsResult
      >(new CreateNewsCommand(url));

      return newsId.value;
    } catch (_error) {
      throw new UnableToCreateNewsError(url);
    }
  }

  @Post('/report')
  public async getNewsReport(
    @Body() request: GetNewsReportRequest,
  ): Promise<string> {
    const reportUrl = await this.commandBus.execute<
      CreateNewsReportCommand,
      CreateNewsReportResult
    >(new CreateNewsReportCommand(request.newsIds));

    return reportUrl;
  }
}
