import { InjectRepository } from '@nestjs/typeorm';
import { News } from '@news/application/news';
import { NewsRepositoryInterface } from '@news/application/ports/news-repository.interface';
import { NewsDbEntity } from '@news/infrastructure/database/entities/news.db-entity';
import { UnableToMapNewsDbEntityError } from '@news/infrastructure/database/repositories/errors/unable-to-map-news-db-entity.error';
import { Repository } from 'typeorm';

export class NewsRepository
  extends Repository<NewsDbEntity>
  implements NewsRepositoryInterface
{
  public constructor(
    @InjectRepository(NewsDbEntity) repository: Repository<NewsDbEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  public async createNews(news: News): Promise<News> {
    const savedNews = await this.save(this.toDatabaseEntity(news));

    return this.toDomainEntity(savedNews);
  }

  private toDatabaseEntity(domainEntity: News): NewsDbEntity {
    return super.create({
      id: domainEntity.id,
      title: domainEntity.title,
      url: domainEntity.url,
    });
  }

  private toDomainEntity(dbEntity: NewsDbEntity): News {
    const domainEntity = News.Load(dbEntity.id, dbEntity.url, dbEntity.title);

    if (domainEntity === null) {
      throw new UnableToMapNewsDbEntityError(
        dbEntity.id.value,
        dbEntity.url,
        dbEntity.title,
      );
    }

    return domainEntity;
  }
}
