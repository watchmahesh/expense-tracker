import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CostItems, CostItemType } from './entity/cost-item.entity';
import { FixedCostsDaily } from './entity/fixed-costs-daily.entity';
import { VariableCostsMonthly } from './entity/variable-costs-monthly.entity';
import { FixedCostYearly } from './entity/fixed-cost-yearly.entity';


@Injectable()
export class CostService {
    constructor(
        @InjectRepository(CostItems)
        private readonly costItemsRepository: Repository<CostItems>,

        @InjectRepository(FixedCostsDaily)
        private readonly fixedCostsDailyRepository: Repository<FixedCostsDaily>,

        @InjectRepository(VariableCostsMonthly)
        private readonly variableCostsMonthlyRepository: Repository<VariableCostsMonthly>,

        @InjectRepository(FixedCostYearly)
        private readonly fixedCostYearlyRepository: Repository<FixedCostYearly>,
    ) { }

    async createCostItem(name: string, type: CostItemType) {
        try {


            const costItem = this.costItemsRepository.create({ name, type });
            return this.costItemsRepository.save(costItem);
        } catch (e) {
            console.log(e)
        };


    }

    async createFixedCostDaily(costItemId: number, month: Date, amount: number) {
        console.log(month)
        const fixedCostDaily = this.fixedCostsDailyRepository.create({ costItem: { id: costItemId }, month, amount });
        return this.fixedCostsDailyRepository.save(fixedCostDaily);
    }

    async createVariableCostMonthly(costItemId: number, month: Date, amount: number) {
        const variableCostMonthly = this.variableCostsMonthlyRepository.create({ costItem: { id: costItemId }, month, amount });
        return this.variableCostsMonthlyRepository.save(variableCostMonthly);
    }

    async createFixedCostYearly(costItemId: number, month: Date, amount: number) {
        const fixedCostYearly = this.fixedCostYearlyRepository.create({ costItem: { id: costItemId }, month, amount });
        return this.fixedCostYearlyRepository.save(fixedCostYearly);
    }

}
