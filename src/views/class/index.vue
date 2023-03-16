<template>
  <div class="app-container">
    <div class="add_class">
      <el-button type="primary" @click="dialogFormVisible = true">添加<i
        class="el-icon-plus el-icon--right"
      /></el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="Title" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column> -->
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="班级设置" :visible.sync="dialogFormVisible">
      <el-form label-width="80px" :model="form">
        <el-form-item label="序号">

          <el-input v-if="index!= '' " v-model="index" :disabled="false" readonly="readonly" />
        </el-form-item>
        <el-form-item label="班级名称">
          <el-input v-model="form.name" placeholder="例如：计科19-2" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;index=''">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;index=''">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/class'
// import dia from '@/views/dia/index.vue'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      form: {
        name: ''
      },
      index: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
      })
    },
    handleEdit(index, data) {
      this.index = index
      this.dialogFormVisible = true
      console.log(index, data)
    },
    handleDelete(index, data) {
      this.$confirm('确定要删除该班级(' + data.name + ')吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      console.log(index, name)
    }

  }
}
</script>

<style scoped>
  .add_class {
    margin-bottom: 20px;
  }
</style>
