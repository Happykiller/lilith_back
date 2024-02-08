import { Inversify } from '@src/inversify/investify';
import { GameUsecaseModel } from './model/game.usecase.model';

export class GetAllGameUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(): Promise<GameUsecaseModel[]> {
    return await this.inversify.gameRepository.getAll();
  }
}