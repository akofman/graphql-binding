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
var graphql_1 = require('graphql')
function isScalar(t) {
  if (
    t instanceof graphql_1.GraphQLScalarType ||
    t instanceof graphql_1.GraphQLEnumType
  ) {
    return true
  }
  if (
    t instanceof graphql_1.GraphQLObjectType ||
    t instanceof graphql_1.GraphQLInterfaceType ||
    t instanceof graphql_1.GraphQLUnionType ||
    t instanceof graphql_1.GraphQLList
  ) {
    return false
  }
  var nnt = t
  if (nnt instanceof graphql_1.GraphQLNonNull) {
    if (
      nnt.ofType instanceof graphql_1.GraphQLScalarType ||
      nnt.ofType instanceof graphql_1.GraphQLEnumType
    ) {
      return true
    }
  }
  return false
}
exports.isScalar = isScalar
function getTypeForRootFieldName(rootFieldName, operation, schema) {
  if (operation === 'mutation' && !schema.getMutationType()) {
    throw new Error("Schema doesn't have mutation type")
  }
  if (operation === 'subscription' && !schema.getSubscriptionType()) {
    throw new Error("Schema doesn't have subscription type")
  }
  var rootType =
    {
      query: function() {
        return schema.getQueryType()
      },
      mutation: function() {
        return schema.getMutationType()
      },
      subscription: function() {
        return schema.getSubscriptionType()
      },
    }[operation]() || undefined
  var rootField = rootType.getFields()[rootFieldName]
  if (!rootField) {
    throw new Error('No such root field found: ' + rootFieldName)
  }
  return rootField.type
}
exports.getTypeForRootFieldName = getTypeForRootFieldName
function forwardTo(bindingName) {
  return function(parent, args, context, info) {
    var message =
      "Forward to '" +
      bindingName +
      '.' +
      info.parentType.name.toLowerCase() +
      '.' +
      info.fieldName +
      "' failed. "
    if (context[bindingName]) {
      if (
        context[bindingName][info.parentType.name.toLowerCase()][info.fieldName]
      ) {
        return context[bindingName][info.parentType.name.toLowerCase()][
          info.fieldName
        ](args, info)
      } else {
        message +=
          "Field '" +
          info.parentType.name.toLowerCase() +
          '.' +
          info.fieldName +
          "' not found on binding '" +
          bindingName +
          "'."
      }
    } else {
      message += "Binding '" + bindingName + "' not found."
    }
    throw new Error(message)
  }
}
exports.forwardTo = forwardTo
function printDocumentFromInfo(info) {
  var fragments = Object.keys(info.fragments).map(function(fragment) {
    return info.fragments[fragment]
  })
  var doc = {
    kind: 'Document',
    definitions: __spreadArrays(
      [
        {
          kind: 'OperationDefinition',
          operation: 'query',
          selectionSet: info.fieldNodes[0].selectionSet,
        },
      ],
      fragments,
    ),
  }
  return graphql_1.print(doc)
}
exports.printDocumentFromInfo = printDocumentFromInfo
//# sourceMappingURL=index.js.map
