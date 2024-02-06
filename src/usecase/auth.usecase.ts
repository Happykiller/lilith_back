import { Inversify } from '@src/inversify/investify';
import { AuthUsecaseDto } from '@src/usecase/dto/auth.usecase.dto';
import { UserUsecaseModel } from '@src/usecase/model/user.usecase.model';
import { UserSessionUsecaseModel } from '@src/usecase/model/userSession.usecase.model';

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
        secret: dto.secret
      });
    }

    const cryptPassword = this.inversify.cryptService.crypt({
      message: dto.secret
    });

    if (user && user.secret === cryptPassword) {
      return {
        id: user.id,
        code: user.code
      }
    } else {
      return null;
    }
  }
}