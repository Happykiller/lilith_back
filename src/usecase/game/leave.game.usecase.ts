import { Inversify } from '@src/inversify/investify';
import { GameUsecaseModel } from '@usecase/game/model/game.usecase.model';
import { LeaveGameUsecaseDto } from '@usecase/game/dto/leave.game.usecase.dto';

export class LeaveGameUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: LeaveGameUsecaseDto): Promise<GameUsecaseModel> {
    return this.inversify.gameRepository.userLeave(dto);
  }
}