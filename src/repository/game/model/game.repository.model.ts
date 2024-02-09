import { ItemRecordRepository } from "@src/repository/game/model/item.repository.model"

export class GameRecordRepository {
  id: string
  name: string
  voting: string[]
  members: string[]
  items: ItemRecordRepository[]
  author_id: string
  enable: boolean
}