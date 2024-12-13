import { Guid } from '@shared/types/guid';
import { News } from '@news/application/news';
import { NewsDto } from '@news/infrastructure/database/dtos/news.dto';

export interface NewsRepositoryInterface {
  createNews(news: News): Promise<News>;
  getNewsByIds(ids: Guid[]): Promise<News[]>;
  getAllNewsWithDate(): Promise<NewsDto[]>;
}
