const fs = require('fs')
const {
  ipcMain
} = require('electron')

function readText(path) {
  const text = fs.readFileSync(path).toString('UTF-8')
  return text
}

function readSubtitles(paths) {
  const subtitles = paths.map(path => readText(path))
  return subtitles
}

function mergeSubtitles(subtitles) {
  const content = subtitles.reduce((mergedSubtitles, currentSubtitle) => {
    return `${mergedSubtitles}\n${currentSubtitle}`
  })

  return content
}

function splitLinesToArray(subtitles) {
  const lineArray = subtitles.split('\n')
  return lineArray
}

function isStrEmpty(text) {
  if (typeof text === "undefined")
    return true

  return !text.trim()
}

function validateSubtitleLine(line) {
  const hasNumber = parseInt(line.trim())
  const isEmpty = isStrEmpty(line)
  const isSubtitleTiming = line.includes('-->')

  const isValid = !hasNumber && !isEmpty && !isSubtitleTiming
  return isValid
}

function removePunctuation(line) {
  return line.replace(/[!"#$%&()*+,./:;=?@[\\\]_`{|}~]/g, '')
}

function removeTags(line) {
  return line.replace(/(<[^>]+)>/ig, '')
}

function splitByDash(line) {
  return line.replace(/-/g, ' ')
}

function clearSubtitleLine(line) {
  const cleanedLine = removePunctuation(line)
  const taglessLine = removeTags(cleanedLine)
  const splittedLine = splitByDash(taglessLine)

  return splittedLine.trim()
}

function validateWord(word) {
  const isEmpty = isStrEmpty(word)
  const isNumber = new RegExp(/[0-9]/g).test(word)

  return !isEmpty && !isNumber
}

function capitalizeFirstCharacter(word) {
  if (isStrEmpty(word)) return

  const capitalizedFirstCharacter = word[0].toUpperCase();
  const remainingCharacters = word.substr(1).toLowerCase()

  const finalText = capitalizedFirstCharacter.concat(remainingCharacters);
  return finalText;
}

function mergeSubtitleLines(subtitle, line) {
  return `${subtitle} ${line}`
}

function groupWords(wordsArray) {
  const groupedWords = wordsArray.reduce((groupedWords, word) => {
    if (groupedWords[word]) {
      groupedWords[word] = groupedWords[word] + 1
    } else {
      groupedWords[word] = 1
    }

    return groupedWords
  }, {})

  const wordsObject = Object.keys(groupedWords).map(key => ({
    name: key,
    occurrences: groupedWords[key]
  }))

  return wordsObject.sort((wordA, wordB) => wordB.occurrences - wordA.occurrences)
}

function extractSubtitleWords(paths) {
  return new Promise((resolve, reject) => {
    try {
      const subtitles = readSubtitles(paths)
      const mergedSubtitles = mergeSubtitles(subtitles)
      const lineArray = splitLinesToArray(mergedSubtitles)

      const validLines = lineArray.filter(line => validateSubtitleLine(line))
      const cleanedLines = validLines.map(line => clearSubtitleLine(line))
      const mergedWords = cleanedLines.reduce((subtitle, line) => mergeSubtitleLines(subtitle, line))

      const words = mergedWords.split(' ')
      const formattedWords = words.map(word => capitalizeFirstCharacter(word))
      const validWords = formattedWords.filter(word => validateWord(word))

      const wordsObject = groupWords(validWords)

      resolve(wordsObject)
    } catch (error) {
      reject(error)
    }
  })
}

ipcMain.on('PARSE_SUBTITLES', (event, args) => {
  extractSubtitleWords(args).then(data => {
    event.reply('SUBTITLES_WORDS', data)
  })
})