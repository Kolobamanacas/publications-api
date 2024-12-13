import { EmptyTitleError } from '@news/application/errors/empty-title.error';
import { InvalidUrlError } from '@news/application/errors/invalid-url.error';
import { Guid } from '@shared/types/guid';
import { isURL } from 'validator';

type NewsProps = {
  id: Guid;
  url: string;
  title: string;
};

export class News {
  private constructor(private readonly props: NewsProps) {}

  public get id(): Guid {
    return this.props.id;
  }

  public get url(): string {
    return this.props.url;
  }

  public get title(): string {
    return this.props.title;
  }

  public static Create(url: string, title: string): News {
    if (!isURL(url)) {
      throw new InvalidUrlError(url);
    }

    if (title.length === 0) {
      throw new EmptyTitleError();
    }

    return new News({ id: Guid.generate(), url, title });
  }

  public static Load(id: Guid, url: string, title: string): News {
    if (!isURL(url)) {
      throw new InvalidUrlError(url);
    }

    if (title.length === 0) {
      throw new EmptyTitleError();
    }

    return new News({ id, url, title });
  }
}
