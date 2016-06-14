import {flatten, reduce} from 'lodash'

export default {
  getErrorArray (errors) {
    return flatten(reduce(errors, (result, value, key) => {
      result.push(value)
      return result
    }))
  }
}
