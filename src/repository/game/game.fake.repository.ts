import mongoose from 'mongoose';

import { GameRepository } from '@repository/game/game.repository';
import { GameRecordRepository } from '@repository/game/model/game.repository.model';
import { ItemRecordRepository } from '@repository/game/model/item.repository.model';
import { GetGameRepositoryDto } from '@repository/game/dto/get.game.repository.dto';
import { VoteRecordRepository } from '@repository/game/model/vote.repository.model';
import { DeleteGameRepositoryDto } from '@repository/game/dto/delete.game.repository.dto';
import { DeleteItemRepositoryDto } from '@repository/game/dto/delete.item.repository.dto';
import { CreateGameRepositoryDto } from '@repository/game/dto/create.game.repository.dto';
import { UpdateGameRepositoryDto } from '@repository/game/dto/update.game.repository.dto';
import { CreateItemRepositoryDto } from '@repository/game/dto/create.item.repository.dto';
import { UpdateItemRepositoryDto } from '@repository/game/dto/update.item.repository.dto';
import { CreateVoteRepositoryDto } from '@repository/game/dto/create.vote.repository.dto';
import { DeleteVoteRepositoryDto } from '@repository/game/dto/delete.vote.repository.dto';
import { UserJoinReprositoryDto } from '@repository/game/dto/userJoin.game.respository.dto';

export class GameFakeRepository implements GameRepository {

  collection: GameRecordRepository[] = [{
    id: '65c5ed891cb55332f00c45f7',
    name: 'test',
    voting: [
      'XXS',    'XS',
      'S',      'M',
      'L',      'XL',
      'XXL',    '?',
      'coffee'
    ],
    members: [],
    items: [],
    author_id: '65c5ed55aeb274278b5821c1',
    enable: true
  }];

  create(dto: CreateGameRepositoryDto): GameRecordRepository {
    const game:GameRecordRepository = {
      id: new mongoose.Types.ObjectId().toString(),
      name: dto.name,
      voting: dto.voting,
      members: [],
      items: [],
      author_id: dto.user_id,
      enable: true
    };
    this.collection.push(game);
    return game;
  }

  get(dto: GetGameRepositoryDto): GameRecordRepository {
    const game:GameRecordRepository = this.collection.find(elt => (elt.id === dto.game_id && elt.enable === true));
    return game;
  }

  getAll(): GameRecordRepository[] {
    return this.collection;
  }

  update(dto: UpdateGameRepositoryDto): GameRecordRepository {
    const game:GameRecordRepository = this.collection.find(elt => (elt.id === dto.game_id && elt.enable === true));
    game.name = dto.name;
    return game;
  }

  delete(dto: DeleteGameRepositoryDto): boolean {
    const game:GameRecordRepository = this.collection.find(elt => (elt.id === dto.game_id && elt.enable === true));
    game.enable = false;
    return true;
  }

  createItem(dto: CreateItemRepositoryDto): ItemRecordRepository {
    const game:GameRecordRepository = this.get({ game_id: dto.game_id});
    const item:ItemRecordRepository = {
      id: new mongoose.Types.ObjectId().toString(),
      name: dto.name,
      author_id: dto.user_id,
      state: 'CREATE',
      votes: [],
      enable: true
    };
    game.items.push(item);
    return item;
  }

  updateItem(dto: UpdateItemRepositoryDto): ItemRecordRepository {
    const game:GameRecordRepository = this.get({ game_id: dto.game_id});
    const item:ItemRecordRepository = game.items.find(item => item.id === dto.item_id);
    if(dto.name)item.name = dto.name;
    if(dto.state)item.state = dto.state;
    return item;
  }

  deleteItem(dto: DeleteItemRepositoryDto): boolean {
    const game:GameRecordRepository = this.get({ game_id: dto.id});
    const item:ItemRecordRepository = game.items.find(item => item.id === dto.id);
    item.enable = false;
    return true;
  }

  userJoin(dto: UserJoinReprositoryDto): GameRecordRepository {
    const game:GameRecordRepository = this.get({ game_id: dto.game_id});
    if (!game.members.includes(dto.user_id)) {
      game.members.push(dto.user_id);
    }
    return game;
  }

  createVote(dto: CreateVoteRepositoryDto): VoteRecordRepository {
    const game:GameRecordRepository = this.get({ game_id: dto.game_id});
    const item:ItemRecordRepository = game.items.find(item => item.id === dto.item_id);
    const voteIndex = item.votes.findIndex(vote => (vote.author_id === dto.user_id && vote.enable));
    if(voteIndex !== -1) {
      throw new Error('ALREADY_VOTED');
    }
    const vote:VoteRecordRepository = {
      id: new mongoose.Types.ObjectId().toString(),
      game_id: dto.game_id,
      item_id: dto.item_id,
      author_id: dto.user_id,
      vote: dto.vote,
      enable: true
    };
    item.votes.push(vote);
    return vote;
  }

  deleteVote(dto: DeleteVoteRepositoryDto): boolean {
    const game:GameRecordRepository = this.get({ game_id: dto.game_id});
    const item:ItemRecordRepository = game.items.find(item => (item.id === dto.item_id && item.enable));
    const voteIndex = item.votes.findIndex(vote => dto.vote_id === vote.id);
    item.votes.splice(voteIndex, 1);
    return true;
  }
}