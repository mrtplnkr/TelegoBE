/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { initialData } from './initialData';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async seedData(): Promise<void> {
    const postData: Partial<Item>[] = initialData;

    try {
      postData.forEach(async (i: Item) => {
        const item = {...i};
        const user = {...i.user};
        item.user = user;
        await this.itemsRepository.save(item);
      });
    } catch (error) {
      console.log('err', error);
    }
  }

  async create(createItemDto: CreateItemDto) {
    const item = new Item({
      ...createItemDto,
    });
    await this.entityManager.save(item);
  }

  async findPerUser(userId: number) {
    return this.itemsRepository.find({
      where: { userId: userId },
    });
  }

  async findOne(id: number) {
    return this.itemsRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    await this.entityManager.transaction(async (entityManager) => {
      const item = await this.itemsRepository.findOneBy({ id });
      item.done = updateItemDto.done;
      await entityManager.save(item);
    });
  }

  async remove(id: number) {
    await this.itemsRepository.delete(id);
  }
}
