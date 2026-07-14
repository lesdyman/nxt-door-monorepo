import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ListingSide, ListingStatus } from '../../generated/prisma/enums';

export class CreateListingDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsString()
  currency!: string;

  @IsArray()
  @IsString({ each: true })
  images!: string[];

  @IsEnum(ListingSide)
  side!: ListingSide;

  @IsString()
  category!: string;

  @IsOptional()
  @IsEnum(ListingStatus)
  status?: ListingStatus;

  @IsInt()
  userId!: number;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsString()
  address!: string;
}
