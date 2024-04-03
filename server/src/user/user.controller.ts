import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage, memoryStorage } from 'multer';
import * as path from 'path';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CreateProfileDto } from './dto/CreateProfileDto';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserService } from './user.service';

export const storage: multer.StorageEngine = diskStorage({
  destination: './uploads/profile',
  filename: (req, file, cb) => {
    const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
    const extension: string = path.parse(file.originalname).ext;

    cb(null, `${filename}.${extension}`);
  },
});

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  getAllUsers() {
    return this.userService.findAllUsers();
  }

  @Post('/register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/:id/profile/create')
  @UseInterceptors(FileInterceptor('file'))
  uploadProfilePicture(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.userService.createUserProfile(id, file, createProfileDto);
  }
}
