import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CostItems, CostItemType } from './entity/cost-item.entity';
import { FixedCostsDaily } from './entity/fixed-costs-daily.entity';
import { VariableCostsMonthly } from './entity/variable-costs-monthly.entity';
import { FixedCostYearly } from './entity/fixed-cost-yearly.entity';
import { CreateCostItemDto, UpdateCostItemDto } from './dto/expense-item.dto';


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



    async getCostItem() {
        try {


            return this.costItemsRepository.find();
        } catch (e) {
            console.log(e)
        };


    }

    async createCostItem(createCostItemDto: CreateCostItemDto): Promise<any> {
        const costItem = this.costItemsRepository.create(createCostItemDto);
        return this.costItemsRepository.save(costItem);
    }



    async getAllItems(pageNumber: number, limit: number): Promise<any> {
        const offset = (pageNumber - 1) * limit;

        const [items, total] = await this.costItemsRepository.findAndCount({
            order: {
                id: 'DESC', // Replace 'id' with the appropriate field you want to sort by
            },
            skip: offset,
            take: limit,
        });

        return {
            items,
            total,
            pageNumber,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async getItemById(id: number): Promise<any> {
        const costItem = await this.costItemsRepository.findOneBy({ id });
        if (!costItem) {
            throw new NotFoundException(`Cost item with ID ${id} not found`);
        }
        return costItem;
    }

    async updateItem(id: number, updateCostItemDto: UpdateCostItemDto): Promise<any> {
        const costItem = await this.getItemById(id);
        Object.assign(costItem, updateCostItemDto);
        return this.costItemsRepository.save(costItem);
    }

    async deleteItem(id: number): Promise<void> {
        const costItem = await this.getItemById(id);
        await this.costItemsRepository.remove(costItem);
    }

    // async createFixedCostDaily(costItemId: number, month: Date, amount: number) {
    //     console.log(month)
    //     const fixedCostDaily = this.fixedCostsDailyRepository.create({ costItem: { id: costItemId }, month, amount });
    //     return this.fixedCostsDailyRepository.save(fixedCostDaily);
    // }

    async createVariableCostMonthly(costItemId: number, month: Date, amount: number) {
        const variableCostMonthly = this.variableCostsMonthlyRepository.create({ costItem: { id: costItemId }, month, amount });
        return this.variableCostsMonthlyRepository.save(variableCostMonthly);
    }

    async createFixedCostYearly(costItemId: number, month: Date, amount: number) {
        const fixedCostYearly = this.fixedCostYearlyRepository.create({ costItem: { id: costItemId }, month, amount });
        return this.fixedCostYearlyRepository.save(fixedCostYearly);
    }

    async getItemsByType(type: string): Promise<any> {
        let costItemType: CostItemType;
        try {
            costItemType = CostItemType[type as keyof typeof CostItemType];
        } catch (error) {
            throw new Error('Invalid type value');
        }

        // Find items by the type enum
        const [items] = await this.costItemsRepository.findAndCount({
            where: { type: costItemType },
        });

        return items ;
    }

}
