#!/usr/bin/env node

import * as fs from 'fs'
import * as yargs from 'yargs'
import * as mkdirp from 'mkdirp'
import * as path from 'path'
import { Generator } from './codegen/Generator'
import { TypescriptGenerator } from './codegen/TypescriptGenerator'
import { buildSchema, printSchema } from 'graphql'
require('ts-node').register()

const argv = yargs
  .usage(`Usage: $0 -i [input] -g [generator] -b [outputBinding]`)
  .options({
    input: {
      alias: 'i',
      describe: 'Path to schema.js or schema.ts file',
      type: 'string',
    },
    generator: {
      alias: 'g',
      describe:
        'Type of the generator. Available generators: typescript, javascript',
      type: 'string',
    },
    outputBinding: {
      alias: 'b',
      describe: 'Output binding. Example: binding.ts',
      type: 'string',
    },
    outputTypedefs: {
      alias: 't',
      describe: 'Output type defs. Example: typeDefs.graphql',
      type: 'string',
    },
  })
  .demandOption(['i', 'g', 'b']).argv

run(argv).catch(e => console.error(e))

async function run(argv) {
  const { input, generator, outputBinding, outputTypedefs } = argv

  const schema = getSchemaFromInput(input)
  const args = {
    schema,
    inputSchemaPath: path.resolve(input),
    outputBindingPath: path.resolve(outputBinding),
  }
  const generatorInstance =
    generator === 'typescript'
      ? new TypescriptGenerator(args)
      : new Generator(args)
  const code = generatorInstance.render()

  mkdirp(path.dirname(outputBinding))
  fs.writeFileSync(outputBinding, code)

  if (outputTypedefs) {
    mkdirp(path.dirname(outputTypedefs))
    fs.writeFileSync(outputTypedefs, printSchema(schema))
  }

  console.log('Done generating binding')
}

function getSchemaFromInput(input) {
  if (input.endsWith('.graphql') || input.endsWith('.gql')) {
    throw new Error(
      'graphql-bindings 2.0 can only be generated based on an executable Schema exposed by a .js or .ts file',
    )
  }

  if (input.endsWith('.js') || input.endsWith('.ts')) {
    const schema = require(path.resolve(input))
    if (schema.default) {
      return schema.default
    }
    return schema
  }
}