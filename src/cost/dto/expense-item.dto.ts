import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { CostItemType } from '../entity/cost-item.entity';

export class CreateCostItemDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEnum(CostItemType)
    type: CostItemType;
}

export class UpdateCostItemDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEnum(CostItemType)
    type: CostItemType;
}

export class GetCostItemDto {
    id: string;
}
