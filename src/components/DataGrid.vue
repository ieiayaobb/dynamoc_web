<template>
  <div class="data-grid">
    <el-table
      :data="results"
      border
      height="460">
      <el-table-column
        fixed
        :prop="header['AttributeName']"
        :label="header['AttributeName']"
        :key="header['AttributeName']"
        v-for="header in headers"
        width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        :prop="normal_key"
        :label="normal_key"
        :key="normal_key"
        v-for="normal_key in normal"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        inline-template
        :context="_self"
        fixed="right"
        label="Operation"
        width="100">
        <span>
          <el-button @click.native.prevent="view($index)" type="text" size="mini">View</el-button>
          <!-- <el-button @click="deleteRecord" :disabled="true" type="text" size="mini">Delete</el-button> -->
        </span>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-button-group>
        <el-button type="primary" :disabled="true" size="small" icon="arrow-left" @click="prevPage">Prev</el-button>
        <el-button type="primary" size="small" @click="nextPage">Next<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import _ from 'lodash'

  export default {
    computed: {
      ...mapGetters({
        headers: 'headers',
        results: 'results',
        lastEvaluatedKey: 'lastEvaluatedKey'
      }),
      normal: function () {
        var normalKeys = []
        var freezedKeys = _.map(this.headers, function (header) {
          return header['AttributeName']
        })
        _.map(this.results, function (item) {
          normalKeys = _.union(normalKeys, _.keys(item))
        })
        return _.pullAll(_.uniq(normalKeys), freezedKeys)
      }
    },
    name: 'dataGrid',

    methods: {
      view (index) {
        var payload = {}
        var hashValue = this.results[index][this.headers[0]['AttributeName']]
        if (_.isNumber(hashValue)) {
          payload[this.headers[0]['AttributeName']] = {'N': hashValue}
        } else {
          payload[this.headers[0]['AttributeName']] = {'S': hashValue}
        }

        if (this.headers.length > 1) {
          var rangeValue = this.results[index][this.headers[1]['AttributeName']]
          payload[this.headers[1]['AttributeName']] = this.results[index][this.headers[1]['AttributeName']]
          if (_.isNumber(rangeValue)) {
            payload[this.headers[1]['AttributeName']] = {'N': rangeValue}
          } else {
            payload[this.headers[1]['AttributeName']] = {'S': rangeValue}
          }
        }

        payload['tableName'] = this.tableName
        this.$store.dispatch('getRecord', payload)
      },
      deleteRecord () {
      },
      prevPage (e) {
        // this.$store.dispatch('setPreviousResults', {
          // 'tableName': this.tableName
        // })
        console.log(this.$store.dispatch('popLastEvaluatedKey'))
      },
      nextPage (e) {
        // this.$store.dispatch('showLoading')
        this.$store.dispatch('setResults', {
          'tableName': this.tableName,
          'lastEvaluatedKey': this.lastEvaluatedKey
        })
        // this.$store.dispatch('hideLoading')
        this.$store.dispatch('pushLastEvaluatedKey', this.lastEvaluatedKey)
      }
    },
    props: {
      tableName: {
        type: String,
        required: false
      }
    },
    data () {
      return {
        proxy_results: []
      }
    },
    created () {
    },
    beforeUpdate () {
      // this.$store.dispatch('hideLoading')
      // console.log('DataGrid beforeUpdate')
    }
  }
</script>

<style scoped>
  .data-grid {
  }
  .key {
    width: 80px;
    display: inline-block;
  }

  .key>span {
    float: right;
  }

  .value {
    margin-left: 20px;
    display: inline-block;
  }

  .value>span {
    float: left;
  }

  .pagination {
    margin-top: 5px;
  }
</style>
