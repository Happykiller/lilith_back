// src\usecase\user\createUser.usecase.ts
import { Inversify } from '@src/inversify/investify';
import { UserUsecaseModel } from '@happykiller/sunny-apis';
import { CreateUserUsecaseDto } from '@usecase/user/dto/createUser.usecase.dto';

export class CreateUserUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: CreateUserUsecaseDto): Promise<UserUsecaseModel> {

    const passwordCyrp = this.inversify.cryptService.crypt({
      message: dto.password
    });

    return await this.inversify.userRepository.create({
      code: dto.code,
      password: passwordCyrp
    });
  }
}