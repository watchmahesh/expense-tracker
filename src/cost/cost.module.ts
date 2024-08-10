import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostService } from './cost.service';
import { CostController } from './cost.controller';
import { CostItems } from './entity/cost-item.entity';
import { FixedCostsDaily } from './entity/fixed-costs-daily.entity';
import { VariableCostsMonthly } from './entity/variable-costs-monthly.entity';
import { FixedCostYearly } from './entity/fixed-cost-yearly.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CostItems, FixedCostsDaily, VariableCostsMonthly, FixedCostYearly])],
    providers: [CostService],
    controllers: [CostController],
})
export class CostModule {}
