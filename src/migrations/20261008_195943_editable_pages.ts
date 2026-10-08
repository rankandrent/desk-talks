import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`home_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text DEFAULT 'Where Expert Conversations Become Community',
  	\`hero_text\` text DEFAULT 'Discover expert insights through podcasts, connect with a global community, and join events that inspire meaningful conversations and lasting connections.',
  	\`hero_host_button_label\` text DEFAULT 'Join as Host',
  	\`hero_host_button_link\` text DEFAULT '/join-as-host',
  	\`hero_guest_button_label\` text DEFAULT 'Join as Guest',
  	\`hero_guest_button_link\` text DEFAULT '/join-as-guest',
  	\`podcasts_heading\` text DEFAULT 'Listen to the voices shaping the Future of Tech & leadership',
  	\`podcasts_button_label\` text DEFAULT 'View All Podcasts',
  	\`blogs_label\` text DEFAULT 'Our Blogs',
  	\`blogs_heading\` text DEFAULT 'Explore Blogs from experts',
  	\`contact_heading\` text DEFAULT 'How can we help you today?',
  	\`contact_text\` text DEFAULT 'Have a question, partnership idea, or just want to learn more? Send us a message and our team will get back to you.',
  	\`contact_join_prompt\` text DEFAULT 'Wants to join as Host/Guest in our podcast?',
  	\`contact_join_link_label\` text DEFAULT 'Click Here',
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_meta_meta_image_idx\` ON \`home_page\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_title\` text DEFAULT 'Where Expert Conversations Become Community',
  	\`version_hero_text\` text DEFAULT 'Discover expert insights through podcasts, connect with a global community, and join events that inspire meaningful conversations and lasting connections.',
  	\`version_hero_host_button_label\` text DEFAULT 'Join as Host',
  	\`version_hero_host_button_link\` text DEFAULT '/join-as-host',
  	\`version_hero_guest_button_label\` text DEFAULT 'Join as Guest',
  	\`version_hero_guest_button_link\` text DEFAULT '/join-as-guest',
  	\`version_podcasts_heading\` text DEFAULT 'Listen to the voices shaping the Future of Tech & leadership',
  	\`version_podcasts_button_label\` text DEFAULT 'View All Podcasts',
  	\`version_blogs_label\` text DEFAULT 'Our Blogs',
  	\`version_blogs_heading\` text DEFAULT 'Explore Blogs from experts',
  	\`version_contact_heading\` text DEFAULT 'How can we help you today?',
  	\`version_contact_text\` text DEFAULT 'Have a question, partnership idea, or just want to learn more? Send us a message and our team will get back to you.',
  	\`version_contact_join_prompt\` text DEFAULT 'Wants to join as Host/Guest in our podcast?',
  	\`version_contact_join_link_label\` text DEFAULT 'Click Here',
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_meta_version_meta_image_idx\` ON \`_home_page_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_created_at_idx\` ON \`_home_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_updated_at_idx\` ON \`_home_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`about_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text DEFAULT 'Where Tech Leaders Share How Technology Is Disrupting Business',
  	\`hero_image_id\` integer,
  	\`what_we_do_heading\` text DEFAULT 'What We Do',
  	\`what_we_do_text\` text DEFAULT 'We host technology leaders across startups and Fortune 500 companies as they share real-world experiences, bold ideas, and insights on how technology is transforming industries, reshaping businesses, and creating what’s next.',
  	\`what_we_do_image_id\` integer,
  	\`vision_heading\` text DEFAULT 'Our Vision',
  	\`vision_text\` text DEFAULT 'Every transformation starts with a vision.
  
  At DeskTalks, we bring together the technology leaders behind those stories from ambitious startups to global Fortune 500 companies to share what they’ve learned, what they’re building, and what they believe comes next. Because technology isn’t just changing industries. It’s reshaping businesses, challenging the way we think, and creating possibilities that didn’t exist before.
  
  We’re here to explore those stories, one conversation at a time, and connect the people shaping the future of technology.',
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`what_we_do_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`about_page_hero_hero_image_idx\` ON \`about_page\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`about_page_what_we_do_what_we_do_image_idx\` ON \`about_page\` (\`what_we_do_image_id\`);`)
  await db.run(sql`CREATE INDEX \`about_page_meta_meta_image_idx\` ON \`about_page\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_about_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_title\` text DEFAULT 'Where Tech Leaders Share How Technology Is Disrupting Business',
  	\`version_hero_image_id\` integer,
  	\`version_what_we_do_heading\` text DEFAULT 'What We Do',
  	\`version_what_we_do_text\` text DEFAULT 'We host technology leaders across startups and Fortune 500 companies as they share real-world experiences, bold ideas, and insights on how technology is transforming industries, reshaping businesses, and creating what’s next.',
  	\`version_what_we_do_image_id\` integer,
  	\`version_vision_heading\` text DEFAULT 'Our Vision',
  	\`version_vision_text\` text DEFAULT 'Every transformation starts with a vision.
  
  At DeskTalks, we bring together the technology leaders behind those stories from ambitious startups to global Fortune 500 companies to share what they’ve learned, what they’re building, and what they believe comes next. Because technology isn’t just changing industries. It’s reshaping businesses, challenging the way we think, and creating possibilities that didn’t exist before.
  
  We’re here to explore those stories, one conversation at a time, and connect the people shaping the future of technology.',
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_what_we_do_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_hero_version_hero_image_idx\` ON \`_about_page_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_what_we_do_version_what_we_do_imag_idx\` ON \`_about_page_v\` (\`version_what_we_do_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_meta_version_meta_image_idx\` ON \`_about_page_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_created_at_idx\` ON \`_about_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_updated_at_idx\` ON \`_about_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`podcasts_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text DEFAULT 'Listen to the voices shaping the Future of Tech & leadership',
  	\`hero_description\` text DEFAULT 'Featuring insights from experienced experts, research best practices and companies gain clarity and act with confidence.',
  	\`more_heading\` text DEFAULT 'Explore More Podcast',
  	\`load_more_label\` text DEFAULT 'View More',
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`podcasts_page_meta_meta_image_idx\` ON \`podcasts_page\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_podcasts_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_title\` text DEFAULT 'Listen to the voices shaping the Future of Tech & leadership',
  	\`version_hero_description\` text DEFAULT 'Featuring insights from experienced experts, research best practices and companies gain clarity and act with confidence.',
  	\`version_more_heading\` text DEFAULT 'Explore More Podcast',
  	\`version_load_more_label\` text DEFAULT 'View More',
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_podcasts_page_v_version_meta_version_meta_image_idx\` ON \`_podcasts_page_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_podcasts_page_v_created_at_idx\` ON \`_podcasts_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_podcasts_page_v_updated_at_idx\` ON \`_podcasts_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`blogs_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text DEFAULT 'Desktalks Blogs',
  	\`hero_description\` text DEFAULT 'Featuring insights from experienced experts, research best practices and articles showing how we help companies gain clarity and act with confidence.',
  	\`more_heading\` text DEFAULT 'Explore More Blogs',
  	\`load_more_label\` text DEFAULT 'Load More..',
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`blogs_page_meta_meta_image_idx\` ON \`blogs_page\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_blogs_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_title\` text DEFAULT 'Desktalks Blogs',
  	\`version_hero_description\` text DEFAULT 'Featuring insights from experienced experts, research best practices and articles showing how we help companies gain clarity and act with confidence.',
  	\`version_more_heading\` text DEFAULT 'Explore More Blogs',
  	\`version_load_more_label\` text DEFAULT 'Load More..',
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_blogs_page_v_version_meta_version_meta_image_idx\` ON \`_blogs_page_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_blogs_page_v_created_at_idx\` ON \`_blogs_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_blogs_page_v_updated_at_idx\` ON \`_blogs_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`join_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`banner\` text DEFAULT 'Whether you’re here to host or share your expertise, we’d love to hear from you.',
  	\`guest_tab\` text DEFAULT 'Join as Guest',
  	\`guest_title\` text DEFAULT 'Join Us as a Podcast Guest',
  	\`guest_text\` text DEFAULT 'Have expertise, experience, or a story worth sharing? We’re always looking for industry leaders, specialists, founders, and change-makers to join our conversations.',
  	\`guest_seo_title\` text DEFAULT 'Join as a Podcast Guest',
  	\`guest_seo_description\` text DEFAULT 'Share your expertise on DeskTalks. We invite industry leaders, specialists, founders and change-makers to join our podcast conversations on tech and leadership.',
  	\`host_tab\` text DEFAULT 'Join as Host',
  	\`host_title\` text DEFAULT 'Become a Podcast Host',
  	\`host_text\` text DEFAULT 'Have a perspective worth sharing and a passion for meaningful conversations? Join our podcast community as a host and help bring expert voices and ideas to the forefront.',
  	\`host_seo_title\` text DEFAULT 'Become a Podcast Host',
  	\`host_seo_description\` text DEFAULT 'Become a DeskTalks podcast host. Lead meaningful conversations with tech leaders and bring expert voices and ideas to the forefront.',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`_join_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_banner\` text DEFAULT 'Whether you’re here to host or share your expertise, we’d love to hear from you.',
  	\`version_guest_tab\` text DEFAULT 'Join as Guest',
  	\`version_guest_title\` text DEFAULT 'Join Us as a Podcast Guest',
  	\`version_guest_text\` text DEFAULT 'Have expertise, experience, or a story worth sharing? We’re always looking for industry leaders, specialists, founders, and change-makers to join our conversations.',
  	\`version_guest_seo_title\` text DEFAULT 'Join as a Podcast Guest',
  	\`version_guest_seo_description\` text DEFAULT 'Share your expertise on DeskTalks. We invite industry leaders, specialists, founders and change-makers to join our podcast conversations on tech and leadership.',
  	\`version_host_tab\` text DEFAULT 'Join as Host',
  	\`version_host_title\` text DEFAULT 'Become a Podcast Host',
  	\`version_host_text\` text DEFAULT 'Have a perspective worth sharing and a passion for meaningful conversations? Join our podcast community as a host and help bring expert voices and ideas to the forefront.',
  	\`version_host_seo_title\` text DEFAULT 'Become a Podcast Host',
  	\`version_host_seo_description\` text DEFAULT 'Become a DeskTalks podcast host. Lead meaningful conversations with tech leaders and bring expert voices and ideas to the forefront.',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_join_pages_v_created_at_idx\` ON \`_join_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_join_pages_v_updated_at_idx\` ON \`_join_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_header_nav\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_header_nav_order_idx\` ON \`site_settings_header_nav\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_header_nav_parent_id_idx\` ON \`site_settings_header_nav\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_footer_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_footer_links_order_idx\` ON \`site_settings_footer_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_links_parent_id_idx\` ON \`site_settings_footer_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_footer_bottom_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_footer_bottom_links_order_idx\` ON \`site_settings_footer_bottom_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_bottom_links_parent_id_idx\` ON \`site_settings_footer_bottom_links\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`categories\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`header_logo_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`header_cta_label\` text DEFAULT 'Contact Us';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`header_cta_link\` text DEFAULT '/#contact';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`footer_logo_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`footer_copyright\` text DEFAULT 'All rights reserved.';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`community_title\` text DEFAULT 'The DeskTalk community is growing!';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`community_text\` text DEFAULT 'We bring together founders, business leaders, and innovators who are building what’s next and transforming industries along the way.';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`community_button_label\` text DEFAULT 'Join Our Community';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`community_button_link\` text DEFAULT '/join-as-guest';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`community_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`subscribe_heading\` text DEFAULT 'Subscribe to get the latest news, trends, and expert insights in AI, tech, and leadership.';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`subscribe_placeholder\` text DEFAULT 'Enter Email...';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`subscribe_button_label\` text DEFAULT 'Subscribe';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`subscribe_success_message\` text DEFAULT 'You are subscribed. Welcome to DeskTalks!';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`seo_default_description\` text DEFAULT 'Discover expert insights through podcasts, connect with a global community, and join conversations with the leaders shaping the future of tech.';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`seo_share_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`site_settings_header_header_logo_idx\` ON \`site_settings\` (\`header_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_footer_logo_idx\` ON \`site_settings\` (\`footer_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_community_community_image_idx\` ON \`site_settings\` (\`community_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_seo_seo_share_image_idx\` ON \`site_settings\` (\`seo_share_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`home_page\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v\`;`)
  await db.run(sql`DROP TABLE \`about_page\`;`)
  await db.run(sql`DROP TABLE \`_about_page_v\`;`)
  await db.run(sql`DROP TABLE \`podcasts_page\`;`)
  await db.run(sql`DROP TABLE \`_podcasts_page_v\`;`)
  await db.run(sql`DROP TABLE \`blogs_page\`;`)
  await db.run(sql`DROP TABLE \`_blogs_page_v\`;`)
  await db.run(sql`DROP TABLE \`join_pages\`;`)
  await db.run(sql`DROP TABLE \`_join_pages_v\`;`)
  await db.run(sql`DROP TABLE \`site_settings_header_nav\`;`)
  await db.run(sql`DROP TABLE \`site_settings_footer_links\`;`)
  await db.run(sql`DROP TABLE \`site_settings_footer_bottom_links\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_site_settings\` (
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
  await db.run(sql`INSERT INTO \`__new_site_settings\`("id", "social_youtube", "social_linkedin", "social_instagram", "social_soundcloud", "social_spotify", "blog_cta_heading", "blog_cta_text", "blog_cta_button_label", "blog_cta_button_url", "updated_at", "created_at") SELECT "id", "social_youtube", "social_linkedin", "social_instagram", "social_soundcloud", "social_spotify", "blog_cta_heading", "blog_cta_text", "blog_cta_button_label", "blog_cta_button_url", "updated_at", "created_at" FROM \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings\` RENAME TO \`site_settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`ALTER TABLE \`categories\` DROP COLUMN \`description\`;`)
}
