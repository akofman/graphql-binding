import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { Transform } from 'graphql-tools-fork'
export declare type Operation = 'query' | 'mutation' | 'subscription'
export declare type QueryOrMutation = 'query' | 'mutation'
export interface FragmentReplacement {
  field: string
  fragment: string
}
export interface QueryMap {
  [rootField: string]: (
    args?: {
      [key: string]: any
    },
    info?: GraphQLResolveInfo | string,
    context?: {
      [key: string]: any
    },
  ) => Promise<any>
}
export declare type MutationMap = QueryMap
export interface SubscriptionMap {
  [rootField: string]: (
    args?: any,
    info?: GraphQLResolveInfo | string,
    context?: {
      [key: string]: any
    },
  ) => AsyncIterator<any> | Promise<AsyncIterator<any>>
}
export interface BindingOptions {
  fragmentReplacements?: FragmentReplacement[]
  schema: GraphQLSchema
  before?: () => void
  disableCache?: boolean
}
export interface BindingWithoutSchemaOptions {
  fragmentReplacements?: FragmentReplacement[]
  before?: () => void
}
export interface Args {
  [key: string]: any
}
export interface Context {
  [key: string]: any
}
export interface Options {
  transforms?: Transform[]
  context?: Context
}
