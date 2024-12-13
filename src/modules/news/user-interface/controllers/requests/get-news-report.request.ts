import { ArrayNotEmpty, IsArray, IsDefined } from 'class-validator';
import { Guid } from '@shared/types/guid';
import { IsGuid } from '@shared/user-interface/validators/is-guid.validator';
import { Transform } from 'class-transformer';

export class GetNewsReportRequest {
  @Transform(
    (newsIdsRawData) => {
      if (
        !Array.isArray(newsIdsRawData.value) ||
        newsIdsRawData.value.some((id) => !Guid.isGuid(id))
      ) {
        // NestJS's policy is to tranform data before validate, hence we return original value for validators to fail.
        return newsIdsRawData;
      }

      return newsIdsRawData.value.map((id) => Guid.create(id));
    },
    { toClassOnly: true },
  )
  @IsGuid({
    each: true,
  })
  @ArrayNotEmpty()
  @IsArray()
  @IsDefined()
  newsIds: Guid[];
}
