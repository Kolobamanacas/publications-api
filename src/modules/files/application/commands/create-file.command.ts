import { FileType } from 'src/modules/files/application/enums/file-type.enum';

export class CreateFileCommand {
  public constructor(
    public readonly fileContent: string,
    public readonly fileType: FileType,
  ) {}
}
