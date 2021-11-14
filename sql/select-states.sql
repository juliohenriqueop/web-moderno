SELECT * FROM states;

SELECT
  abbreviation as 'Sigla',
  `name` as 'Estado'
FROM states
WHERE region = 'Sul';

SELECT
  `name`,
  region,
  `population`
FROM states
WHERE `population` >= 10
ORDER BY `population` DESC;