import { Inversify } from '@src/inversify/investify';
import { VoteUsecaseModel } from '@usecase/vote/model/vote.usecase.model';
import { CreateVoteUsecaseDto } from '@usecase/vote/dto/create.vote.usecase.dto';

export class CreateVoteUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: CreateVoteUsecaseDto): Promise<VoteUsecaseModel> {
    return await this.inversify.gameRepository.createVote(dto);
  }
}