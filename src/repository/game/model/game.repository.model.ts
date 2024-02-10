import { ItemRepositoryModel } from "@src/repository/game/model/item.repository.model"

export class GameRepositoryModel {
  id: string
  name: string
  voting: string[]
  members: string[]
  items: ItemRepositoryModel[]
  author_id: string
  enable: boolean
}