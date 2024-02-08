import { AuthUsecase } from '@src/usecase/user/auth.usecase';
import { CryptService } from '@src/service/crypt/crypt.service';
import { SessionRepository } from '@repository/session.repository';
import { GetUserUsecase } from '@src/usecase/user/getUser.usecase';
import { UserRepository } from '@src/repository/user/user.repository';
import { CreateUserUsecase } from '@src/usecase/user/createUser.usecase';
import { CryptServiceReal } from '@src/service/crypt/crypt.service.real';

export class Inversify {

  authUsecase: AuthUsecase;
  cryptService: CryptService;
  getUserUsecase: GetUserUsecase;
  userRepository: UserRepository;
  sessionRepository: SessionRepository;
  createUserUsecase: CreateUserUsecase;

  constructor() {
    this.authUsecase = new AuthUsecase(this);
    this.cryptService = new CryptServiceReal();
    this.userRepository = new UserRepository();
    this.getUserUsecase = new GetUserUsecase(this);
    this.sessionRepository = new SessionRepository();
    this.createUserUsecase = new CreateUserUsecase(this);
  }

}

const inversify = new Inversify();

export default inversify;