SELECT
  company.name AS 'Empresa',
  city.name AS 'Cidade',
  CASE
    WHEN unity.is_headquarter THEN 'SIM' ELSE 'NÃO' END AS 'Sede'
FROM
  business_units AS unity,
  companies AS company,
  cities AS city
WHERE
  unity.company_id = company.id
  AND
  unity.city_id = city.id;