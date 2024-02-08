import { Inversify } from '@src/inversify/investify';
import { GetGameUsecaseDto } from './dto/get.game.usecase.dto';
import { GameUsecaseModel } from './model/game.usecase.model';

export class GetGameUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: GetGameUsecaseDto): Promise<GameUsecaseModel> {
    return await this.inversify.gameRepository.get(dto);
  }
}