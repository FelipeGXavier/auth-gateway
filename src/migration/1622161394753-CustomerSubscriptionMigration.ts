import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CustomerSubscriptionMigration1622161394753 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customer_subscription',
        columns: [
          {
            name: 'customer_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'sub_id',
            type: 'int',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_ctsub_sub_id',
            columnNames: ['sub_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'subscription',
          },
          {
            name: 'fk_ctsub_customer_id',
            columnNames: ['customer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customer',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customer_subscription');
  }
}
