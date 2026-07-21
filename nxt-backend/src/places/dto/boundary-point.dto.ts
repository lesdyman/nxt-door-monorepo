import { IsNumber } from 'class-validator';

export class BoundaryPointDto {
  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;
}
