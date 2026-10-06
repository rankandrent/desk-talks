import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`podcasts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`summary\` text,
  	\`excerpt\` text,
  	\`host_id\` integer,
  	\`thumbnail_id\` integer,
  	\`hero_image_id\` integer,
  	\`links_youtube\` text,
  	\`links_spotify\` text,
  	\`links_soundcloud\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`slug\` text,
  	\`category_id\` integer,
  	\`release_date\` text,
  	\`duration\` text,
  	\`featured\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`host_id\`) REFERENCES \`people\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`podcasts_host_idx\` ON \`podcasts\` (\`host_id\`);`)
  await db.run(sql`CREATE INDEX \`podcasts_thumbnail_idx\` ON \`podcasts\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`podcasts_hero_image_idx\` ON \`podcasts\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`podcasts_meta_meta_image_idx\` ON \`podcasts\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`podcasts_slug_idx\` ON \`podcasts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`podcasts_category_idx\` ON \`podcasts\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`podcasts_updated_at_idx\` ON \`podcasts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`podcasts_created_at_idx\` ON \`podcasts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`podcasts__status_idx\` ON \`podcasts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`podcasts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`people_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`podcasts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`people_id\`) REFERENCES \`people\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`podcasts_rels_order_idx\` ON \`podcasts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`podcasts_rels_parent_idx\` ON \`podcasts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`podcasts_rels_path_idx\` ON \`podcasts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`podcasts_rels_people_id_idx\` ON \`podcasts_rels\` (\`people_id\`);`)
  await db.run(sql`CREATE TABLE \`_podcasts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_summary\` text,
  	\`version_excerpt\` text,
  	\`version_host_id\` integer,
  	\`version_thumbnail_id\` integer,
  	\`version_hero_image_id\` integer,
  	\`version_links_youtube\` text,
  	\`version_links_spotify\` text,
  	\`version_links_soundcloud\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_slug\` text,
  	\`version_category_id\` integer,
  	\`version_release_date\` text,
  	\`version_duration\` text,
  	\`version_featured\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`podcasts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_host_id\`) REFERENCES \`people\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_podcasts_v_parent_idx\` ON \`_podcasts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_podcasts_v_version_version_host_idx\` ON \`_podcasts_v\` (\`version_host_id\`);`)
  await db.run(sql`CREATE INDEX \`_podcasts_v_version_version_thumbnail_idx\` ON \`_podcasts_v\` (\`version_thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`_podcasts_v_version_version_hero_image_idx\` ON \`_podcasts_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_podcasts_v_version_meta_version_meta_image_idx\` ON \`_podcasts_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_podcasts_v_version_version_slug_idx\` ON \`_podcasts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_podcasts_v_version_version_category_idx\` ON \`_podcasts_v\` (\`version_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_podcasts_v_version_version_updated_at_idx\` ON \`_podcasts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_podcasts_v_version_version_created_at_idx\` ON \`_podcasts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_podcasts_v_version_version__status_idx\` ON \`_podcasts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_podcasts_v_created_at_idx\` ON \`_podcasts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_podcasts_v_updated_at_idx\` ON \`_podcasts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_podcasts_v_latest_idx\` ON \`_podcasts_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_podcasts_v_autosave_idx\` ON \`_podcasts_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_podcasts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`people_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_podcasts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`people_id\`) REFERENCES \`people\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_podcasts_v_rels_order_idx\` ON \`_podcasts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_podcasts_v_rels_parent_idx\` ON \`_podcasts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_podcasts_v_rels_path_idx\` ON \`_podcasts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_podcasts_v_rels_people_id_idx\` ON \`_podcasts_v_rels\` (\`people_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_faqs_order_idx\` ON \`posts_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_faqs_parent_id_idx\` ON \`posts_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`excerpt\` text,
  	\`featured_image_id\` integer,
  	\`content\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`slug\` text,
  	\`category_id\` integer,
  	\`author_id\` integer,
  	\`published_at\` text,
  	\`content_updated_at\` text,
  	\`published_hash\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`people\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_featured_image_idx\` ON \`posts\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_meta_meta_image_idx\` ON \`posts\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_category_idx\` ON \`posts\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_author_idx\` ON \`posts\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_version_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_version_faqs_order_idx\` ON \`_posts_v_version_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_faqs_parent_id_idx\` ON \`_posts_v_version_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_excerpt\` text,
  	\`version_featured_image_id\` integer,
  	\`version_content\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_slug\` text,
  	\`version_category_id\` integer,
  	\`version_author_id\` integer,
  	\`version_published_at\` text,
  	\`version_content_updated_at\` text,
  	\`version_published_hash\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_author_id\`) REFERENCES \`people\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_featured_image_idx\` ON \`_posts_v\` (\`version_featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_meta_version_meta_image_idx\` ON \`_posts_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_category_idx\` ON \`_posts_v\` (\`version_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_author_idx\` ON \`_posts_v\` (\`version_author_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_autosave_idx\` ON \`_posts_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`people\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`designation\` text,
  	\`company\` text,
  	\`linkedin\` text,
  	\`photo_id\` integer,
  	\`company_logo_id\` integer,
  	\`testimonial\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`company_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`people_photo_idx\` ON \`people\` (\`photo_id\`);`)
  await db.run(sql`CREATE INDEX \`people_company_logo_idx\` ON \`people\` (\`company_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`people_updated_at_idx\` ON \`people\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`people_created_at_idx\` ON \`people\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`_objectkey\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`content\` text NOT NULL,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'contact' NOT NULL,
  	\`full_name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`phone\` text,
  	\`company\` text NOT NULL,
  	\`linkedin\` text NOT NULL,
  	\`enquiry\` text,
  	\`status\` text DEFAULT 'new',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`submissions_updated_at_idx\` ON \`submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`submissions_created_at_idx\` ON \`submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`subscribers\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`email\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`subscribers_email_idx\` ON \`subscribers\` (\`email\`);`)
  await db.run(sql`CREATE INDEX \`subscribers_updated_at_idx\` ON \`subscribers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`subscribers_created_at_idx\` ON \`subscribers\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text DEFAULT 'editor' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`podcasts_id\` integer,
  	\`posts_id\` integer,
  	\`categories_id\` integer,
  	\`people_id\` integer,
  	\`media_id\` integer,
  	\`pages_id\` integer,
  	\`submissions_id\` integer,
  	\`subscribers_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`podcasts_id\`) REFERENCES \`podcasts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`people_id\`) REFERENCES \`people\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`submissions_id\`) REFERENCES \`submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`subscribers_id\`) REFERENCES \`subscribers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_podcasts_id_idx\` ON \`payload_locked_documents_rels\` (\`podcasts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_people_id_idx\` ON \`payload_locked_documents_rels\` (\`people_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_subscribers_id_idx\` ON \`payload_locked_documents_rels\` (\`subscribers_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_partner_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`logo_id\` integer NOT NULL,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_partner_logos_order_idx\` ON \`site_settings_partner_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_partner_logos_parent_id_idx\` ON \`site_settings_partner_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_partner_logos_logo_idx\` ON \`site_settings_partner_logos\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`social_youtube\` text,
  	\`social_linkedin\` text,
  	\`social_instagram\` text,
  	\`social_soundcloud\` text,
  	\`social_spotify\` text,
  	\`blog_cta_heading\` text DEFAULT 'Looking for the Right Experts for Your Project?',
  	\`blog_cta_text\` text DEFAULT 'Access a global network of industry specialists and tailored primary research services to uncover the insights needed to move your project forward.',
  	\`blog_cta_button_label\` text DEFAULT 'Launch a project',
  	\`blog_cta_button_url\` text DEFAULT '/contact',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`podcasts\`;`)
  await db.run(sql`DROP TABLE \`podcasts_rels\`;`)
  await db.run(sql`DROP TABLE \`_podcasts_v\`;`)
  await db.run(sql`DROP TABLE \`_podcasts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`posts_faqs\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_version_faqs\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`people\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`submissions\`;`)
  await db.run(sql`DROP TABLE \`subscribers\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`site_settings_partner_logos\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
}
