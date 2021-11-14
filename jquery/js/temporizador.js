(function($) {
  $.fn.reverseTimer = function(userOptions) {
    const options = $.extend({
      message: 'Soon...',
      until: '23:59:59'
    }, userOptions)

    const hourFirstDigit = $('<span>').addClass('digito').text('0')
    const hourSecondDigit = $('<span>').addClass('digito').text('0')

    const firstSeparator = $('<span>').addClass('separador').text(':')

    const minutesFirstDigit = $('<span>').addClass('digito').text('0')
    const minutesSecondDigit = $('<span>').addClass('digito').text('0')

    const secondSeparator = $('<span>').addClass('separador').text(':')

    const secondsFirstDigit = $('<span>').addClass('digito').text('0')
    const secondsSecondDigit = $('<span>').addClass('digito').text('0')

    const message = $('<div>').addClass('mensagem').text(options.message)

    $(this)
      .addClass('temporizador').append(
        hourFirstDigit, hourSecondDigit,
        firstSeparator,
        minutesFirstDigit, minutesSecondDigit,
        secondSeparator,
        secondsFirstDigit, secondsSecondDigit,
        message
      )

    const timeRegex = new RegExp(/(\d\d):(\d\d):(\d\d)/)
    const targetTime = timeRegex.exec(options.until)

    const timer = setInterval(() => {
      const currentDate = new Date()
      const targetDate = new Date()

      targetDate.setHours(targetTime[1])
      targetDate.setMinutes(targetTime[2])
      targetDate.setSeconds(targetTime[3])

      const differenceMs = targetDate.getTime() - currentDate.getTime()
      if (differenceMs >= 0) {
        const difference = timeRegex.exec(new Date(differenceMs).toISOString())

        hourFirstDigit.text(difference[1][0])
        hourSecondDigit.text(difference[1][1])

        minutesFirstDigit.text(difference[2][0])
        minutesSecondDigit.text(difference[2][1])

        secondsFirstDigit.text(difference[3][0])
        secondsSecondDigit.text(difference[3][1])
      } else {
        console.warn('Difference between "targetDate" and "currentDate" are negative.')
        clearInterval(timer)
      }
    }, 1000)

    return this
  }
})(jQuery)