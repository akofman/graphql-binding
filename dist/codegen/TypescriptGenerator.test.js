'use strict'
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
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var fs = __importStar(require('fs'))
var path = __importStar(require('path'))
var graphql_1 = require('graphql')
var TypescriptGenerator_1 = require('./TypescriptGenerator')
var ava_1 = __importDefault(require('ava'))
var typeDefs = fs.readFileSync(
  path.join(__dirname, '../../src/codegen/fixtures/schema.graphql'),
  'utf-8',
)
ava_1.default('typescript generator', function(t) {
  var schema = graphql_1.buildSchema(typeDefs)
  var generator = new TypescriptGenerator_1.TypescriptGenerator({
    schema: schema,
    inputSchemaPath: 'src/schema.js',
    outputBindingPath: 'src/generated/binding.js',
    isDefaultExport: false,
  })
  var result = generator.render()
  t.snapshot(result)
})
//# sourceMappingURL=TypescriptGenerator.test.js.map
