import { Inversify } from '@src/inversify/investify';
import { ItemUsecaseModel } from '@usecase/item/model/item.usecase.model';
import { CreateItemUsecaseDto } from '@usecase/item/dto/create.item.usecase.dto';

export class CreateItemUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: CreateItemUsecaseDto): Promise<ItemUsecaseModel> {
    return await this.inversify.gameRepository.createItem(dto);
  }
}