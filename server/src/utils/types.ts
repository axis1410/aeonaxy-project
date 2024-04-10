import { UserInterests } from 'src/typeorm/entities/Interests';

export type UserParams = {
  name: string;
  username: string;
  email: string;
  password: string;
  location: string;
  // interests: UserInterests[];
};
