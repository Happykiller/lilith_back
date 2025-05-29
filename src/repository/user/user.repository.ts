import mongoose from 'mongoose';

import { config } from '@src/config';
import { UserRepositoryModel } from '@src/repository/user/model/user.repository.model';
import { GetUserRepositoryDto } from '@src/repository/user/dto/get.user.repository.dto';
import { CreateUserRepositoryDto } from '@src/repository/user/dto/create.user.repository.dto';

export class UserRepository {

  collection: UserRepositoryModel[] = [];

  constructor() {
    if (config.env.mode === 'dev') {
      this.collection.push({
        id: '66c4653ffa469b1998529311',
        code: 'faro',
        password: 'aprYlFvT+A9NMTYF6+/xtvuF5uEaN8WVXHdq6CDLEovroiQnRKvJxeMyiXrlNo/Na/teHxVWkVJZr/Fjyu/3xw==', // pass avec secretKey,
        name_first: null,
        name_last: null,
        description: null,
        mail: null,
        role: 'USER',
        active: true
      });
    }
  }

  get(dto: GetUserRepositoryDto): UserRepositoryModel {
    const user: UserRepositoryModel = this.collection.find(elt => {
      if (dto.id) {
        return elt.id === dto.id;
      } else if (dto.code) {
        return elt.code === dto.code;
      } else {
        return false;
      }
    });
    return user;
  }

  create(dto: CreateUserRepositoryDto): UserRepositoryModel {
    const user = {
      id: new mongoose.Types.ObjectId().toString(),
      ...dto,
      name_first: null,
      name_last: null,
      description: null,
      mail: null,
      role: 'USER',
      active: true
    };
    this.collection.push(user);
    return user;
  }

}