import { Inversify } from '@src/inversify/investify';
import { UserUsecaseModel } from '@src/usecase/model/user.usecase.model';
import { CreateUserUsecaseDto } from '@src/usecase/dto/createUser.usecase.dto';

export class CreateUserUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: CreateUserUsecaseDto): Promise<UserUsecaseModel> {

    const secretCyrp = this.inversify.cryptService.crypt({
      message: dto.secret
    });

    return await this.inversify.userRepository.create({
      code: dto.code,
      secret: secretCyrp
    });
  }
}