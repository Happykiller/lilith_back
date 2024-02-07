import { ItemRecordRepository } from "@repository/model/item.repository"

export class GameRecordRepository {
  id: string
  name: string
  voting: string[]
  members: string[]
  items: ItemRecordRepository[]
  enable: boolean
}