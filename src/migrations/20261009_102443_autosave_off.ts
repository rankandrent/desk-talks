import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`_podcasts_v_autosave_idx\`;`)
  await db.run(sql`ALTER TABLE \`_podcasts_v\` DROP COLUMN \`autosave\`;`)
  await db.run(sql`DROP INDEX \`_posts_v_autosave_idx\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`autosave\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`_podcasts_v\` ADD \`autosave\` integer;`)
  await db.run(sql`CREATE INDEX \`_podcasts_v_autosave_idx\` ON \`_podcasts_v\` (\`autosave\`);`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`autosave\` integer;`)
  await db.run(sql`CREATE INDEX \`_posts_v_autosave_idx\` ON \`_posts_v\` (\`autosave\`);`)
}
