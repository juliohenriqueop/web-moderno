INSERT INTO cities
  (`name`, area, state_id)
VALUES
  ('Campinas', 795, 25),
  ('Niterói', 133.9, 19),
  ('Caruaru', 920.6, (SELECT id FROM states WHERE abbreviation = 'PE')),
  ('Juazeiro do Norte', 248.2, (SELECT id FROM states WHERE abbreviation = 'CE'));