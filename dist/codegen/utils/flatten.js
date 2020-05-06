'use strict'
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j]
    return r
  }
Object.defineProperty(exports, '__esModule', { value: true })
var flatten = function(chunks, executionContext) {
  return chunks.reduce(function(ruleSet, chunk) {
    /* Remove falsey values */
    if (
      chunk === undefined ||
      chunk === null ||
      chunk === false ||
      chunk === ''
    ) {
      return ruleSet
    }
    /* Flatten ruleSet */
    if (Array.isArray(chunk)) {
      return __spreadArrays(ruleSet, flatten(chunk, executionContext))
    }
    /* Either execute or defer the function */
    if (typeof chunk === 'function') {
      return executionContext
        ? ruleSet.concat.apply(
            ruleSet,
            flatten([chunk(executionContext)], executionContext),
          )
        : ruleSet.concat(chunk)
    }
    return ruleSet.concat(chunk.toString())
  }, [])
}
exports.default = flatten
//# sourceMappingURL=flatten.js.map
