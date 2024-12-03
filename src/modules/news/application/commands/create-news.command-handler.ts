import { AxiosResponse } from 'axios';
import { BadResponseError } from '@news/application/commands/errors/bad-response.error';
import { ChildNode, Document } from 'parse5/dist/tree-adapters/default';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewsCommand } from '@news/application/commands/create-news.command';
import { Guid } from '@shared/types/guid';
import { HttpService } from '@nestjs/axios';
import { Inject } from '@nestjs/common';
import { InvalidUrlError } from '@news/application/commands/errors/invalid-url.error';
import { News } from '@news/application/news';
import { NewsRepository } from '@news/infrastructure/database/repositories/news.repository';
import { NewsRepositoryInterface } from '@news/application/ports/news-repository.interface';
import { UnableToCreateNewsError } from '@news/application/commands/errors/unable-to-create-news.error';
import { UnableToGetTitleFromPageError } from '@news/application/commands/errors/unable-to-get-title-from-page.error';
import { firstValueFrom } from 'rxjs';
import { isURL } from 'validator';
import { parse } from 'parse5';

export type CreateNewsResult = Guid;

@CommandHandler(CreateNewsCommand)
export class CreateNewsCommandHandler
  implements ICommandHandler<CreateNewsCommand>
{
  public constructor(
    private readonly httpService: HttpService,
    @Inject(NewsRepository)
    private readonly newsRepository: NewsRepositoryInterface,
  ) {}

  public async execute({ url }: CreateNewsCommand): Promise<CreateNewsResult> {
    if (!isURL(url)) {
      throw new InvalidUrlError(url);
    }

    const title = await this.getTitleByUrl(url);
    const newsToCreate = News.Create(url, title);

    if (newsToCreate === null) {
      throw new UnableToCreateNewsError(url, title);
    }

    const news = await this.newsRepository.createNews(newsToCreate);

    return news.id;
  }

  private async getTitleByUrl(url: string): Promise<string> {
    let response: AxiosResponse;

    try {
      response = await firstValueFrom(
        this.httpService.get(url, { responseType: 'text' }),
      );
    } catch (_error) {
      throw new BadResponseError(url);
    }

    if (typeof response.data !== 'string') {
      throw new UnableToGetTitleFromPageError(url);
    }

    const document = parse(response.data);
    const titleText = this.getTitleFromDocument(document);

    if (titleText === null) {
      throw new UnableToGetTitleFromPageError(url);
    }

    return titleText;
  }

  private getTitleFromDocument(
    node: Document | ChildNode | null,
  ): string | null {
    if (node === null) {
      return null;
    }

    if (!('childNodes' in node)) {
      return null;
    }

    if (node.nodeName === 'title') {
      if (
        !('value' in node.childNodes[0]) ||
        node.childNodes[0].value.length <= 0
      ) {
        return null;
      }

      return node.childNodes[0].value;
    }

    const titleFoundInChildren = node.childNodes.reduce(
      (foundValue: string | null, currentChild: ChildNode) => {
        const result = this.getTitleFromDocument(currentChild);

        if (result === null) {
          return foundValue;
        }

        return result;
      },
      null,
    );

    return titleFoundInChildren;
  }
}
