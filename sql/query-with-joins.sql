SELECT * FROM cities AS city
INNER JOIN mayors AS mayor
ON city.id = mayor.city_id;

SELECT * FROM cities AS city
LEFT JOIN mayors AS mayor
ON city.id = mayor.city_id
ORDER BY mayor.id DESC;

SELECT * FROM cities AS city
RIGHT JOIN mayors AS mayor
ON city.id = mayor.city_id
ORDER BY mayor.city_id DESC;

-- SELECT * FROM cities AS city
-- FULL JOIN mayors AS mayor
-- ON city.id = mayor.city_id
-- ORDER BY mayor.city_id DESC;

SELECT * FROM cities AS city
LEFT JOIN mayors AS mayor
ON city.id = mayor.city_id
UNION
SELECT * FROM cities AS city
RIGHT JOIN mayors AS mayor
ON city.id = mayor.city_id
ORDER BY city_id DESC;