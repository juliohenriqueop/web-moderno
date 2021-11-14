SELECT
  city.name as 'Cidade',
  `state`.`name` as 'Estado',
  region as 'Região'
FROM
  cities as city,
  states as `state`
WHERE
  city.state_id = `state`.id;

SELECT
  city.name as 'Cidade',
  `state`.`name` as 'Estado',
  region as 'Região'
FROM cities as city
INNER JOIN
  states as `state`
ON
  city.state_id = `state`.id;