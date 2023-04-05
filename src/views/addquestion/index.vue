<template>
  <div class="editor">
    <el-form :model="form" ref="form" label-width="100px" class="form">
      <el-form-item>
        <el-cascader
          placeholder="请选择知识点"
          :options="list"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange">

        </el-cascader>

        <el-select v-model="grade_select" placeholder="选择难度" >
          <el-option
            v-for="item in grade"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-select v-model="type_select" placeholder="选择题型">
          <el-option
            v-for="item in type"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="email"
        label="题目"
      >
        <div style="margin-right: 20px">
          <Tinymce v-model="form.question"></Tinymce>
        </div>

      </el-form-item>

        <el-form-item
          v-for="(option, index) in form.options"
          :label="'选项 ' + zimu[index]"
          :key="option.key"
          :prop="'options.' + index + '.value'"
        >
          <div style="width: 600px;">
            <Tinymce v-model="option.content"></Tinymce>
          </div>

          <el-button style="margin-right: 10px" type="danger" @click.prevent="removeOption(option)">删除</el-button>
          <el-checkbox v-model="option.isCorrect"  label="正确答案"></el-checkbox>
        </el-form-item>
      <el-form-item
        prop="email"
        label="解析"
      >
        <div style="margin-right: 20px">
          <Tinymce v-model="form.analysis"></Tinymce>
        </div>

      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="submitform">提交</el-button>
        <el-button @click="addOption">新增选项</el-button>
        <el-button @click="resetform()">重置</el-button>
      </el-form-item>
    </el-form>


  </div>

</template>

<script>


import Tinymce from '@/components/Tinymce'
import { getChapters, getList } from '@/api/chapter'
import { addQuestion } from '@/api/question'
const options= [
    {
      content:'A.',
      isCorrect:false
    },
    {
      content: 'B.',
      isCorrect:false
    },
    {
      content: 'C.',
      isCorrect:false
    },
    {
      content: 'D.',
      isCorrect:false
    }
  ]

export default {
  components: {
    Tinymce
  },
  created(){
    this.getChapterList()
  },
  data() {
    return{
      form:{
        options: [
          {
            content:'A.',
            isCorrect:false
          },
          {
            content: 'B.',
            isCorrect:false
          },
          {
            content: 'C.',
            isCorrect:false
          },
          {
            content: 'D.',
            isCorrect:false
          }
        ],
        question: '',
        level:null,
        type:null,
        analysis:'',
        knowledgeId:null
      },
      list:[],
      knowledge_id:null,
      grade:[
        {
          value:0,
          label:'基础'
        },
        {
          value:1,
          label:'适中'
        },
        {
          value:2,
          label:'提高'
        },
      ],
      type:[
        {
          value:0,
          label:'单选'
        },
        {
          value:1,
          label:'多选'
        }

      ],
      grade_select:null,
      type_select:null,
      zimu:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T']



    }
  },

  methods: {
    handleChange(val){
      this.form.knowledgeId = val[1]
    },
    getChapterList(){
      getList().then( res =>{
        // this.list = res.data
        let data = []
        for (let i of res.data){
          let tmp={}
          tmp.value = i.chapter.id
          tmp.label = i.chapter.name
          let ch = []
          for(let j of i.list){
            let t = {}
            t.label = j.name
            t.value = j.id
            ch.push(t)
          }
          tmp.children = ch
          data.push(tmp)
        }
        this.list = data
        console.log(data)

      })
    },
    submitform() {
      // console.log(this.form)
      if(this.form.knowledgeId !=null && this.type_select!=null && this.grade_select!=null){

        if(this.form.question.length ===0){
          this.$message({
            message: '题目不能为空',
            type: 'warning'
          });
        }else{
          let options = this.form.options
          if(options.length === 0){
            this.$message({
              message: '请添加选项',
              type: 'warning'
            });
          }else{
            let answer =false
            let option =false
            for(let i=0;i<options.length;i++){
              if(options[i].isCorrect){
                option = true
              }
              if(options[i].content.length === 2){
                answer = false
                this.$message({
                  message: '选项'+this.zimu[i]+'为空',
                  type: 'warning'
                });
              }else {
                answer = true
              }
            }

            if(answer){
              if(option){
                console.log(this.form)
                this.addQuestion()
              }else{
                this.$message({
                  message: '此题可能没有选择正确答案',
                  type: 'warning'
                });
              }
            }
          }


        }
      }else{
        this.$message({
          message: '请选择 知识点/难度/题型',
          type: 'warning'
        });
      }

    },
    resetform() {
      this.form.options = options
      this.form.question = ''
      this.form.analysis = ''
    },
    removeOption(item) {
      var index = this.form.options.indexOf(item)
      if (index !== -1) {
        this.form.options.splice(index, 1)
      }
      // for(let i = 0; i < this.form.options.length;i++){
      //   let con = this.form.options[i].content
      //   this.form.options[i].content = this.zimu[i]+'.'+con.substring(2,con.length)
      // }
    },
    addOption() {
      let len = this.form.options.length
      this.form.options.push({
        content: this.zimu[len]+'.',
        isCorrect:false,
        // key: Date.now()
      });
    },
    addQuestion(){
      addQuestion(this.form).then(res =>{
        this.$message({
          message: res.data,
          type: 'success'
        });
      })
    }
  },
  watch:{
    grade_select(newValue){
      this.form.level = newValue
    },
    type_select(newValue){
      this.form.type = newValue
    }

}




}
</script>

<style scoped>
.form{
  margin-top:10px
}
.editor{

}

</style>
