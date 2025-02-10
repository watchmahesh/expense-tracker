import { Controller, Get, Query } from '@nestjs/common';
import { CostService } from './cost.service';

@Controller('expense-type')
export class CostItemTypeController {
    constructor(private readonly costService: CostService) { }

    @Get('/type')
    async getItemsByType(@Query('type') type: string) {
        return this.costService.getItemsByType(type);
    }
}
