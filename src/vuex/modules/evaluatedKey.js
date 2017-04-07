import {
  PUSH_LAST_EVALUATED_KEY,
  POP_LAST_EVALUATED_KEY
} from '../mutation-types'

const state = {
  evaluatedKeys: []
}

const getters = {
  evaluatedKeys: state => state.evaluatedKeys
}

const mutations = {
  [PUSH_LAST_EVALUATED_KEY] (state, result) {
    state.evaluatedKeys.push(result)
  },
  [POP_LAST_EVALUATED_KEY] (state) {
    return state.evaluatedKeys.pop()
  }
}

export default {
  state,
  getters,
  mutations
}
