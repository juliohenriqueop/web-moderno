module.exports = function() {
  return {
    not_found: 'Não existe uma categoria com o id informado.',
    invalid_parent_id: 'Não foi informado um id válido para a categoria pai.',
    already_exists: 'A categoria informada já existe.',
    empty_name: 'O nome dá categoria não foi informado.',
    long_name: 'O nome dá categoria tem mais de 30 caracteres.',
    similar_already_exists: 'Já existe uma categoria com o mesmo nome e categoria pai.',
    parent_not_found: 'A categoria pai informada não existe.',
    parent_already_exists: 'A categoria pai informada já existe.',
    can_not_delete: 'Não é possível remover a categoria solicitada pois ela possui outras categorias ou artigos como filhos.'
  }
}