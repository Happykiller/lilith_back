import { VoteRecordRepository } from "@src/repository/game/model/vote.repository.model"

export class ItemRecordRepository {
  id: string
  author_id: string
  name: string
  state: string
  votes: VoteRecordRepository[]
  enable: boolean
}