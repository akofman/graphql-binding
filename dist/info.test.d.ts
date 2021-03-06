import { ExecutionContext } from 'ava'
import { SelectionNode } from 'graphql'
export declare function assertFields(
  t: ExecutionContext,
  selections: ReadonlyArray<SelectionNode>,
  names: string[],
): void
