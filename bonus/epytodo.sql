CREATE DATABASE IF NOT EXISTS epytodo;

USE epytodo;

CREATE TABLE IF NOT EXISTS `user`
(
 `id`         integer NOT NULL AUTO_INCREMENT ,
 `email`      varchar(255) NOT NULL ,
 `password`   varchar(255) NOT NULL ,
 `created_at` datetime DEFAULT CURRENT_TIMESTAMP ,
 `firstname`  varchar(255) NOT NULL ,
 `name`  varchar(255) NOT NULL ,
 PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `todo`
(
 `id`          integer NOT NULL AUTO_INCREMENT ,
 `title`       varchar(255) NOT NULL ,
 `description` varchar(255) NOT NULL ,
 `created_at`  datetime DEFAULT CURRENT_TIMESTAMP ,
 `due_time`    datetime NOT NULL ,
 `user_id`     integer NOT NULL REFERENCES `user`(`id`) ,
 `status`      ENUM('not started','todo','in progress', 'done') DEFAULT 'not started' ,
 PRIMARY KEY (`id`)
) ENGINE = InnoDB;