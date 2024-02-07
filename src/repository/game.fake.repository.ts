import mongoose from 'mongoose';

import { GameRepository } from '@repository/game.repository';
import { GameRecordRepository } from '@repository/model/game.repository';
import { ItemRecordRepository } from '@repository/model/item.repository';
import { GetGameRepositoryDto } from '@repository/dto/get.game.repository';
import { DeleteGameRepositoryDto } from '@repository/dto/delete.game.repository';
import { DeleteItemRepositoryDto } from '@repository/dto/delete.item.repository';
import { UserJoinReprositoryDto } from '@repository/dto/userJoin.game.respository';
import { CreateGameRepositoryDto } from '@repository/dto/create.game.repository.dto';
import { UpdateGameRepositoryDto } from '@repository/dto/update.game.repository.dto';
import { CreateItemRepositoryDto } from '@repository/dto/create.item.repository.dto';
import { UpdateItemRepositoryDto } from '@repository/dto/update.item.repository.dto';

export class GameFakeRepository implements GameRepository {
  createItem(dto: CreateItemRepositoryDto): ItemRecordRepository {
    throw new Error('Method not implemented.');
  }
  updateItem(dto: UpdateItemRepositoryDto): ItemRecordRepository {
    throw new Error('Method not implemented.');
  }
  deleteItem(dto: DeleteItemRepositoryDto): ItemRecordRepository {
    throw new Error('Method not implemented.');
  }
  userJoin(dto: UserJoinReprositoryDto): GameRecordRepository {
    throw new Error('Method not implemented.');
  }

  collection: GameRecordRepository[] = [];

  create(dto: CreateGameRepositoryDto): GameRecordRepository {
    const game = {
      id: new mongoose.Types.ObjectId().toString(),
      name: dto.name,
      voting: dto.voting,
      members: [],
      items: [],
      enable: true
    };
    this.collection.push(game);
    return game;
  }

  get(dto: GetGameRepositoryDto): GameRecordRepository {
    const game = this.collection.find(elt => (elt.id === dto.id && elt.enable === true));
    return game;
  }

  getAll(): GameRecordRepository[] {
    return this.collection;
  }

  update(dto: UpdateGameRepositoryDto): GameRecordRepository {
    const game = this.collection.find(elt => (elt.id === dto.id && elt.enable === true));
    game.name = dto.name;
    return game;
  }

  delete(dto: DeleteGameRepositoryDto): boolean {
    const game = this.collection.find(elt => (elt.id === dto.id && elt.enable === true));
    game.enable = false;
    return true;
  }
}