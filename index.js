/**
* Configuration
*
* - Default config options will be loaded from `/config/defaults.json`. Also it
*   will be used as reference for the Type the values should have.
*
* - Environment specific overrides are optional, using `/config/{NODE_ENV}.json`.
*
* - Environment Variables also can be used to override options (recommended for
*   production).
*   + Var names should be CONSTANT_CASE.
*     + e.g.: `mongoUrl` => `MONGO_URL`
*     + Scoped variables e.g.: `notifications.url` => `NOTIFICATIONS_URL`
*   + `Arrays`s should be strings separated by commas.
*     + e.g.: `"staff": ["mail@eg.com", "a@c.m"]` => `STAFF="mail@eg.com,a@c.m"`
*   + `Boolean`s should be `true` or `false` as strings.
*     + e.g.: `"rssEnabled": false` => `RSS_ENABLED="false"`
*   + Var Types are casted using `./cast-string.js`
**/

var path = require('path')
var fs = require('fs')
var typeOf = require('component-type')
var changeCase = require('change-case')
var objForEach = require('./lib/obj-for-each')
var castFromString = require('./lib/cast-from-string')

var env = process.env

module.exports = loadConfig

function loadConfig (opts) {
  opts = opts || {}
  var options = {}

  options.environment = opts.environment || env.NODE_ENV || 'development'
  options.path = opts.path || path.join(process.cwd(), 'config')

  if (!options.defaultsPath) {
    options.defaultsPath = path.join(options.path, 'defaults.json')
  }

  if (!options.currentPath) {
    options.currentPath = path.join(options.path, options.environment + '.json')
  }

  if (!fs.existsSync(options.defaultsPath)) {
    throw new Error(options.defaultsPath + ' file not found.')
  }

  var defaultConfig = require(options.defaultsPath)
  var currentConfig = fs.existsSync(options.currentPath)
    ? require(options.currentPath)
    : {}
  var config = {}

  objForEach(defaultConfig, parse)

  function parse (val, key, scope) {
    var s = scope ? scope.slice(0) : []
    var c = get(config, s)
    var newVal

    if (typeOf(val) === 'object' && JSON.stringify(val) !== '{}') {
      c[key] = {}
      objForEach(val, parse, s.concat(key))
      return
    }

    var envKey = s.concat(key).map(changeCase.constantCase).join('_')
    if (process.env.hasOwnProperty(envKey)) {
      try {
        newVal = castFromString(process.env[envKey], typeOf(val))
      } catch (e) {
        throw new Error('There was an error when parsing ENV "' + envKey + '": ' + e)
      }

      c[key] = newVal
      return
    }

    var local = get(currentConfig, s)
    if (local && local.hasOwnProperty(key)) {
      newVal = local[key]

      if (typeOf(val) !== typeOf(newVal)) {
        throw new Error('Invalid value for key "' + key + '" on "' + path.basename(options.currentPath) + '": ' + '". Should be "' + typeOf(val) + '".')
      }

      c[key] = newVal
      return
    }

    c[key] = val
  }

  return config
}

function get (obj, scope) {
  var c = obj
  if (scope) scope.forEach(function (k) { c = c ? c[k] : null })
  return c
}
