import { ItemRepositoryModel } from '@src/repository/game/model/item.repository.model';
import { GameRepositoryModel } from '@src/repository/game/model/game.repository.model';
import { VoteRepositoryModel } from '@src/repository/game/model/vote.repository.model';
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
  /**
   * GAME
   */
  getAll(): GameRepositoryModel[];
  delete(dto: DeleteGameRepositoryDto): boolean;
  get(dto: GetGameRepositoryDto): GameRepositoryModel;
  create(dto: CreateGameRepositoryDto): GameRepositoryModel;
  update(dto: UpdateGameRepositoryDto): GameRepositoryModel;
  //  Actions
  userJoin(dto: UserJoinReprositoryDto): GameRepositoryModel;

  /**
   * ITEM
   */
  deleteItem(dto: DeleteItemRepositoryDto): boolean;
  createItem(dto: CreateItemRepositoryDto): ItemRepositoryModel;
  updateItem(dto: UpdateItemRepositoryDto): ItemRepositoryModel;

  /**
   * VOTE
   */
  deleteVote(dto: DeleteVoteRepositoryDto): boolean;
  createVote(dto: CreateVoteRepositoryDto): VoteRepositoryModel;
}