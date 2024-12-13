import { Guid } from '@shared/types/guid';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from '@news/application/news';
import { NewsDbEntity } from '@news/infrastructure/database/entities/news.db-entity';
import { NewsDto } from '@news/infrastructure/database/dtos/news.dto';
import { NewsRepositoryInterface } from '@news/application/ports/news-repository.interface';

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

  public async getNewsByIds(ids: Guid[]): Promise<News[]> {
    const news = await this.findBy({
      id: In(ids),
    });

    return news.map((pieceOfNews) => this.toDomainEntity(pieceOfNews));
  }

  public async getAllNewsWithDate(): Promise<NewsDto[]> {
    const news = await this.find();

    return news.map((pieceOfNews) => this.toDto(pieceOfNews));
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

    return domainEntity;
  }

  private toDto(dbEntity: NewsDbEntity): NewsDto {
    return {
      createdAt: dbEntity.createdAt,
      id: dbEntity.id,
      title: dbEntity.title,
      url: dbEntity.url,
    };
  }
}
