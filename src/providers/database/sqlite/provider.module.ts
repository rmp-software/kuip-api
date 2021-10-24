import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export const options: SqliteConnectionOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: true,
  entities: ['src/resources/**/*.entity.ts'],
  logger: 'debug',
};

@Module({
  imports: [TypeOrmModule.forRoot(options)],
})
export class SqliteDatabaseProviderModule {}
