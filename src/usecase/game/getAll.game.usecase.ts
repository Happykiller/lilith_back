import { Inversify } from '@src/inversify/investify';
import { GameUsecaseModel } from '@usecase/game/model/game.usecase.model';
import { GetAllGameUsecaseDto } from '@usecase/game/dto/getAll.game.usecase.dto';

export class GetAllGameUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: GetAllGameUsecaseDto): Promise<GameUsecaseModel[]> {
    return await this.inversify.gameRepository.getAll();
  }
}