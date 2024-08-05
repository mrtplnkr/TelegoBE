/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    this.itemsService.create(createItemDto);
    return HttpStatus.OK;
  }

  @Get('seed')
  async seedData(): Promise<string> {
    await this.itemsService.seedData();
    return 'Database seeded successfully!';
  }

  @Get(':id')
  async findAll(@Param('id') id: string) {
    return this.itemsService.findPerUser(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
