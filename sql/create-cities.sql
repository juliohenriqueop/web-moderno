CREATE TABLE IF NOT EXISTS cities(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  area DECIMAL(10,2),
  state_id INT UNSIGNED NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(state_id) REFERENCES states(id)
);

-- CREATE TABLE IF NOT EXISTS test(
--   id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY
-- );

-- DROP TABLE IF EXISTS test;