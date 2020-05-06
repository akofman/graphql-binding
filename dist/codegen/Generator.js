'use strict'
var __makeTemplateObject =
  (this && this.__makeTemplateObject) ||
  function(cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, 'raw', { value: raw })
    } else {
      cooked.raw = raw
    }
    return cooked
  }
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k]
    result['default'] = mod
    return result
  }
Object.defineProperty(exports, '__esModule', { value: true })
var flatten_1 = __importDefault(require('./utils/flatten'))
var interleave_1 = require('./utils/interleave')
var path = __importStar(require('path'))
var Generator = /** @class */ (function() {
  function Generator(_a) {
    var schema = _a.schema,
      inputSchemaPath = _a.inputSchemaPath,
      outputBindingPath = _a.outputBindingPath,
      isDefaultExport = _a.isDefaultExport
    this.schema = schema
    this.inputSchemaPath = inputSchemaPath
    this.outputBindingPath = outputBindingPath
    this.isDefaultExport = isDefaultExport
  }
  Generator.prototype.render = function() {
    return this.compile(
      templateObject_1 ||
        (templateObject_1 = __makeTemplateObject(
          ['', '\n\n', ''],
          ['\\\n', '\n\n', ''],
        )),
      this.renderImports(),
      this.renderExports(),
    )
  }
  Generator.prototype.compile = function(strings) {
    var interpolations = []
    for (var _i = 1; _i < arguments.length; _i++) {
      interpolations[_i - 1] = arguments[_i]
    }
    return flatten_1
      .default(interleave_1.interleave(strings, interpolations), this)
      .join('')
  }
  Generator.prototype.getRelativeSchemaPath = function() {
    var result = path.posix
      .relative(
        path.dirname(this.outputBindingPath) + '/',
        this.inputSchemaPath,
      )
      .replace(/\.(t|j)s$/, '')
    if (result.startsWith('.')) {
      return result
    }
    return './' + result
  }
  Generator.prototype.renderImports = function() {
    return (
      "const { makeBindingClass } = require('graphql-binding')\nconst schema = require('" +
      this.getRelativeSchemaPath() +
      "')" +
      (this.isDefaultExport ? '.default' : '')
    )
  }
  Generator.prototype.renderExports = function() {
    return 'module.exports = makeBindingClass({ schema })'
  }
  return Generator
})()
exports.Generator = Generator
var templateObject_1
//# sourceMappingURL=Generator.js.map
