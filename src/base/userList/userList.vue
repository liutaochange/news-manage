<template>
  <div class="userList">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label='ID'>
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户权限" align="center">
        <template slot-scope="scope">
          {{scope.row.permission}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next, jumper"
      :total="totalPage">
    </el-pagination>
  </div>
</template>

<script>
import {getUserList} from 'api/index'
export default {
  name: 'userList',
  data () {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      totalPage: 0
    }
  },
  created () {
    this._getUserList()
  },
  methods: {
    _getUserList () {
      getUserList(this.currentPage, this.pagesize).then((res) => {
        console.log(res)
        if (res.data.code === 0) {
          this.list = res.data.list
          this.listLoading = false
          const pager = res.data.page
          this.currentPage = Number(pager.currentPage)
          this.pageSize = Number(pager.pageSize)
          this.totalPage = Number(pager.totalPage)
        }
      })
    },
    handleSizeChange (size) {
      this.pagesize = size
      // this._getUserList()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      // this._getUserList()
    }
  }
}
</script>

<style scoped lang="less">

</style>
