import mongoose from 'mongoose';

import { GameRepository } from '@repository/game/game.repository';
import { GameRecordRepository } from '@src/repository/game/model/game.repository';
import { ItemRecordRepository } from '@src/repository/game/model/item.repository';
import { GetGameRepositoryDto } from '@src/repository/game/dto/get.game.repository.dto';
import { DeleteGameRepositoryDto } from '@src/repository/game/dto/delete.game.repository.dto';
import { DeleteItemRepositoryDto } from '@src/repository/game/dto/delete.item.repository.dto';
import { UserJoinReprositoryDto } from '@src/repository/game/dto/userJoin.game.respository.dto';
import { CreateGameRepositoryDto } from '@src/repository/game/dto/create.game.repository.dto';
import { UpdateGameRepositoryDto } from '@src/repository/game/dto/update.game.repository.dto';
import { CreateItemRepositoryDto } from '@src/repository/game/dto/create.item.repository.dto';
import { UpdateItemRepositoryDto } from '@src/repository/game/dto/update.item.repository.dto';
import { VoteRecordRepository } from './model/vote.repository';
import { CreateVoteRepositoryDto } from './dto/create.vote.repository.dto';
import { DeleteVoteRepositoryDto } from './dto/delete.vote.repository.dto';

export class GameFakeRepository implements GameRepository {

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

  createItem(dto: CreateItemRepositoryDto): ItemRecordRepository {
    const game = this.get({ id: dto.game_id});
    const item = {
      id: new mongoose.Types.ObjectId().toString(),
      name: dto.name,
      author: dto.user_code,
      state: 'CREATE',
      votes: [],
      enable: true
    };
    game.items.push(item);
    return item;
  }

  updateItem(dto: UpdateItemRepositoryDto): ItemRecordRepository {
    const game = this.get({ id: dto.id});
    const item = game.items.find(item => item.id === dto.id);
    if(dto.name)item.name = dto.name;
    if(dto.state)item.state = dto.state;
    return item;
  }

  deleteItem(dto: DeleteItemRepositoryDto): ItemRecordRepository {
    throw new Error('Method not implemented.');
  }

  userJoin(dto: UserJoinReprositoryDto): GameRecordRepository {
    const game = this.get({ id: dto.game_id});
    if (!game.members.includes(dto.user_code)) {
      game.members.push(dto.user_code);
    }
    return game;
  }

  createVote(dto: CreateVoteRepositoryDto): VoteRecordRepository {
    const game = this.get({ id: dto.game_id});
    const item = game.items.find(item => item.id === dto.item_id);
    const voteIndex = item.votes.findIndex(vote => (vote.user_code === dto.user_code && vote.enable));
    if(voteIndex !== -1) {
      throw new Error('ALREADY_VOTED');
    }
    const vote:VoteRecordRepository = {
      id: new mongoose.Types.ObjectId().toString(),
      game_id: dto.game_id,
      item_id: dto.item_id,
      user_code: dto.user_code,
      vote: dto.vote,
      enable: true
    };
    item.votes.push(vote);
    return vote;
  }

  deleteVote(dto: DeleteVoteRepositoryDto): boolean {
    const game = this.get({ id: dto.game_id});
    const item = game.items.find(item => (item.id === dto.item_id && item.enable));
    const voteIndex = item.votes.findIndex(vote => dto.id === vote.id);
    item.votes.splice(voteIndex, 1);
    return true;
  }
}