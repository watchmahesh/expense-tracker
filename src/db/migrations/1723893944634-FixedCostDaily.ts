import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class FixedCostDaily1723893944634 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'fixed_costs_daily',
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
                    name: 'date',
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
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },

            ]
        }));

        await queryRunner.createForeignKey('fixed_costs_daily', new TableForeignKey({
            columnNames: ['cost_item_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cost_items',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('fixed_costs_daily');
    }

}
