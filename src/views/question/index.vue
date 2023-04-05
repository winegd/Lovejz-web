<template>
  <div class="app-container">
    <div class="add_class">
        <el-button type="primary" @click="add_question" >添加题目<i
            class="el-icon-plus el-icon--right"
          /></el-button>
      <div style="width:200px;margin-left: 20px" >
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          @keyup.enter.native="search_data"
          v-model="search_input">
        </el-input>
      </div>


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
        width="50px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="类型"
        width="80px"
        align="center"
      >
        <template v-slot="scope">
          <div  v-if="scope.row.type === 0" >单选题</div>
          <div v-else-if="scope.row.type === 1">多选题</div>
        </template>

      </el-table-column>
      <el-table-column

        label="题目"
        align="center"
      >
        <template v-slot="scope">
          <div  v-html="scope.row.content" ></div>
        </template>
      </el-table-column>
      <el-table-column
        label="选项"
        align="center"
      >
        <template v-slot="scope">
          <div v-for="item in  scope.row.options">

            <div  v-html="item.content" ></div>

          </div>

        </template>
      </el-table-column>

      <el-table-column
        label="正确答案"
        align="center"
      >
        <template v-slot="scope">
          <div v-for="item in  scope.row.options">

            <div v-if="item.isCorrect === 1" v-html="item.content" ></div>

          </div>

        </template>
      </el-table-column>


      <el-table-column
        prop="name"
        label="解析"
        align="center"
      >
        <template v-slot="scope">
          <div  v-html="scope.row.analysis" ></div>
        </template>
      </el-table-column>
      <el-table-column

        label="操作"
        align="center"
      >
        <template v-slot="scope">
          <el-button  size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button  size="mini" @click="handleDelete(scope.row)" type="danger">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <div  style="margin-top:20px;margin-bottom:20px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10,20, 50, 100, 200]"
        :page-size="pageSize"
        layout="->, total, sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <QuestionDialog :visible="visible" :data="form" :select_knowledge="select_knowledge" @submit_question_noclose="submit_question_noclose"  @submit_question="submit_question" @resetDialog="resetDialog"></QuestionDialog>

  </div>

</template>

<script>
import QuestionDialog from '@/components/QuestionDialog'
import { deleteQuestions, getQuestions, getQuestionTotal, searchQuestions } from '@/api/question'
import { getList } from '@/api/chapter'
import { get_chapterid } from '@/api/knowledge'




export default {
  components: {
    QuestionDialog
  },
  created(){
    // this.fetchData()
    this.handleCurrentChange()


  },
  data() {
    return{
      total:null,
      currentPage:1,
      pageSize:10,
      list:[],
      listLoading:false,
      visible:false,
      form:null,
      chapters:[],
      search_input:null,
      select_knowledge:null

    }
  },

  methods: {
    search_data(){
      if(this.search_input == null){
        this.$message({
          type: 'warning',
          message: '请输入数据'
        })
      }
      else{
        this.listLoading = true
        this.handleCurrentChange()

        console.log(this.search_input)
      }

    },
    submit_question(val){
      this.handleCurrentChange()
      this.resetDialog()
      this.$message({
        message: val,
        type: 'success'
      });
    },
    submit_question_noclose(val){
      this.handleCurrentChange()
      this.$message({
        message: val,
        type: 'success'
      });
    },
    handleDelete(data){
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteQuestions(data.id).then(res =>{
          this.fetchData()
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
    },
    resetDialog(){
      this.visible = false
    },
    handleEdit(data){
      let that = this
      console.log(data)
      this.form = JSON.parse(JSON.stringify(data))
      get_chapterid(data.knowledgeId).then(res =>{
        let chapter_id = res.data
        that.select_knowledge = [chapter_id,data.knowledgeId]
        // data.knowledgeId = [chapter_id,data.knowledgeId]
        // that.form = JSON.parse(JSON.stringify(data))
        that.visible=true
      })

    },
    async fetchData(){
      this.listLoading = true
      getQuestions(this.currentPage,this.pageSize).then(res=>{
        this.list = res.data.list
        this.total = res.data.total
        this.listLoading = false
      })
    },
    add_question(){
    // this.$route.path('/addquestion')
      this.visible=true
    },
    handleSizeChange(pagesize) {
      // this.pageSize = pagesize
      this.listLoading = true
      if(this.search_input == null || this.search_input === ''){
        getQuestions(this.currentPage,pagesize).then(res=>{
          this.list = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      }else{
        searchQuestions(this.currentPage,pagesize,this.search_input).then(res=>{
          this.list = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      }

    },
    handleCurrentChange(current_page) {
      // this.currentPage = current_page
      // console.log(current_page)
      this.listLoading = true
      if(this.search_input == null || this.search_input === ''){
        getQuestions(this.currentPage,this.pageSize).then(res=>{
          this.list = res.data.list
          this.total = res.data.total
          this.listLoading = false
          console.log(res.data.list)
        })
      }else{
        searchQuestions(this.currentPage,this.pageSize,this.search_input).then(res=>{
          this.list = res.data.list
          this.total = res.data.total
          this.listLoading = false
        })
      }

    },

  },




}
</script>

<style scoped>
.add_class {
  margin-bottom: 20px;
  display: flex;
  flex-direction:row;
}
.editor{
  /*width:700px;*/
  /*height:200px;*/
}


</style>
