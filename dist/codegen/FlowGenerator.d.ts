import { Generator } from './Generator'
import {
  GraphQLSchema,
  GraphQLUnionType,
  GraphQLInterfaceType,
  GraphQLInputObjectType,
  GraphQLInputField,
  GraphQLField,
  GraphQLInputType,
  GraphQLOutputType,
  GraphQLScalarType,
  GraphQLEnumType,
  GraphQLFieldMap,
  GraphQLObjectType,
} from 'graphql'
import { Maybe } from './types'
export declare class FlowGenerator extends Generator {
  scalarMapping: {
    Int: string
    String: string
    ID: string
    Float: string
    Boolean: string
    DateTime: string
  }
  graphqlRenderers: {
    GraphQLUnionType: (type: GraphQLUnionType) => string
    GraphQLObjectType: (
      type:
        | GraphQLObjectType<any, any>
        | GraphQLInterfaceType
        | GraphQLInputObjectType,
    ) => string
    GraphQLInterfaceType: (
      type:
        | GraphQLObjectType<any, any>
        | GraphQLInterfaceType
        | GraphQLInputObjectType,
    ) => string
    GraphQLInputObjectType: (
      type:
        | GraphQLObjectType<any, any>
        | GraphQLInterfaceType
        | GraphQLInputObjectType,
    ) => string
    GraphQLScalarType: (type: GraphQLScalarType) => string
    GraphQLIDType: (type: GraphQLScalarType) => string
    GraphQLEnumType: (type: GraphQLEnumType) => string
  }
  constructor({
    schema,
    inputSchemaPath,
    outputBindingPath,
    isDefaultExport,
  }: {
    schema: GraphQLSchema
    inputSchemaPath: string
    outputBindingPath: string
    isDefaultExport: boolean
  })
  render(): string
  renderExports(): string
  renderQueries(): string
  renderMutations(): string
  renderSubscriptions(): string
  getTypeNames(): string[]
  renderTypes(): string
  renderMainMethodFields(
    operation: string,
    fields: GraphQLFieldMap<any, any>,
  ): string
  getPayloadType(operation: string, type: string): string
  renderInterfaceOrObject(
    type: GraphQLObjectType | GraphQLInputObjectType | GraphQLInterfaceType,
  ): string
  renderFieldName(field: GraphQLInputField | GraphQLField<any, any>): string
  renderFieldType(type: GraphQLInputType | GraphQLOutputType): string
  renderInputFieldType(type: GraphQLInputType | GraphQLOutputType): any
  renderTypeWrapper(
    typeName: string,
    typeDescription: Maybe<string>,
    fieldDefinition: string,
  ): string
  renderObjectWrapper(
    typeName: string,
    typeDescription: Maybe<string>,
    objects: GraphQLObjectType[],
    fieldDefinition: string,
  ): string
  renderInterfaceWrapper(
    typeName: string,
    typeDescription: Maybe<string>,
    interfaces: GraphQLInterfaceType[],
    fieldDefinition: string,
  ): string
  renderDescription(description: Maybe<string>): string
  renderImports(): string
}
