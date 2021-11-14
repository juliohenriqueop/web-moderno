import $ from 'jquery'
import {
  addOnHtmlSuccessCallback
} from '../core/include'

$.fn.createCitiesButtons = function() {
  const animDuration = 400

  const transparent = 0
  const opaque = 1

  function filterByCity(city) {
    $('[wm-city]').each((index, element) => {
      const isTarget = $(element).attr('wm-city') === city || city === null

      $(element).fadeTo(animDuration, transparent, () => {
        $(element).parent().hide()

        if (isTarget) {
          $(element).parent().show()
          $(element).fadeTo(animDuration, opaque)
        }
      })
    })
  }

  function switchActiveCityButton(toActive) {
    $('.btn-info').each((index, element) => {
      if (element === toActive)
        $(element).addClass('active')
      else
        $(element).removeClass('active')
    })
  }

  const citiesNames = new Set()

  $('[wm-city]').each((index, element) => {
    citiesNames.add($(element).attr('wm-city'))
  })

  const citiesButtons = Array.from(citiesNames).map(city => {
    const button = $('<button>')
    button.text(city)
    button.addClass(['btn', 'btn-info'])

    button.click(event => {
      filterByCity(city)
      switchActiveCityButton(event.target)
    })

    return button
  })

  const allButton = $('<button>')
  allButton.text('Todas')
  allButton.addClass(['btn', 'btn-info', 'active'])

  allButton.click(event => {
    filterByCity(null)
    switchActiveCityButton(event.target)
  })

  const citiesButtonsGroup = $('<div>')
  citiesButtonsGroup.addClass('btn-group')
  citiesButtonsGroup.append(citiesButtons)
  citiesButtonsGroup.append(allButton)

  const citiesElement = $('[wm-city-buttons]')
  citiesElement.html(citiesButtonsGroup)

  return this
}

addOnHtmlSuccessCallback(() => {
  $('[wm-city-buttons]').createCitiesButtons()
})