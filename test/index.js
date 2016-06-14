var expect = require('chai').expect
var democracyosConfig = require('../')
var path = require('path')

describe('Get default config without overrides', function () {
  var config = democracyosConfig({ path: path.join(__dirname, 'mocks', 'defaultOnly') })
  it('should read number property', function () {
    expect(config.publicPort).to.be.a('number')
    expect(config.publicPort).to.equal(3000)
  })
  it('should read string property', function () {
    expect(config.title).to.be.a('string')
    expect(config.title).to.equal('My awesome app default title.')
  })
  it('should read array property', function () {
    expect(config.items).to.be.an('array')
    expect(config.items[0]).to.equal('one')
    expect(config.items[1]).to.equal('two')
    expect(config.items[2]).to.equal('three')
  })
  it('should read empty object property', function () {
    expect(config.custom).to.be.a('object')
    expect(config.custom).to.eql({})
  })
})

describe('Get default config with [env].json override', function () {
  var config = democracyosConfig({ path: path.join(__dirname, 'mocks', 'defaultEnvJson') })
  it('should read overrided number property', function () {
    expect(config.publicPort).to.be.a('number')
    expect(config.publicPort).to.equal(8080)
  })
  it('should read overrided string property', function () {
    expect(config.title).to.be.a('string')
    expect(config.title).to.equal('My awesome app development title.')
  })
  it('should read overrided array property', function () {
    expect(config.items).to.be.an('array')
    expect(config.items[0]).to.equal('ONE')
    expect(config.items[1]).to.equal('TWO')
    expect(config.items[2]).to.equal('THREE')
  })
  it('should read overrided empty object property', function () {
    expect(config.custom).to.be.a('object')
    expect(config.custom).to.eql({foo: 'bar'})
  })
})

describe('Get default config with enviroment variables override', function () {
  process.env.PUBLIC_PORT = 8080
  process.env.TITLE = 'My awesome app development title.'
  process.env.ITEMS = ['ONE', 'TWO', 'THREE']
  process.env.CUSTOM = '{"foo":"bar"}'

  var config = democracyosConfig({ path: path.join(__dirname, 'mocks', 'defaultOnly') })
  it('should read overrided number property', function () {
    expect(config.publicPort).to.be.a('number')
    expect(config.publicPort).to.equal(8080)
  })
  it('should read overrided string property', function () {
    expect(config.title).to.be.a('string')
    expect(config.title).to.equal('My awesome app development title.')
  })
  it('should read overrided array property', function () {
    expect(config.items).to.be.an('array')
    expect(config.items[0]).to.equal('ONE')
    expect(config.items[1]).to.equal('TWO')
    expect(config.items[2]).to.equal('THREE')
  })
  it('should read overrided empty object property', function () {
    expect(config.custom).to.be.a('object')
    expect(config.custom).to.eql({foo: 'bar'})
  })
})
