// src\inversify\investify.ts
import { PubSub } from 'graphql-subscriptions';

import { config } from '@src/config';
import { AuthUsecase } from '@usecase/user/auth.usecase';
import { GetUserUsecase } from '@usecase/user/getUser.usecase';
import { GetGameUsecase } from '@usecase/game/get.game.usecase';
import { UserRepository } from '@repository/user/user.repository';
import { GameRepository } from '@repository/game/game.repository';
import { JoinGameUsecase } from '@usecase/game/join.game.usecase';
import { SessionRepository } from '@repository/session.repository';
import { LeaveGameUsecase } from '@usecase/game/leave.game.usecase';
import { CreateUserUsecase } from '@usecase/user/createUser.usecase';
import { CreateGameUsecase } from '@usecase/game/create.game.usecase';
import { CreateItemUsecase } from '@usecase/item/create.item.usecase';
import { CreateVoteUsecase } from '@usecase/vote/create.vote.usecase';
import { DeleteVoteUsecase } from '@usecase/vote/delete.vote.usecase';
import { UpdateItemUsecase } from '@usecase/item/update.item.usecase';
import { GetAllGameUsecase } from '@usecase/game/getAll.game.usecase';
import { GameFakeRepository } from '@repository/game/game.fake.repository';
import { CryptService, CryptServiceReal, logger, LoggerServiceFake } from '@happykiller/sunny-apis';

export class Inversify {
  pubSub: PubSub;
  loggerService: any;
  authUsecase: AuthUsecase;
  cryptService: CryptService;
  gameRepository: GameRepository;
  getUserUsecase: GetUserUsecase;
  userRepository: UserRepository;
  getGameUsecase: GetGameUsecase;
  joinGameUsecase: JoinGameUsecase;
  leaveGameUsecase: LeaveGameUsecase;
  createItemUsecase: CreateItemUsecase;
  sessionRepository: SessionRepository;
  createUserUsecase: CreateUserUsecase;
  createGameUsecase: CreateGameUsecase;
  createVoteUsecase: CreateVoteUsecase;
  deleteVoteUsecase: DeleteVoteUsecase;
  updateItemUsecase: UpdateItemUsecase;
  getAllGameUsecase: GetAllGameUsecase;

  constructor() {
    /**
     * Services
     */
    this.pubSub = new PubSub();
    this.cryptService = new CryptServiceReal(config);
    if (config.env.mode === 'prod') {
      this.loggerService = logger;
    } else if (config.env.mode === 'dev') {
      this.loggerService = new LoggerServiceFake();
    } else {
      this.loggerService = new LoggerServiceFake();
    }

    /**
     * Repositories
     */
    this.userRepository = new UserRepository();
    this.gameRepository = new GameFakeRepository();
    this.sessionRepository = new SessionRepository();

    /**
     * Usecases
     */
    this.authUsecase = new AuthUsecase(this);
    this.getGameUsecase = new GetGameUsecase(this);
    this.getUserUsecase = new GetUserUsecase(this);
    this.joinGameUsecase = new  JoinGameUsecase(this);
    this.leaveGameUsecase = new  LeaveGameUsecase(this);
    this.createItemUsecase = new CreateItemUsecase(this);
    this.createVoteUsecase = new CreateVoteUsecase(this);
    this.createUserUsecase = new CreateUserUsecase(this);
    this.createGameUsecase = new CreateGameUsecase(this);
    this.deleteVoteUsecase = new DeleteVoteUsecase(this);
    this.updateItemUsecase = new UpdateItemUsecase(this);
    this.getAllGameUsecase = new GetAllGameUsecase(this);
  }

}

const inversify = new Inversify();

export default inversify;