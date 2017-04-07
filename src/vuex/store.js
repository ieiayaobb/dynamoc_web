import Vuex from 'vuex'
import Vue from 'vue'
import connect from './modules/connect'
import result from './modules/result'
import tables from './modules/tables'
import keys from './modules/keys'
import records from './modules/records'
import loading from './modules/loading'
import evaluatedKey from './modules/evaluatedKey'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    connect,
    result,
    tables,
    keys,
    records,
    loading,
    evaluatedKey
  },
  strict: true
})
