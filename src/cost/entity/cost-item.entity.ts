import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FixedCostsDaily } from './fixed-costs-daily.entity';
import { VariableCostsMonthly } from './variable-costs-monthly.entity';
import { FixedCostYearly } from './fixed-cost-yearly.entity';


export enum CostItemType {
    FIXED_DAILY = 'fixed-daily',
    VARIABLE = 'variable',
    FIXED_YEARLY = 'fixed-yearly',
  }

@Entity('cost_items')
export class CostItems {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;


    @Column({ type: 'enum', enum: CostItemType })
    type: CostItemType;

    @OneToMany(() => FixedCostsDaily, (fixedCostsDaily) => fixedCostsDaily.costItem)
    fixedCostsDaily: FixedCostsDaily[];

    @OneToMany(() => VariableCostsMonthly, (variableCostsMonthly) => variableCostsMonthly.costItem)
    variableCostsMonthly: VariableCostsMonthly[];

    @OneToMany(() => FixedCostYearly, (fixedCostYearly) => fixedCostYearly.costItem)
    fixedCostYearly: FixedCostYearly[];
}
