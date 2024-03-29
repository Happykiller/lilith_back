import { ItemUsecaseModel } from "@src/usecase/item/model/item.usecase.model"

export class GameUsecaseModel {
  id: string
  name: string
  author_id: string
  voting: string[]
  members: string[]
  items: ItemUsecaseModel[]
  enable: boolean
}