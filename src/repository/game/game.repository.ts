import { ItemRecordRepository } from '@src/repository/game/model/item.repository.model';
import { GameRecordRepository } from '@src/repository/game/model/game.repository.model';
import { VoteRecordRepository } from '@src/repository/game/model/vote.repository.model';
import { GetGameRepositoryDto } from '@src/repository/game/dto/get.game.repository.dto';
import { DeleteItemRepositoryDto } from '@src/repository/game/dto/delete.item.repository.dto';
import { DeleteGameRepositoryDto } from '@src/repository/game/dto/delete.game.repository.dto';
import { UserJoinReprositoryDto } from '@src/repository/game/dto/userJoin.game.respository.dto';
import { CreateGameRepositoryDto } from '@src/repository/game/dto/create.game.repository.dto';
import { UpdateGameRepositoryDto } from '@src/repository/game/dto/update.game.repository.dto';
import { CreateItemRepositoryDto } from '@src/repository/game/dto/create.item.repository.dto';
import { UpdateItemRepositoryDto } from '@src/repository/game/dto/update.item.repository.dto';
import { CreateVoteRepositoryDto } from '@src/repository/game/dto/create.vote.repository.dto';
import { DeleteVoteRepositoryDto } from '@src/repository/game/dto/delete.vote.repository.dto';

export interface GameRepository {
  create(dto: CreateGameRepositoryDto): GameRecordRepository;
  get(dto: GetGameRepositoryDto): GameRecordRepository;
  getAll(): GameRecordRepository[];
  update(dto: UpdateGameRepositoryDto): GameRecordRepository;
  delete(dto: DeleteGameRepositoryDto): boolean;
  createItem(dto: CreateItemRepositoryDto): ItemRecordRepository;
  updateItem(dto: UpdateItemRepositoryDto): ItemRecordRepository;
  deleteItem(dto: DeleteItemRepositoryDto): boolean;
  userJoin(dto: UserJoinReprositoryDto): GameRecordRepository;
  createVote(dto: CreateVoteRepositoryDto): VoteRecordRepository;
  deleteVote(dto: DeleteVoteRepositoryDto): boolean;
}