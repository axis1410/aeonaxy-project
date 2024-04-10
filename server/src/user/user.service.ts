import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { ResendService } from 'nestjs-resend';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { UserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly resendService: ResendService,
    private readonly configService: ConfigService,
  ) {}

  findAllUsers() {
    return this.userRepository.find({
      relations: ['profile'],
      select: ['id', 'username', 'email', 'name', 'createdAt', 'profile'],
    });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({
      select: ['id', 'username', 'email'],
      relations: ['profile'],
      where: { id },
    });
  }

  async createUser(userDetails: UserParams, file: Express.Multer.File) {
    console.log(userDetails);
    const existingUserByUsername = await this.userRepository.findOneBy({
      username: userDetails.username,
    });

    const existingUserByEmail = await this.userRepository.findOneBy({
      email: userDetails.email,
    });

    if (existingUserByEmail && existingUserByUsername) {
      throw new HttpException('Username and Email already exist', 400);
    }

    if (existingUserByUsername) {
      throw new HttpException('Username already exists', 400);
    }

    if (existingUserByEmail) {
      throw new HttpException('Email already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
    userDetails.password = hashedPassword;

    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });

    const uploadedFile = await this.cloudinaryService
      .uploadFile(file)
      .catch((err: any) => console.log(err));

    // @ts-ignore
    const avatarUrl = uploadedFile.secure_url;

    const newProfile = this.profileRepository.create({
      location: userDetails.location,
      avatarUrl,
    });

    const savedProfile = await this.profileRepository.save(newProfile);

    newUser.profile = savedProfile;

    await this.resendService.send({
      from: this.configService.get<string>('RESEND_SENDER'),
      to: this.configService.get<string>('RESEND_RECEIVER'),
      subject: 'Registration Successful',
      html: 'Hello <a>Click here to complete verification</a>',
    });

    return this.userRepository.save(newUser);
  }
}
