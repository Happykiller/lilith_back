// src\usecase\user\getUser.usecase.ts
import { Inversify } from '@src/inversify/investify';
import { GetUserUsecaseDto, UserUsecaseModel } from '@happykiller/sunny-apis';

export class GetUserUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: GetUserUsecaseDto): Promise<UserUsecaseModel> {
    return await this.inversify.userRepository.get(dto);
  }
}