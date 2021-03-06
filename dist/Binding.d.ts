import {
  QueryMap,
  MutationMap,
  BindingOptions,
  SubscriptionMap,
  QueryOrMutation,
} from './types'
import { Delegate } from './Delegate'
export declare class Binding extends Delegate {
  query: QueryMap
  mutation: MutationMap
  subscription: SubscriptionMap
  constructor({
    schema,
    fragmentReplacements,
    before,
    disableCache,
  }: BindingOptions)
  buildMethods(): any
  buildQueryMethods(operation: QueryOrMutation): QueryMap
  buildSubscriptionMethods(): SubscriptionMap
}
