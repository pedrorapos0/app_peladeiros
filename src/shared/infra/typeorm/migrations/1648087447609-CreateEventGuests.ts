import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEventGuests1648087447609
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event_guests',
        columns: [
          {
            name: 'event_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'guest_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_EVENTGUESTEVENT',
            referencedColumnNames: ['id'],
            columnNames: ['event_id'],
            referencedTableName: 'user_event',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_EVENTGUESTUSER',
            referencedColumnNames: ['id'],
            columnNames: ['guest_id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('event_guests');
  }
}
