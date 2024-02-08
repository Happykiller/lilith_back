import { VoteRecordRepository } from "@src/repository/game/model/vote.repository.model"

export class ItemRecordRepository {
  id: string
  author: string
  name: string
  state: string
  votes: VoteRecordRepository[]
  enable: boolean
}