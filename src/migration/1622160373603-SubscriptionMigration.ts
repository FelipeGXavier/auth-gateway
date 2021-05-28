import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class SubscriptionMigration1622160373603 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'subscription',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'prefix',
            type: 'varchar(100)',
          },
          {
            name: 'price',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('subscription', true);
  }
}
