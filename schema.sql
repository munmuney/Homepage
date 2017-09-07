-- Drops the todolist if it exists currently --
DROP DATABASE IF EXISTS homepage;
-- Creates the "todolist" database --
CREATE DATABASE homepage;
USE homepage;

DESCRIBE users;
DESCRIBE genres;
DESCRIBE websites;


INSERT INTO genres (name, boxNum, iconname) VALUES ("Social Media", 1, "socialmedia.gif");
INSERT INTO genres (name, boxNum, iconname) VALUES ("News", 2, "news.gif");
INSERT INTO genres (name, boxNum, iconname) VALUES ("Email", 3, "email.gif");
INSERT INTO genres (name, boxNum, iconname) VALUES ("eCommerce", 4, "ecommerce.gif");
INSERT INTO genres (name, boxNum, iconname) VALUES ("Finances", 5, "finance.gif");
INSERT INTO genres (name, boxNum, iconname) VALUES ("Video", 6, "video.gif");


INSERT INTO websites (name, url, png, GenreId) VALUES ("facebook", "https://facebook.com", "facebook copy.jpg", 1);
INSERT INTO websites (name, url, png, GenreId) VALUES ("twitter", "https://twitter.com", "twitter copy.jpg", 1);
INSERT INTO websites (name, url, png, GenreId) VALUES ("tumblr", "https://tumblr.com", "tumblr copy.jpg", 1);
INSERT INTO websites (name, url, png, GenreId) VALUES ("cnn", "https://cnn.com", "cnn copy.jpg", 2);
INSERT INTO websites (name, url, png, GenreId) VALUES ("chase", "https://chase.com", "chase copy.jpg", 2);
INSERT INTO websites (name, url, png, GenreId) VALUES ("paypal", "https://paypal.com", "paypal copy.jpg", 2);
INSERT INTO websites (name, url, png, GenreId) VALUES ("googlenews", "https://googlenews.com", "googlenews copy.jpg", 3);
INSERT INTO websites (name, url, png, GenreId) VALUES ("msn", "https://msn.com", "msn copy.jpg", 3);
INSERT INTO websites (name, url, png, GenreId) VALUES ("hulu", "https://hulu.com", "hulu copy.jpg", 3);
INSERT INTO websites (name, url, png, GenreId) VALUES ("amazon", "https://amazon.com", "amazon copy.jpg", 4);
INSERT INTO websites (name, url, png, GenreId) VALUES ("etsy", "https://etsy.com", "etsy copy.jpg", 4);
INSERT INTO websites (name, url, png, GenreId) VALUES ("ebay", "https://ebay.com", "ebay copy.jpg", 4);
INSERT INTO websites (name, url, png, GenreId) VALUES ("chase", "https://chase.com", "chase copy.jpg", 5);
INSERT INTO websites (name, url, png, GenreId) VALUES ("bankofamerica", "https://bankofamerica.com", "bankofamerica copy.jpg", 5);
INSERT INTO websites (name, url, png, GenreId) VALUES ("yahoonews", "https://yahoonews.com", "yahoonews copy.jpg", 5);
INSERT INTO websites (name, url, png, GenreId) VALUES ("netflix", "https://netflix.com", "netflix copy.jpg", 6);
INSERT INTO websites (name, url, png, GenreId) VALUES ("youtube", "https://youtube.com", "youtube copy.jpg", 6);
INSERT INTO websites (name, url, png, GenreId) VALUES ("tumblr", "https://tumblr.com", "tumblr copy.jpg", 6);



SELECT * FROM users;
SELECT * FROM genres;
SELECT * FROM websites;