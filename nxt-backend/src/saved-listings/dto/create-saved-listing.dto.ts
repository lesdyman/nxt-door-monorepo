import { IsInt } from 'class-validator';

export class CreateSavedListingDto {
  @IsInt()
  userId!: number;

  @IsInt()
  listingId!: number;
}
