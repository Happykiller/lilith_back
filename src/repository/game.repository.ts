import { ItemRecordRepository } from '@repository/model/item.repository';
import { GameRecordRepository } from '@repository/model/game.repository';
import { GetGameRepositoryDto } from '@repository/dto/get.game.repository';
import { DeleteItemRepositoryDto } from '@repository/dto/delete.item.repository';
import { DeleteGameRepositoryDto } from '@repository/dto/delete.game.repository';
import { UserJoinReprositoryDto } from '@repository/dto/userJoin.game.respository';
import { CreateGameRepositoryDto } from '@repository/dto/create.game.repository.dto';
import { UpdateGameRepositoryDto } from '@repository/dto/update.game.repository.dto';
import { CreateItemRepositoryDto } from '@repository/dto/create.item.repository.dto';
import { UpdateItemRepositoryDto } from '@repository/dto/update.item.repository.dto';

export interface GameRepository {
  create(dto: CreateGameRepositoryDto): GameRecordRepository;
  get(dto: GetGameRepositoryDto): GameRecordRepository;
  getAll(): GameRecordRepository[];
  update(dto: UpdateGameRepositoryDto): GameRecordRepository;
  delete(dto: DeleteGameRepositoryDto): boolean;
  createItem(dto: CreateItemRepositoryDto): ItemRecordRepository;
  updateItem(dto: UpdateItemRepositoryDto): ItemRecordRepository;
  deleteItem(dto: DeleteItemRepositoryDto): ItemRecordRepository;
  userJoin(dto: UserJoinReprositoryDto): GameRecordRepository;
}