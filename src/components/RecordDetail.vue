<template>
  <div>
    <el-dialog :title="tableName" v-model="show" @close="close">
      <el-tabs v-model="activeTab" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="Detail" name="detail">
          <el-form label-position="right" label-width="150px">
            <el-form-item :label="key" v-for="(value, key) in record" :key="key">
              <el-input auto-complete="off" :value="value"></el-input>
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

  export default {
    name: 'RecordDetail',
    computed: {
      ...mapGetters({
        show: 'recordShow',
        record: 'record'
      }),
      renderRecord: function () {
        return JSON.stringify(this.record, null, 4)
      }
    },
    data () {
      return {
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
      },
      deleteItem () {
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
