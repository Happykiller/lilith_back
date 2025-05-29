// src\usecase\item\dto\update.item.usecase.dto.ts
export interface UpdateItemUsecaseDto {
  game_id: string
  item_id: string
  name?: string
  url?: string
  description?: string
  state?: string
}