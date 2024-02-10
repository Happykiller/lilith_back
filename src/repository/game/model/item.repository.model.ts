import { VoteRepositoryModel } from "@src/repository/game/model/vote.repository.model"

export class ItemRepositoryModel {
  id: string
  author_id: string
  name: string
  state: string
  votes: VoteRepositoryModel[]
  enable: boolean
}