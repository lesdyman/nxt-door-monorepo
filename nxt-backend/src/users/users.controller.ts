import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import type { CurrentAuthUser } from '../auth/current-user.decorator';
import { Public } from '../auth/public.decorator';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Onboarding: creates the profile row for the already-signed-up AuthUser.
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @CurrentUser() authUser: CurrentAuthUser,
  ) {
    return this.usersService.create(createUserDto, authUser.id);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() authUser: CurrentAuthUser,
  ) {
    return this.usersService.update(id, updateUserDto, authUser.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() authUser: CurrentAuthUser) {
    return this.usersService.remove(id, authUser.id);
  }
}
