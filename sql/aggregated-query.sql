SELECT
  region as 'Região',
  sum(`population`) as `População`
FROM states
GROUP BY region
ORDER BY `População` DESC;

SELECT
  sum(`population`) as Total,
  avg(`population`) as `Média`
FROM states;