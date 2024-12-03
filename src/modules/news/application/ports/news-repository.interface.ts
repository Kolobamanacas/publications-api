import { News } from '@news/application/news';

export interface NewsRepositoryInterface {
  createNews(news: News): Promise<News>;
}
