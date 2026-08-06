import { IsString } from 'class-validator';

export class CreateUserDto {
  // Must equal the id of the AuthUser this profile belongs to (User.id is an
  // FK to authUser.id, not an autoincrement column).
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  avatar!: string;

  @IsString()
  placeId!: string;
}
