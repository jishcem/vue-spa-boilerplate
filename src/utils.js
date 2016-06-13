import _ from 'lodash'

export default {
  getErrorArray (errors) {
    return _.flatten(_.reduce(errors, (result, value, key) => {
      result.push(value)
      return result
    }))
  }
}
