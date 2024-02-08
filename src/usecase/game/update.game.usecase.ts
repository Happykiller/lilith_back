import { Inversify } from '@src/inversify/investify';
import { GameUsecaseModel } from '@usecase/game/model/game.usecase.model';
import { UpdateGameUsecaseDto } from '@usecase/game/dto/update.game.usecase.dto';

export class UpdateGameUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: UpdateGameUsecaseDto): Promise<GameUsecaseModel> {
    return await this.inversify.gameRepository.update(dto);
  }
}