import { Inversify } from '@src/inversify/investify';
import { DeleteGameUsecaseDto } from './dto/delete.game.usecase.dto';

export class DeleteGameUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: DeleteGameUsecaseDto): Promise<boolean> {
    return await this.inversify.gameRepository.delete(dto);
  }
}