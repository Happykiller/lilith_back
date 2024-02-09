import { Inversify } from '@src/inversify/investify';
import { GameUsecaseModel } from '@usecase/game/model/game.usecase.model';
import { GetGameUsecaseDto } from '@usecase/game/dto/get.game.usecase.dto';

export class GetGameUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: GetGameUsecaseDto): Promise<GameUsecaseModel> {
    return await this.inversify.gameRepository.get(dto);
  }
}