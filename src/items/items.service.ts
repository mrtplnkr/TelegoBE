import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async seedData(): Promise<void> {
    const postData: Partial<Item>[] = [
      {
        text: 'one item',
        done: false,
        id: 11,
        users: [
          {
            id: 2,
            email: 'test@gmail.com',
            password: '123password',
            items: [],
          },
        ],
      },
      {
        text: 'another item',
        done: false,
        id: 12,
        users: [
          {
            id: 3,
            email: 'stage@gmail.com',
            password: 'password321',
            items: [],
          },
        ],
      },
    ];

    try {
      postData.forEach((i: Item) => {
        this.itemsRepository.save(i);
      });
    } catch (error) {
      console.log('err', error);
    }
  }

  async create(createItemDto: CreateItemDto) {
    //TODO
    const item = new Item({
      ...createItemDto,
    });
    await this.entityManager.save(item);
  }

  async findAll() {
    return this.itemsRepository.find({
      relations: {
        users: true,
      },
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
