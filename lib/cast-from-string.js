var typeOf = require('component-type')

module.exports = castFromString

function castFromString (string, to) {
  if (castTo[to]) return castTo[to](string)
  throw new Error('Invalid cast type.')
}

var castTo = {
  array: function (string) {
    if (typeOf(string) === 'string') {
      if (string === '') return []
      return string.split(',')
    }
    throw new Error('Should be a string of values separated by commas.')
  },

  boolean: function (string) {
    if (string === 'true') return true
    if (string === 'false') return false
    throw new Error('Should be a boolean written as string.')
  },

  number: function (string) {
    var number = parseInt(string, 10)
    if (typeOf(number) === 'number') return number
    throw new Error('Should be a number written as string.')
  },

  string: function (string) {
    if (typeOf(string) === 'string') return string
    throw new Error('Should be string.')
  },

  object: function (string) {
    try {
      var value = JSON.parse(string)
      if (typeOf(value) === 'object') return value
      throw new Error('Should be a JSON object written as a string.')
    } catch (err) {
      throw new Error('Should be a JSON object written as a string.')
    }
  }
}
