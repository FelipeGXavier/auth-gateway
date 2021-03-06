import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class PermissionMigration1622160880730 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'permission',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'target',
            type: 'varchar(100)',
          },
          {
            name: 'action',
            type: 'varchar(50)',
          },
          {
            name: 'flag',
            type: 'boolean',
            default: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('permission', true);
  }
}
