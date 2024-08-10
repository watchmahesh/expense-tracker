import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CostItems } from './cost-item.entity';

@Entity("fixed_costs_daily")
export class FixedCostsDaily {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CostItems, (costItem) => costItem.fixedCostsDaily, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cost_item_id' })
    costItem: CostItems;

    @Column()
    month: Date;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    amount: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    percentage_of_d: number;
}
