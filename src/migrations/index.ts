import * as migration_20261006_171137_initial from './20261006_171137_initial';
import * as migration_20261006_173751_error_logs_and_first_admin from './20261006_173751_error_logs_and_first_admin';
import * as migration_20261008_195943_editable_pages from './20261008_195943_editable_pages';

export const migrations = [
  {
    up: migration_20261006_171137_initial.up,
    down: migration_20261006_171137_initial.down,
    name: '20261006_171137_initial',
  },
  {
    up: migration_20261006_173751_error_logs_and_first_admin.up,
    down: migration_20261006_173751_error_logs_and_first_admin.down,
    name: '20261006_173751_error_logs_and_first_admin',
  },
  {
    up: migration_20261008_195943_editable_pages.up,
    down: migration_20261008_195943_editable_pages.down,
    name: '20261008_195943_editable_pages'
  },
];
