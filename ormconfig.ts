import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mediumclone',
  password: '9642',
  database: 'mediumclone',
  entities: [__dirname + '/**/*.entity{.ts, .js}'],
  synchronize: true,
};
export default config;
