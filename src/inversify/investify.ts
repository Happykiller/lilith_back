import { AuthUsecase } from '@src/usecase/auth.usecase';
import { UserRepository } from '@repository/user.repository';
import { GetUserUsecase } from '@src/usecase/getUser.usecase';
import { CryptService } from '@src/service/crypt/crypt.service';
import { SessionRepository } from '@repository/session.repository';
import { CreateUserUsecase } from '@src/usecase/createUser.usecase';
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