import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CostItems, CostItemType } from './entity/cost-item.entity';
import { FixedCostsDaily } from './entity/fixed-costs-daily.entity';
import { VariableCostsMonthly } from './entity/variable-costs-monthly.entity';
import { FixedCostYearly } from './entity/fixed-cost-yearly.entity';
import { CreateCostItemDto, UpdateCostItemDto } from './dto/expense-item.dto';
import { CreateFixedCostDailyDto, UpdateFixedCostDailyDto } from './dto/fixed-daily.dto';
import { error } from 'console';
import * as moment from 'moment';


@Injectable()
export class FixedDailyService {

    constructor(

        @InjectRepository(FixedCostsDaily)
        private readonly fixedCostsDailyRepository: Repository<FixedCostsDaily>,


    ) { }

    async getAllData(pageNumber: number, limit: number): Promise<any> {
        try {
            const offset = (pageNumber - 1) * limit;

            const [items, total] = await this.fixedCostsDailyRepository.findAndCount({
                relations: ['costItems'],
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
        } catch (err) {
        }
    }

    async getDailyFixedById(id: number): Promise<any> {
        const costItem = await this.fixedCostsDailyRepository.findOne({
            where: { id },
            relations: ['costItems'],
        });

        if (!costItem) {
            throw new NotFoundException(`Data item with ID ${id} not found`);
        }

        return costItem;
    }

  async updateData(id: number, updateFixedDto: UpdateFixedCostDailyDto): Promise<any> {
    try {

        // Fetch the existing FixedCostsDaily item
        const data = await this.getDailyFixedById(id);


        // Convert the date string to a Date object
        const parsedDate = moment(updateFixedDto.date, 'MMM D, YYYY').toDate();



        // Update the FixedCostsDaily item with the parsed date and related CostItems entity
        const updatedData = {
            ...data,
            ...updateFixedDto,
            date: parsedDate,
            costItems: { id:updateFixedDto.cost_item_id },


        };
console.log(updateFixedDto)
        // Save the updated entity
        return await this.fixedCostsDailyRepository.save(updatedData);
    } catch (error) {
        console.error('Error updating data:', error);
        throw error; // Ensure errors are properly propagated
    }
}


    async deleteItem(id: number): Promise<void> {
        const costItem = await this.getDailyFixedById(id);
        await this.fixedCostsDailyRepository.remove(costItem);
    }

    async createFixedCostDaily(createFixedCostDailyDto: CreateFixedCostDailyDto) {
        const { cost_item_id, date, amount, description } = createFixedCostDailyDto;
        const fixedCostDaily = this.fixedCostsDailyRepository.create({
            costItems: { id: cost_item_id },
            date: new Date(date),
            amount,
            description
        });

        return this.fixedCostsDailyRepository.save(fixedCostDaily);
    }







}
