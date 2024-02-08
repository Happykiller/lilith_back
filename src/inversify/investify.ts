import { AuthUsecase } from '@usecase/user/auth.usecase';
import { CryptService } from '@service/crypt/crypt.service';
import { GetUserUsecase } from '@usecase/user/getUser.usecase';
import { UserRepository } from '@repository/user/user.repository';
import { GameRepository } from '@repository/game/game.repository';
import { SessionRepository } from '@repository/session.repository';
import { CreateUserUsecase } from '@usecase/user/createUser.usecase';
import { CryptServiceReal } from '@service/crypt/crypt.service.real';
import { CreateGameUsecase } from '@usecase/game/create.game.usecase';
import { GameFakeRepository } from '@repository/game/game.fake.repository';
import { JoinGameUsecase } from '../usecase/game/join.game.usecase';
import { CreateItemUsecase } from '../usecase/item/create.item.usecase';
import { CreateVoteUsecase } from '../usecase/vote/create.vote.usecase';
import { DeleteVoteUsecase } from '../usecase/vote/delete.vote.usecase';
import { UpdateItemUsecase } from '../usecase/item/update.item.usecase';

export class Inversify {

  authUsecase: AuthUsecase;
  cryptService: CryptService;
  createItemUsecase: CreateItemUsecase;
  gameRepository: GameRepository;
  getUserUsecase: GetUserUsecase;
  userRepository: UserRepository;
  joinGameUsecase: JoinGameUsecase;
  sessionRepository: SessionRepository;
  createUserUsecase: CreateUserUsecase;
  createGameUsecase: CreateGameUsecase;
  createVoteUsecase: CreateVoteUsecase;
  deleteVoteUsecase: DeleteVoteUsecase;
  updateItemUsecase: UpdateItemUsecase;

  constructor() {
    this.authUsecase = new AuthUsecase(this);
    this.createItemUsecase = new CreateItemUsecase(this);
    this.cryptService = new CryptServiceReal();
    this.userRepository = new UserRepository();
    this.gameRepository = new GameFakeRepository();
    this.createVoteUsecase = new CreateVoteUsecase(this);
    this.getUserUsecase = new GetUserUsecase(this);
    this.sessionRepository = new SessionRepository();
    this.joinGameUsecase = new  JoinGameUsecase(this);
    this.createUserUsecase = new CreateUserUsecase(this);
    this.createGameUsecase = new CreateGameUsecase(this);
    this.deleteVoteUsecase = new DeleteVoteUsecase(this);
    this.updateItemUsecase = new UpdateItemUsecase(this);

  }

}

const inversify = new Inversify();

export default inversify;