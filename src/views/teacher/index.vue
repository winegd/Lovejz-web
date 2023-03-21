<template>
  <div class="app-container">
    <div class="add_class">
      <el-button type="primary" @click="dialogFormVisible = true;is_add=true">添加<i
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
        prop="name"
        label="姓名"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="no"
        label="工号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="class"
        label="绑定班级"
        align="center"
        :formatter="handleClass"
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

    <el-dialog title="教师设置" :modal=true @close="close_dialog" :visible.sync="dialogFormVisible">
      <el-form label-width="80px" :model="form">
        <el-form-item label="序号">

          <el-input v-if="index!== '' " v-model="index" :disabled="false" readonly="readonly" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入用密码" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入用手机号" />
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="form.no" placeholder="请输入用工号" />
        </el-form-item>
        <el-form-item  label="角色">
          <el-input disabled v-model="form.role" placeholder="请输入工号" />
        </el-form-item>
        <el-form-item label="绑定班级">


          <el-checkbox-group v-model="checkedClsses" @change="handleCheckedClassesChange">
            <el-checkbox  v-for="(item,index) in classList"  :label="JSON.stringify(item)" >{{item.name}}</el-checkbox>

          </el-checkbox-group>
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
import { add_Tch, getTchList, delete_tch, update_tch } from '@/api/teacher'
import {  getList } from '@/api/class'
import { add_ucrelation, delete_ucrelation } from '@/api/ucrelation'

const defaultForm = {
  'name':'',
    'phone':'',
    'no':'',
    'role':'1',
    'class':''
}
export default {
  name: 'index',
  created() {
    new Promise((resolve, reject) => {
      this.fetchData()
    })
  },
  data(){
    return{
      is_add:false,
      listLoading:true,
      dialogFormVisible:false,
      classList:[],
      index:'',
      checkedClsses:[],
      list:[
        {
          'name':'',
          'phone':'',
          'no':'',
          'role':'1',
          'class':''
        }

      ],
      form: {
        'name':'',
        'phone':'',
        'no':'',
        'role':'1',
        'class':'',
      },
      submit_form:{
        'user':{},
        'checkedClsses':[]
      },
      current_class:[]
    }

  },
  methods:{
    boxchage(value){
      console.log(value)
    },
    close_dialog(){
      this.index = ''
      this.form = defaultForm
      this.is_add = false
      this.listLoading = false
      this.checkedClsses=[]
      this.current_class =[]
    },
    handleEdit(index,data) {
      this.index = index+1
      this.dialogFormVisible = true
      /*
      直接使用this.form=data 时，更改dialog数据table也会同步更改（浅拷贝）form和data是相同引用
      采用如下方式为 深拷贝 this.form = JSON.parse(JSON.stringify(data))
       */
      this.form = JSON.parse(JSON.stringify(data))

      let arr = []

      for(let i of data.class){
        arr.push(JSON.stringify(i))
      }
        this.checkedClsses = arr
        this.current_class =arr
        console.log(arr)


    },
    handleDelete(data) {
      this.$confirm(`确定要删除该账号(<span style='color:red'>${data.name}</span>)吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        delete_tch(data).then(res =>{
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
    },
    submit(form){
      this.listLoading = true
      if(this.is_add){
        this.submit_form.user = form
        this.submit_form.checkedClsses =this.checkedClsses
        console.log(this.submit_form)
        add_Tch(this.submit_form).then(res =>{
          console.log(res)
          this.list = res.data
          this.dialogFormVisible = false
          this.listLoading = false
        })
      }else{
        // console.log(this.checkedClsses,this.current_class)

        let check = this.checkedClsses
        let current = this.current_class
        if(check.length === current.length){
          update_tch(form).then(res=>{
            console.log(res)
            this.list = res.data
            this.dialogFormVisible = false
            this.listLoading = false
            this.list = res.data
          })
          console.log("修改信息")
        }else if(check.length > current.length){
          for(let c of current){
            let index = check.indexOf(c)
            console.log(index)
            if(index != -1){
              check.splice(index,1)
            }
          }
          add_ucrelation(this.to_ucRelation(check,form)).then(res =>{
            console.log(res)
            this.list = res.data
            this.dialogFormVisible = false
            this.listLoading = false
          })
          console.log('增加')
          console.log(check)
        }else {
          if(check.length === 0){
            console.log("全删")
            console.log(check)
            delete_ucrelation((this.to_ucRelation(current,form))).then(res =>{
              console.log(res)
              this.list = res.data
              this.dialogFormVisible = false
              this.listLoading = false
            })
          }else{
            let arr = []
            for(let c of current){
              let index = check.indexOf(c)
              console.log(index)
              if(index === -1){
                arr.push(c)
              }
            }
            delete_ucrelation(this.to_ucRelation(arr,form)).then(res =>{
              console.log(res)
              this.list = res.data
              this.dialogFormVisible = false
              this.listLoading = false
            })
            console.log('减少')
            console.log(arr)
            console.log(this.to_ucRelation(arr,form))
          }


        }

      }
    },
    fetchData() {
      let that = this
      this.listLoading = true
      getTchList().then(response => {
        console.log(response)
        this.list = response.data

        this.listLoading = false
      })
      getList().then(res =>{
        console.log(res)
        this.classList = res.data
      })
    },
    handleCheckedClassesChange(value) {
      console.log(this.checkedClsses)


    },
    handleClass(row){
      // console.log("table"+row.class)
      // console.log(row.class)
      let arr = []
      try {
      for (let i of row.class) {
        arr.push(i.name)
      }
        return arr.join(",")
      }catch (e){
        console.log(e)
      }


    },
    to_ucRelation(classes,form){
      let ucRelations = []
      for (let c of classes){
        let ucRelation={}
        let json_c = JSON.parse(c)
        ucRelation.userid = form.id
        ucRelation.classid = json_c.id

        ucRelations.push(ucRelation)
      }
      // console.log(ucRelations)
      return ucRelations
    }
  }
}
</script>

<style scoped>
.add_class {
  margin-bottom: 20px;
}
</style>
