<template>
  <div class="framework">
    <navibar></navibar>
    <el-row :gutter="20" class="content">
      <el-col :span="4" class="left">
        <tableList></tableList>
      </el-col>
      <el-col :span="20" class="right" v-loading.body="loading">
        <tableData></tableData>
      </el-col>
    </el-row>
    <connect></connect>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Navibar from './Navibar'
  import TableData from './TableData'
  import Connect from './Connect'
  import TableList from './TableList'

  export default {
    name: 'framework',
    computed: mapGetters({
      loading: 'loading'
    }),
    components: {
      Navibar, TableData, Connect, TableList
    },
    methods: {
      handleOpen () {

      },
      handleClose () {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.framework {
  height: 100vh;
}

.pagination {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
}

.content, .left, .right {
  height: 100%;
}
</style>
