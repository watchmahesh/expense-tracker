import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostService } from './cost.service';
import { CostController } from './cost.controller';
import { CostItems } from './entity/cost-item.entity';
import { FixedCostsDaily } from './entity/fixed-costs-daily.entity';
import { VariableCostsMonthly } from './entity/variable-costs-monthly.entity';
import { FixedCostYearly } from './entity/fixed-cost-yearly.entity';
import { CostItemController } from './costItem.controller';
import { CostItemTypeController } from './costitemtype.controller';
import { FixedDailyService } from './fixedDaily.service';
import { FixedDailyController } from './fixedDaily.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CostItems, FixedCostsDaily, VariableCostsMonthly, FixedCostYearly])],
    providers: [CostService,FixedDailyService],
    controllers: [CostController,CostItemController,CostItemTypeController,FixedDailyController],
})
export class CostModule {}
