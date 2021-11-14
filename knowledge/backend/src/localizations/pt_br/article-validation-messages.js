module.exports = function(app) {
  return {
    empty_title: 'O título do artigo não foi informado.',
    empty_description: 'A descrição do artigo não foi informada.',
    invalid_thumbnail_url: 'A URL dá imagem de capa é inválida.',
    empty_content: 'O conteúdo do artigo não foi informado.',
    invalid_author_id: 'Não foi informado um id válido para o autor do artigo.',
    invalid_category_id: 'Não foi informado um id válido para a categoria do artigo',
    not_found: 'Não existe um artigo com o id informado.',
    author_not_found: 'Não foi encontrado um usuário com o id informado como autor do artigo.',
    repeated_title: 'Já existe um artigo com mesmo título ná mesma categoria.',
    invalid_article_page: 'O id dá página de artigos informado é inválido.'
  }
}