import { Inversify } from '@src/inversify/investify';
import { GameUsecaseModel } from '@usecase/game/model/game.usecase.model';
import { GetAllGameUsecaseDto } from '@usecase/game/dto/getAll.game.usecase.dto';
import { GameRepositoryModel } from '@src/repository/game/model/game.repository.model';

export class GetAllGameUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: GetAllGameUsecaseDto): Promise<GameUsecaseModel[]> {
    const games:GameRepositoryModel[] = await this.inversify.gameRepository.getAll();
    return games.filter((game) => (
      game.author_id === dto.user_id
      || game.members.includes(dto.user_id)
    ));
  }
}