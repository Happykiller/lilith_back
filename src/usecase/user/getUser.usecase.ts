import { Inversify } from '@src/inversify/investify';
import { UserUsecaseModel } from '@src/usecase/user/model/user.usecase.model';
import { GetUserUsecaseDto } from '@src/usecase/user/dto/getUser.usecase.dto';

export class GetUserUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: GetUserUsecaseDto): Promise<UserUsecaseModel> {
    return await this.inversify.userRepository.get(dto);
  }
}