import { Guid } from '@shared/types/guid';

export class CreateNewsReportCommand {
  public constructor(public readonly ids: Guid[]) {}
}
