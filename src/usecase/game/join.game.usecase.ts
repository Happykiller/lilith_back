import { Inversify } from '@src/inversify/investify';
import { GameUsecaseModel } from './model/game.usecase.model';
import { JoinGameUsecaseDto } from './dto/join.game.usecase.dto';

export class JoinGameUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: JoinGameUsecaseDto): Promise<GameUsecaseModel> {
    return await this.inversify.gameRepository.userJoin(dto);
  }
}