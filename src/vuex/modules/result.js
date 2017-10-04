import {
  SET_RESULTS,
  PREVIOUS_SET_RESULTS,
  GET_TABLE_INFO,
  GET_TABLE_HEADERS,
  UPDATE_LOAD_BODY,
  SET_TABLE_NAME
} from '../mutation-types'

import _ from 'lodash'

const state = {
  results: [],
  lastEvaluatedKey: {},
  headers: [],
  tableName: '',
  tableInfo: {},
  loadBody: false
}

const getters = {
  results: state => state.results,
  lastEvaluatedKey: state => state.lastEvaluatedKey,
  tableName: state => state.tableName,
  tableInfo: state => state.tableInfo,
  headers: state => state.headers,
  loadBody: state => state.loadBody
}

const mutations = {
  [SET_RESULTS] (state, results) {
    state.results = []
    var flattenResults = _.map(results['Items'], function (item) {
      return _.mapValues(item, function (ele) {
        if (typeof _.values(ele)[0] === 'object') {
          return JSON.stringify(_.values(ele)[0])
        } else {
          return _.values(ele)[0]
        }
      })
    })
    state.results = flattenResults

    state.tableName = results['tableName']
    state.lastEvaluatedKey = results['LastEvaluatedKey']
  },
  [SET_TABLE_NAME] (state, tableName) {
    state.tableName = tableName
  },
  [PREVIOUS_SET_RESULTS] (state, results) {
    state.results = results['Items']
    // var lastEvaluatedKey = state.evaluatedKeys.pop()
  },
  [GET_TABLE_INFO] (state, results) {
    state.tableInfo = results
  },
  [GET_TABLE_HEADERS] (state, results) {
    state.headers = []
    state.headers = results['Table']['KeySchema']
  },
  [UPDATE_LOAD_BODY] (state, flag) {
    state.loadBody = flag
  }
}

export default {
  state,
  getters,
  mutations
}
