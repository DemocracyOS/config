Config
======

[![Greenkeeper badge](https://badges.greenkeeper.io/DemocracyOS/config.svg)](https://greenkeeper.io/)

Configuration manager for node apps. Keep all your default settings on a file,
and override them per environment, using another file or environment variables.

### Install

`npm i democracyos-config -S`

### Usage

1- Create `defaults.json` file. It will define the schema of the config,
including default values and types it should have:

**/config/defaults.json**
```json
{
  "port": 3000,
  "title": "My awesome app Defaults"
}
```

2- Environment specific overrides are optional, using `{NODE_ENV}.json` or
`development.json` as default:

**/config/development.json**
```json
{
  "title": "My awesome app on Development"
}
```

3- Only commit default values! You wouldn't want to commit any keys, etc.

**/config/.gitignore**
```
*.json
!defaults.json
```

4- Load your config, specify the path to where all the config files are located.

**/config/index.js**
```javascript
module.exports = require('democracyos-config')({
  path: __dirname
})
```

5- Use it:

**And, in your `/server.js`, or wherever:**
```javascript
var config = require('./config')

console.log(config.title) // My awesome app on Development
```

### Environment Variables

You can also define values using environment variables, this is the recommended
approach for `production`.

* Var names should be CONSTANT_CASE.
  * e.g.: `mongoUrl` => `MONGO_URL`
  * Scoped variables e.g.: `user.password` => `USER_PASSWORD`
* `Arrays`s should be strings separated by commas.
  * e.g.: `"staff": ["mail@eg.com", "a@c.m"]` => `STAFF="mail@eg.com,a@c.m"`
* `Boolean`s should be `true` or `false` as strings.
  * e.g.: `"rssEnabled": false` => `RSS_ENABLED="false"`
* `Objects`s should be a JSON string.
  * e.g.: `"connectionData": {}` => `CONNECTION_DATA='{"ip": "127.0.0.1", "port": 45333}'`
* For more info, Types are casted using `/lib/cast-string.js`

## Tests

```
npm run test
```

## License
* MIT
* © 2017 [Demoracia en Red](http://democraciaenred.org)
* More details under [LICENSE](https://github.com/DemocracyOS/config/blob/master/LICENSE)
