import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { sendMail } from 'src/utils/mail';
import { ProfileParams, UserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  findAllUsers() {
    return this.userRepository.find({ relations: ['profile'] });
  }

  async createUser(userDetails: UserParams) {
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

    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });

    sendMail();

    return this.userRepository.save(newUser);
  }

  async createUserProfile(id: number, file: Express.Multer.File, profileDetails: ProfileParams) {
    const existingUser = await this.userRepository.findOneBy({ id });

    if (!existingUser) throw new HttpException('User not found', 404);

    const uploadedFile = await this.cloudinaryService
      .uploadFile(file)
      .catch((err: any) => console.log(err));

    // @ts-ignore
    const avatarUrl = uploadedFile.secure_url;

    const newProfile = this.profileRepository.create({
      ...profileDetails,
      avatarUrl,
    });

    const savedProfile = await this.profileRepository.save(newProfile);

    existingUser.profile = savedProfile;

    return this.userRepository.save(existingUser);
  }
}
