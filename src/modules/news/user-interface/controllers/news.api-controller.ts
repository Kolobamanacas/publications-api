import { Body, Controller, Post } from '@nestjs/common';
import { CreateNewsCommand } from '@news/application/commands/create-news.command';
import { CreateNewsResult } from '@news/application/commands/create-news.command-handler';
import { CommandBus } from '@nestjs/cqrs';
import { UnableToCreateNewsError } from '@news/user-interface/controllers/errors/unable-to-create-news.error';

@Controller('news')
export class NewsApiController {
  public constructor(private readonly commandBus: CommandBus) {}

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
}
