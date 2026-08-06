import { IsInt, IsString } from 'class-validator';

export class CreateSavedListingDto {
  @IsString()
  userId!: string;

  @IsInt()
  listingId!: number;
}
