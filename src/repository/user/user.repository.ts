import mongoose from 'mongoose';

import { UserRepositoryModel } from '@src/repository/user/model/user.repository.model';
import { GetUserRepositoryDto } from '@src/repository/user/dto/get.user.repository.dto';
import { CreateUserRepositoryDto } from '@src/repository/user/dto/create.user.repository.dto';

export class UserRepository {

  collection: UserRepositoryModel[] = [];

  get(dto: GetUserRepositoryDto): UserRepositoryModel {
    const user:UserRepositoryModel = this.collection.find(elt => {
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
      ... dto
    };
    this.collection.push(user);
    return user;
  }

}