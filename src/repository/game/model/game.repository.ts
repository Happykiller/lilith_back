import { ItemRecordRepository } from "@src/repository/game/model/item.repository"

export class GameRecordRepository {
  id: string
  name: string
  voting: string[]
  members: string[]
  items: ItemRecordRepository[]
  enable: boolean
}