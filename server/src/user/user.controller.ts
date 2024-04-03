import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProfileDto } from './dto/CreateProfileDto';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello() {
    return 'Hello World!';
  }

  @Get('/all')
  getAllUsers() {
    return this.userService.findAllUsers();
  }

  @Post('/register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/profile/create')
  @UseInterceptors(FileInterceptor('file'))
  createUserProfile(@Body() createProfileDto: CreateProfileDto) {
    return this.userService.createUserProfile(createProfileDto);
  }
}
