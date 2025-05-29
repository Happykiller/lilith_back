// src\usecase\user\auth.usecase.ts
import { Inversify } from '@src/inversify/investify';
import { AuthUsecaseDto } from '@src/usecase/user/dto/auth.usecase.dto';
import { UserSessionUsecaseModel, UserUsecaseModel } from '@happykiller/sunny-apis';

export class AuthUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: AuthUsecaseDto): Promise<UserSessionUsecaseModel> {
    let user:UserUsecaseModel = await this.inversify.getUserUsecase.execute({
      code: dto.login
    });

    if (!user) {
      user = await this.inversify.createUserUsecase.execute({
        code: dto.login,
        password: dto.password
      });
    }

    const cryptPassword = this.inversify.cryptService.crypt({
      message: dto.password
    });

    if (user && user.password === cryptPassword) {
      return {
        ... user
      }
    } else {
      return null;
    }
  }
}