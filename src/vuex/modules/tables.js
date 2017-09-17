import {
  LIST_TABLES,
  DELETE_TABLE
} from '../mutation-types'

const state = {
  tables: []
}

const getters = {
  tables: state => state.tables
}

const mutations = {
  [LIST_TABLES] (state, response) {
    state.tables = response['TableNames']
  },
  [DELETE_TABLE] (state) {

  }
}

export default {
  state,
  getters,
  mutations
}
