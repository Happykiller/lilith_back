import mongoose from 'mongoose';

export class SessionRecordRepository {
  id: string;
  name: string;
  voting: string[];
  members: string[];
  items: {
    id: string,
    author: string;
    name: string;
    state: string;
    votes: {
      id: string,
      member: string;
      vote: string;
    }[]
  }[];
}

export class SessionRepository {

  collection: SessionRecordRepository[] = [];

  get(dto: {id}): SessionRecordRepository {
    const session = this.collection.find(elt => elt.id === dto.id);
    return session;
  }

  getAll(): SessionRecordRepository[] {
    return this.collection;
  }

  create(dto: any): SessionRecordRepository {
    const session  = {
      id: new mongoose.Types.ObjectId().toString(),
      name: dto.name,
      voting: dto.voting,
      members: [],
      items: []
    };
    this.collection.push(session);
    return session;
  }
}