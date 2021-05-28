import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CustomerMigration1622161233937 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customer',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'text',
          },
          {
            name: 'login',
            type: 'text',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'text',
          },
          {
            name: 'cpf',
            type: 'varchar(11)',
          },
          {
            name: 'birth',
            type: 'date',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customer', true);
  }
}
