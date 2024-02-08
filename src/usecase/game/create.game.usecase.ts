import { Inversify } from '@src/inversify/investify';
import { GameUsecaseModel } from './model/game.usecase.model';
import { CreateGameUsecaseDto } from './dto/create.game.usecase.dto';

export class CreateGameUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: CreateGameUsecaseDto): Promise<GameUsecaseModel> {
    return await this.inversify.gameRepository.create(dto);
  }
}