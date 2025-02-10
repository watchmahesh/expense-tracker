import { Controller, Post, Body, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { CostService } from './cost.service';
import { CostItemType } from './entity/cost-item.entity';
import { CreateCostItemDto, UpdateCostItemDto } from './dto/expense-item.dto';

@Controller('expense-item')
export class CostItemController {
    constructor(private readonly costService: CostService) { }

    @Post()
    async createCostItem(@Body() createCostItemDto: CreateCostItemDto) {
        return this.costService.createCostItem(createCostItemDto);
    }

    @Get()
    async getAllItems(@Query('pageNumber') pageNumber: number = 1, @Query('limit') limit: number = 8) {
        return this.costService.getAllItems(pageNumber, limit);
    }


    @Put(':id')
    async updateItem(@Param('id') id: number, @Body() updateCostItemDto: UpdateCostItemDto) {
        return this.costService.updateItem(id, updateCostItemDto);
    }

    @Delete(':id')
    async deleteItem(@Param('id') id: number) {
        return this.costService.deleteItem(id);
    }

    @Get(':id')
    async getItemById(@Param('id') id: number) {
        console.log('Fetching item by ID:', id); // Log the ID
        return this.costService.getItemById(id);
    }


    @Get('/type')
    async getItemsByType(@Query('type') type: string ) {
        console.log('Fetching items by type:', type); // Log the type
        return this.costService.getItemsByType(type);
    }

}
