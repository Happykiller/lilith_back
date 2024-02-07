import { VoteRecordRepository } from "@repository/model/vote.repository"

export class ItemRecordRepository {
  id: string
  author: string
  name: string
  state: string
  votes: VoteRecordRepository[]
  enable: boolean
}