import { VoteUsecaseModel } from "@usecase/vote/model/vote.usecase.model"

export class ItemUsecaseModel {
  id: string
  author_id: string
  name: string
  url: string
  description: string
  state: string
  votes: VoteUsecaseModel[]
  enable: boolean
}