import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CostItems } from './cost-item.entity';

@Entity("fixed_costs_daily")
export class FixedCostsDaily {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CostItems, (costItem) => costItem.fixedCostsDaily, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cost_item_id' })
    costItems: CostItems;

    @Column()
    date: Date;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    amount: number;

    @Column({ type: 'text' })
    description: string;


}
