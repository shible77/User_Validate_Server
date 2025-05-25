CREATE TABLE `user_info` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`email` varchar(256) NOT NULL,
	`username` varchar(256) NOT NULL,
	`first_name` varchar(256) NOT NULL,
	`last_name` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL,
	CONSTRAINT `user_info_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_info_email_unique` UNIQUE(`email`),
	CONSTRAINT `user_info_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
