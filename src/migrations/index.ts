import * as migration_20261006_171137_initial from './20261006_171137_initial';
import * as migration_20261006_173751_error_logs_and_first_admin from './20261006_173751_error_logs_and_first_admin';

export const migrations = [
  {
    up: migration_20261006_171137_initial.up,
    down: migration_20261006_171137_initial.down,
    name: '20261006_171137_initial',
  },
  {
    up: migration_20261006_173751_error_logs_and_first_admin.up,
    down: migration_20261006_173751_error_logs_and_first_admin.down,
    name: '20261006_173751_error_logs_and_first_admin'
  },
];
