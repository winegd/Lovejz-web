<template>
  <div class="app-container">
    <div class="add_class">
      <el-button type="primary" @click="dialogFormVisible = true">添加<i
        class="el-icon-plus el-icon--right"
      /></el-button>
    </div>

    <el-table
      :data="list"
      border
      v-loading="listLoading"
      style="width: 100%"
    >

      <el-table-column
        fixed
        type="index"
        label="序号"
        width="100px"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="year"
        label="年度"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop="name"
        label="班级"
        align="center"
        >
      </el-table-column>
      <el-table-column

        label="操作"
        align="center"
        >
        <template v-slot="scope">
          <el-button  size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button  size="mini" @click="handleDelete(scope.row)" type="danger">删除</el-button>

        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="班级设置"  :modal=true :visible.sync="dialogFormVisible">
      <el-form label-width="80px" :model="form">
        <el-form-item label="序号">

          <el-input v-if="index!== '' " v-model="index" :disabled="false" readonly="readonly" />
        </el-form-item>
        <el-form-item label="年度">
          <el-input v-model="form.year" placeholder="例如：2019" />
        </el-form-item>
        <el-form-item label="班级名称">
          <el-input v-model="form.name" placeholder="例如：计科19-2" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;index='';">取 消</el-button>
        <el-button type="primary" @click="submit(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addOrUpdate_class, delete_class, getList } from '@/api/class'
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
      list: [],
      listLoading: true,
      dialogFormVisible: false,
      form: {
        year:'',
        name: ''
      },
      index: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    submit(form){
      addOrUpdate_class(form).then(res=>{
        this.list = res.data
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      })
      this.dialogFormVisible = false
      this.form = {}
    },
    fetchData() {
      let that = this
      this.listLoading = true
      getList().then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
      })
    },
    handleEdit(index,data) {
      this.index = index+1
      this.dialogFormVisible = true
      /*
      直接使用this.form=data 时，更改dialog数据table也会同步更改（浅拷贝）form和data是相同引用
      采用如下方式为 深拷贝 this.form = JSON.parse(JSON.stringify(data))
       */
      this.form = JSON.parse(JSON.stringify(data))
      console.log(index,data)
    },
    handleDelete(data) {
      this.$confirm(`确定要删除该班级(<span style=\'color:red\'>${data.name}</span>)吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        delete_class(data).then(res =>{
          this.list=res.data
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      console.log(data)
    }

  }
}
</script>

<style scoped>
  .add_class {
    margin-bottom: 20px;
  }
</style>
