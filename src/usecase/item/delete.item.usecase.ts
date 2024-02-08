import { Inversify } from '@src/inversify/investify';
import { DeleteItemUsecaseDto } from '@usecase/item/dto/delete.item.usecase.dto';

export class CreateItemUsecase {

  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: DeleteItemUsecaseDto): Promise<boolean> {
    return await this.inversify.gameRepository.deleteItem(dto);
  }
}