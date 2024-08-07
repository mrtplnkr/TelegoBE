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
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { AtGuard } from 'src/common/guards/at,guard';
import { Public } from '../common/decorators/public.decorator';

@Controller('items')
@UseGuards(AtGuard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    await this.itemsService.create(createItemDto);
    return HttpStatus.OK;
  }

  @Public()
  @Get('seed')
  async seedData(): Promise<string> {
    await this.itemsService.seedData();
    return 'Database seeded successfully!';
  }

  @Get(':id')
  async findAll(@Param('id') id: string) {
    return await this.itemsService.findPerUser(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.itemsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return await this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.itemsService.remove(+id);
  }
}
