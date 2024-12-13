import { GetAllNewsWithDateQuery } from '@news/application/queries/get-all-news-with-date.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NewsDto } from '@news/application/dtos/news.dto';
import { NewsRepository } from '@news/infrastructure/database/repositories/news.repository';
import { NewsRepositoryInterface } from '@news/application/ports/news-repository.interface';

export type GetAllNewsWithDateResult = NewsDto[];

@QueryHandler(GetAllNewsWithDateQuery)
export class GetAllNewsWithDateHandler
  implements IQueryHandler<GetAllNewsWithDateQuery>
{
  public constructor(
    @Inject(NewsRepository)
    private readonly newsRepository: NewsRepositoryInterface,
  ) {}

  public async execute(): Promise<GetAllNewsWithDateResult> {
    const news = await this.newsRepository.getAllNewsWithDate();

    return news.map(
      (pieceOfNews) =>
        new NewsDto(
          pieceOfNews.id.value,
          pieceOfNews.createdAt.toString(),
          pieceOfNews.url,
          pieceOfNews.title,
        ),
    );
  }
}
