CREATE DATABASE netflix;
USE netflix;


CREATE TABLE `Users` (
  `idUsers` int NOT NULL AUTO_INCREMENT,
  `user` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `plan_details` varchar(45) NOT NULL,
  PRIMARY KEY (`idUsers`));

INSERT INTO `Users` VALUES (1,'laura_dev','laura','Laura','laura@gmail.com','Standard'),(2,'maria_dev','maria','Maria','maria@gmail.com','Standard'),(3,'ester_dev','ester','Ester','ester@gmail.com','Standard');

CREATE TABLE `movies` (
  `idmovies` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `genre` varchar(45) NOT NULL,
  `image` varchar(1000) NOT NULL,
  `category` varchar(45) NOT NULL,
  `year` int DEFAULT NULL,
  PRIMARY KEY (`idmovies`));

INSERT INTO `movies` VALUES (1,'Pulp Fiction','Crimen','https://pics.filmaffinity.com/pulp_fiction-210382116-large.jpg','Top 10',1994),(2,'La vita è bella','Comedia','https://pics.filmaffinity.com/la_vita_e_bella-646167341-mmed.jpg','Top 10',1996),(3,'Forrest Gump','Comedia','https://pics.filmaffinity.com/forrest_gump-212765827-mmed.jpg','Top 10',1994);

CREATE TABLE `Actors` (
  `idActors` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  `birthday` date DEFAULT NULL,
  PRIMARY KEY (`idActors`));

INSERT INTO `Actors` VALUES (1,'Tom','Hanks','Estados Unidos','1956-07-09'),(2,'Roberto','Benigni','Italia','1952-10-27'),(3,'John','Travolta','Estados Unidos','1954-02-18');

SELECT * FROM movies;
SELECT * FROM movies WHERE year >='1990';
SELECT * FROM movies WHERE category = 'Top 10';
UPDATE movies SET year = '1997' WHERE idmovies=2;

SELECT * FROM actors;
SELECT name, birthday FROM actors WHERE birthday BETWEEN '1950-01-01' and '1960-01-01';
SELECT name, lastname FROM actors WHERE country='Estados Unidos';

SELECT * FROM users WHERE plan_details='Standard';
DELETE FROM users WHERE user LIKE 'M%';

ALTER TABLE actors ADD images VARCHAR(100);
