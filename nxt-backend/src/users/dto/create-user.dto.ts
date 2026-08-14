import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsString()
  placeId!: string;
}
