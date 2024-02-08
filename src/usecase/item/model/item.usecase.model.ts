import { VoteUsecaseModel } from "@usecase/vote/model/vote.usecase.model"

export class ItemUsecaseModel {
  id: string
  author: string
  name: string
  state: string
  votes: VoteUsecaseModel[]
  enable: boolean
}