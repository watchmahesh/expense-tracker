import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateVariableCostsMontlyTable1723276633341 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'variable_costs_monthly',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'cost_item_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'month',
                    type: 'date',
                    isNullable: false,
                },
                {
                    name: 'amount',
                    type: 'decimal',
                    precision: 15,
                    scale: 2,
                    isNullable: false,
                },
                {
                    name: 'percentage_of_d',
                    type: 'decimal',
                    precision: 5,
                    scale: 2,
                    isNullable: true,
                }
            ]
        }));

        await queryRunner.createForeignKey('variable_costs_monthly', new TableForeignKey({
            columnNames: ['cost_item_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cost_items',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('variable_costs_monthly');
    }

}
