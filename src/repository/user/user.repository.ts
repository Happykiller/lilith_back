import mongoose from 'mongoose';

import { UserRepositoryModel } from '@src/repository/user/model/user.repository.model';
import { GetUserRepositoryDto } from '@src/repository/user/dto/get.user.repository.dto';
import { CreateUserRepositoryDto } from '@src/repository/user/dto/create.user.repository.dto';

export class UserRepository {

  collection: UserRepositoryModel[] = [{
    id: '65c5ed55aeb274278b5821c1',
    code: 'faro',
    secret: '6C81OaQDC13Zw0DFg6lZUDvxCfE8YvTbVOBj999XCrVmDBlOwdPUlqfcT5sp5qXGGZHijr7YyV6fUKPWEr2pzg=='
  }];

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