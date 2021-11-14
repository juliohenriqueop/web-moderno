import $ from 'jquery'

const onHtmlSuccessCallbacks = []

export function addOnHtmlSuccessCallback(callback) {
  if (!onHtmlSuccessCallbacks.includes(callback))
    onHtmlSuccessCallbacks.push(callback)
}

function includeContents(parent) {
  if (!parent)
    parent = 'body'

  $(parent).find('[wm-include]').each((index, element) => {
    const url = $(element).attr('wm-include')

    $.ajax({
      url,

      success(data) {
        $(element).html(data)
        $(element).removeAttr('wm-include')

        onHtmlSuccessCallbacks.forEach(callback => callback())
        includeContents(element)
      }
    })
  })
}

includeContents()