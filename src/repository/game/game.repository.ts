import { ItemRepositoryModel } from '@repository/game/model/item.repository.model';
import { GameRepositoryModel } from '@repository/game/model/game.repository.model';
import { VoteRepositoryModel } from '@repository/game/model/vote.repository.model';
import { GetGameRepositoryDto } from '@repository/game/dto/get.game.repository.dto';
import { DeleteItemRepositoryDto } from '@repository/game/dto/delete.item.repository.dto';
import { DeleteGameRepositoryDto } from '@repository/game/dto/delete.game.repository.dto';
import { CreateGameRepositoryDto } from '@repository/game/dto/create.game.repository.dto';
import { UpdateGameRepositoryDto } from '@repository/game/dto/update.game.repository.dto';
import { CreateItemRepositoryDto } from '@repository/game/dto/create.item.repository.dto';
import { UpdateItemRepositoryDto } from '@repository/game/dto/update.item.repository.dto';
import { CreateVoteRepositoryDto } from '@repository/game/dto/create.vote.repository.dto';
import { DeleteVoteRepositoryDto } from '@repository/game/dto/delete.vote.repository.dto';
import { UserJoinReprositoryDto } from '@repository/game/dto/userJoin.game.respository.dto';
import { UserLeaveReprositoryDto } from '@repository/game/dto/user.leave.game.respository.dto';

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
  userLeave(dto: UserLeaveReprositoryDto): GameRepositoryModel;

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