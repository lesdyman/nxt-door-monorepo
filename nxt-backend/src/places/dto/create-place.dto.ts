import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BoundaryPointDto } from './boundary-point.dto';

export class CreatePlaceDto {
  @IsString()
  id!: string;
  @IsString()
  name!: string;

  @IsString()
  address!: string;

  @IsString({ each: true })
  buildings!: string[];

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BoundaryPointDto)
  boundary!: BoundaryPointDto[];

  @IsOptional()
  @IsString()
  mgmtPhone?: string;

  @IsOptional()
  @IsString()
  securityPhone?: string;

  @IsOptional()
  @IsString()
  elevatorEmergency?: string;
}
