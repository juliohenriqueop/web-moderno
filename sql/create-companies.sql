CREATE TABLE IF NOT EXISTS companies (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  cnpj INT UNSIGNED NOT NULL UNIQUE,
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS business_units (
  company_id INT UNSIGNED NOT NULL,
  city_id INT UNSIGNED NOT NULL,
  is_headquarter BOOLEAN NOT NULL,
  PRIMARY KEY(company_id, city_id),
  FOREIGN KEY(company_id) REFERENCES companies(id),
  FOREIGN KEY(city_id) REFERENCES cities(id)
);