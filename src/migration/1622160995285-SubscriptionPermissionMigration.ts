import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class SubscriptionPermissionMigration1622160995285 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'subscription_permission',
        columns: [
          {
            name: 'sub_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'permission_id',
            type: 'int',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_subp_sub_id',
            columnNames: ['sub_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'subscription',
          },
          {
            name: 'fk_subp_permission_id',
            columnNames: ['permission_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'permission',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('subscription_permission');
  }
}
