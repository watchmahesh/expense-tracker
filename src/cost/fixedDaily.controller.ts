import { Controller, Post, Body, Get, Query, Put, Param, Delete } from '@nestjs/common';
import { CostService } from './cost.service';
import { CostItemType } from './entity/cost-item.entity';
import { FixedDailyService } from './fixedDaily.service';
import { CreateFixedCostDailyDto, UpdateFixedCostDailyDto } from './dto/fixed-daily.dto';

@Controller('fixed-daily')
export class FixedDailyController {
    constructor(private readonly fixedDailyService: FixedDailyService) { }

    @Post()
    async createFixedCostDaily(
        @Body() createFixedCostDailyDto: CreateFixedCostDailyDto
    ) {
        return this.fixedDailyService.createFixedCostDaily(createFixedCostDailyDto);
    }

    @Get()
    async getAllItems(@Query('pageNumber') pageNumber: number = 1, @Query('limit') limit: number = 8) {
        return this.fixedDailyService.getAllData(pageNumber, limit);
    }


    @Put(':id')
    async updateItem(@Param('id') id: number, @Body() updateFixedDailyDto: UpdateFixedCostDailyDto) {
        return this.fixedDailyService.updateData(id, updateFixedDailyDto);
    }

    @Delete(':id')
    async deleteItem(@Param('id') id: number) {
        return this.fixedDailyService.deleteItem(id);
    }

    @Get(':id')
    async getItemById(@Param('id') id: number) {
        return this.fixedDailyService.getDailyFixedById(id);
    }


}
