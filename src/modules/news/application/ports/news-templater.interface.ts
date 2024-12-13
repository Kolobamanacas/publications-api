import { News } from '@news/application/news';

export interface NewsTemplaterInterface {
  createNewsReport(news: News[]): Promise<string>;
}
