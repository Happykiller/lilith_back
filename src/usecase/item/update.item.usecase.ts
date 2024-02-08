import { Inversify } from '@src/inversify/investify';
import { ItemUsecaseModel } from '@usecase/item/model/item.usecase.model';
import { UpdateItemUsecaseDto } from '@usecase/item/dto/update.item.usecase.dto';

export class UpdateItemUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: UpdateItemUsecaseDto): Promise<ItemUsecaseModel> {
    return await this.inversify.gameRepository.updateItem(dto);
  }
}