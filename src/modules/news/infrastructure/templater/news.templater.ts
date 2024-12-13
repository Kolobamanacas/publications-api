import Handlebars from 'handlebars';
import { Inject } from '@nestjs/common';
import { News } from '@news/application/news';
import { NewsTemplaterInterface } from '@news/application/ports/news-templater.interface';
import { TemplaterProviderToken } from '@news/news.module';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export class NewsTemplater implements NewsTemplaterInterface {
  public constructor(
    @Inject(TemplaterProviderToken)
    private readonly templater: typeof Handlebars,
  ) {}

  public async createNewsReport(news: News[]): Promise<string> {
    const filePath = resolve(
      __dirname,
      'templates',
      'news-report.template.hbs',
    );

    const blankTemplate = await readFile(filePath, { encoding: 'utf-8' });
    const fillTemplateWithData = this.templater.compile(blankTemplate);

    const data = news.map((pieceOfNews) => {
      return {
        url: pieceOfNews.url,
        title: pieceOfNews.title,
      };
    });

    const html = fillTemplateWithData({ news: data });

    // TODO: Replace with download URL.
    return html;
  }
}
