import config from './ormconfig';

const ormseedconfig = {
  ...config,
  migrations: [__dirname + '/seeds/**/*{.ts, .js}'],
  cls: {
    migrationsDir: 'src/seeds',
  },
};

export default ormseedconfig;
