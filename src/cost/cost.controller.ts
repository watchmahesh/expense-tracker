import { Controller, Post, Body, Get } from '@nestjs/common';
import { CostService } from './cost.service';
import { CostItemType } from './entity/cost-item.entity';

@Controller('cost')
export class CostController {
    constructor(private readonly costService: CostService) { }



    @Get('cost-item')
    async Getitem(

    ) {
        return this.costService.getCostItem();
    }



    // @Post('fixed-cost-daily')
    // async createFixedCostDaily(
    //     @Body('cost_item_id') cost_item_id: number,
    //     @Body('month') month: Date,
    //     @Body('amount') amount: number,
    // ) {
    //     return this.costService.createFixedCostDaily(cost_item_id, month, amount);
    // }

    // @Post('create-variable-cost-monthly')
    // async createVariableCostMonthly(
    //     @Body('costItemId') costItemId: number,
    //     @Body('month') month: Date,
    //     @Body('amount') amount: number,
    // ) {
    //     return this.costService.createVariableCostMonthly(costItemId, month, amount);
    // }

    // @Post('create-fixed-cost-yearly')
    // async createFixedCostYearly(
    //     @Body('costItemId') costItemId: number,
    //     @Body('month') month: Date,
    //     @Body('amount') amount: number,
    // ) {
    //     return this.costService.createFixedCostYearly(costItemId, month, amount);
    // }
}
