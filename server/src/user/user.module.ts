import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [CloudinaryModule, TypeOrmModule.forFeature([User, Profile])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
