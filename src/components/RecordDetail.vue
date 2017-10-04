<template>
  <div>
    <el-dialog :title="tableName" v-model="show" @close="close">
      <el-tabs v-model="activeTab" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="Detail" name="detail">
          <el-form label-position="right" label-width="150px">
            <el-form-item :label="key" v-for="(key, type) in primaryKey" :key="key">
              <el-input auto-complete="off" :value="record[key]" disabled></el-input>
            </el-form-item>
            <el-form-item :label="key" v-for="(value, key) in freeRecord" :key="key">
              <el-input auto-complete="off" @change="updateItem(value, key)" :value="value"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="JSON" name="json">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2}"
            v-model="renderRecord">
          </el-input>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="save">Save</el-button>
        <el-button type="danger" @click="deleteItem">Delete</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import _ from 'lodash'

  export default {
    name: 'RecordDetail',
    computed: {
      ...mapGetters({
        primaryKey: 'primaryKey',
        show: 'recordShow',
        record: 'record'
      }),
      renderRecord: function () {
        return JSON.stringify(this.record, null, 4)
      },
      freeRecord: function () {
        var deep = _.cloneDeep(this.record)
        for (var key in this.primaryKey) {
          delete deep[this.primaryKey[key]]
        }
        return deep
      }
    },
    data () {
      return {
        inputRecord: {},
        activeTab: 'detail'
      }
    },
    props: {
      tableName: {
        type: String,
        required: false
      }
    },
    updated () {
    },
    methods: {
      handleClick (tab, event) {
        // console.log(tab, event)
      },
      close () {
        this.$store.dispatch('hideRecord')
      },
      save () {
        console.log(this.inputRecord)
      },
      deleteItem () {
      },
      updateItem (value, key) {
        console.log(value, key)
      }
    },
    watch: {
      value: function (val, oldVal) {
        // console.log(val)
      }
    }
  }
</script>
<style scoped>
  .tabs {
    /* width: 450px; */
  }
</style>
