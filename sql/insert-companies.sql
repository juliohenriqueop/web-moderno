ALTER TABLE companies
MODIFY cnpj VARCHAR(14);

INSERT INTO companies
  (`name`, cnpj)
VALUES
  ('Bradesco', '60746948000112'),
  ('Vale', '33592510000154'),
  ('Cielo', '01027058000191');

INSERT INTO business_units
  (company_id, city_id, is_headquarter)
VALUES
  (1, 1, 1),
  (1, 2, 0),
  (2, 1, 0),
  (2, 2, 1);