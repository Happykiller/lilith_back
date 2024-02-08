import { Inversify } from '@src/inversify/investify';
import { DeleteVoteUsecaseDto } from '@usecase/vote/dto/delete.vote.usecase.dto';

export class DeleteVoteUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: DeleteVoteUsecaseDto): Promise<boolean> {
    return await this.inversify.gameRepository.deleteVote(dto);
  }
}