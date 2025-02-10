import { IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateFixedCostDailyDto {
    @IsNumber()
    @IsNotEmpty()
    cost_item_id: number;

    @IsDateString()
    @IsNotEmpty()
    date: string; // Use string here because it's easier to handle date in ISO format

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsNumber()
    @IsNotEmpty()
    description: string;
}

export class UpdateFixedCostDailyDto {
    @IsNumber()
    @IsOptional()
    cost_item_id?: number;

    @IsDateString()
    @IsOptional()
    date?: string; // Use string to handle ISO date format

    @IsNumber()
    @IsOptional()
    amount?: number;
}
