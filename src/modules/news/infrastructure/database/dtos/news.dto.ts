import { Guid } from '@shared/types/guid';

export class NewsDto {
  public constructor(
    public readonly id: Guid,
    public readonly createdAt: Date,
    public readonly url: string,
    public readonly title: string,
  ) {}
}
