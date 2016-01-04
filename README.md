Config
======

Configuration manager for node apps.

### Install

`npm i @democracyos/config -S`

### Usage

**/config/index.js**
```javascript
module.exports = require('@democracyos/config')({
  path: __dirname
})
```

**/config/.gitignore**
```
*.json
!defaults.json
```

**/config/defaults.json**
```json
{
  "port": 3000,
  "title": "My awesome app Defaults"
}
```

**/config/development.json**
```json
{
  "title": "My awesome app on Development"
}
```

**And, in your `/index.js`, or wherever:**
```javascript
var config = require('./config')

console.log(config.title) // My awesome app on Development
```

## TODO
* Refactor, please.
* Add tests.
