<template>
  <el-dialog title="修改/添加 题目" width="60%"  :modal=true :visible="FormVisible" :before-close="handleClose">
    <el-form :model="form" ref="form" label-width="100px" class="form">
      <el-form-item>
        <el-cascader
          placeholder="请选择知识点"
          :options="chapters"
          :props="{ expandTrigger: 'hover' }"
          v-model="list"
         >

        </el-cascader>

        <el-select v-model="form.level" placeholder="选择难度" >
          <el-option
            v-for="item in grade"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-select v-model="form.type" placeholder="选择题型">
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

          <Tinymce :h="280" v-model="form.content"></Tinymce>


      </el-form-item>

      <el-form-item
        v-for="(option, index) in form.options"
        :label="'选项 ' + zimu[index]"
        :key="index"
        :prop="'options.' + index + '.value'"
      >
<!--        <div style="width: 600px;">-->
          <Tinymce v-model="option.content"></Tinymce>
<!--        </div>-->

        <el-button style="margin-right: 10px" type="danger" @click.prevent="removeOption(option)">删除</el-button>

        <el-checkbox  v-model="option.isCorrect" label="正确答案"></el-checkbox>
      </el-form-item>
      <el-form-item
        prop="email"
        label="解析"
      >
          <Tinymce :h="230" v-model="form.analysis"></Tinymce>


      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitform">提交</el-button>
        <el-button type="primary" @click="submitNoClose">提交不关闭</el-button>
        <el-button @click="addOption">新增选项</el-button>
        <el-button @click="resetform()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import Tinymce from '@/components/Tinymce/index.vue'
import { getList } from '@/api/chapter'
import { addQuestion } from '@/api/question'
import { deleteOption } from '@/api/option'
const default_form = {
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
    content: '',
    level:null,
    type:null,
    analysis:'',
    knowledgeId:null
}
export default {
  components: { Tinymce },
  props:{
    visible:{
      type: Boolean,
      default: false,
    },
    data:{
    },
    select_knowledge:null

  },
  created() {
    this.getChapterList()
  },
  data(){
    return{
      FormVisible:this.visible,
      form: {
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
        content: '',
        level:null,
        type:null,
        analysis:'',
        knowledgeId:null
      },
      chapters:null,
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
      list:null,
      grade_select:null,
      type_select:null,
      zimu:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T']
    }
  },
  watch:{
    visible(newValue){
      this.FormVisible = newValue
    },
    data(newValue){
      for(let i of newValue.options){
        i.isCorrect = i.isCorrect === 1;
      }
      this.form = newValue


    },
    select_knowledge(val){
      this.list = val
    },

  },
  methods:{

    handleClose(){
      this.resetform()
      this.$emit('resetDialog')
    },
    submitNoClose(){
        if(this.list !=null && this.form.type!=null && this.form.level!=null){

          if(this.form.content.length ===0){
            this.$message({
              message: '题目不能为空',
              type: 'warning',
              customClass:"messageClass"
            });
          }else{
            let options = this.form.options
            if(options.length === 0){
              this.$message({
                message: '请添加选项',
                type: 'warning',
                customClass:"messageClass"
              });
            }else{
              let answer =false
              let option =0
              for(let i=0;i<options.length;i++){
                if(options[i].isCorrect){
                  option = option + 1
                }
                if(options[i].content.length === 2){
                  answer = false
                  this.$message({
                    message: '选项'+this.zimu[i]+'为空',
                    type: 'warning',
                    customClass:"messageClass"
                  });
                }else {
                  answer = true
                }
              }
              if(answer){
                if(option === 0){
                  this.$message({
                    message: '此题没有选择正确答案',
                    type: 'warning',
                    customClass:"messageClass"
                  });
                }else{
                  if( option ===1 && this.form.type === 0){

                    this.addQuestionNoClose()
                  }else if(option >=2 && this.form.type === 1){

                    this.addQuestionNoClose()
                  }else{
                    this.$message({
                      message: '题型和正确选项不匹配',
                      type: 'warning',
                      customClass:"messageClass"
                    });
                  }

                }

              }
            }


          }
        }else{
          this.$message({
            message: '请选择 知识点/难度/题型',
            type: 'warning',
            customClass:"messageClass"
          });
        }

    },
    submitform() {

        if(this.list !=null && this.form.type!=null && this.form.level!=null){

          if(this.form.content.length ===0){
            this.$message({
              message: '题目不能为空',
              type: 'warning',
              customClass:"messageClass"
            });
          }else{
            let options = this.form.options
            if(options.length === 0){
              this.$message({
                message: '请添加选项',
                type: 'warning',
                customClass:"messageClass"
              });
            }else{
              let answer =false
              let option =0
              for(let i=0;i<options.length;i++){
                if(options[i].isCorrect){
                  option = option + 1
                }
                if(options[i].content.length === 2){
                  answer = false
                  this.$message({
                    message: '选项'+this.zimu[i]+'为空',
                    type: 'warning',
                    customClass:"messageClass"
                  });
                }else {
                  answer = true
                }
              }
              if(answer){
                  if(option === 0){
                    this.$message({
                      message: '此题没有选择正确答案',
                      type: 'warning',
                      customClass:"messageClass"
                    });
                  }else{
                    if( option ===1 && this.form.type === 0){
                      console.log(this.form)
                      this.addQuestion()
                    }else if(option >=2 && this.form.type === 1){
                      console.log(this.form)
                      this.addQuestion()
                    }else{
                      this.$message({
                        message: '题型和正确选项不匹配',
                        type: 'warning',
                        customClass:"messageClass"
                      });
                    }

                }

              }
            }


          }
        }else{
          this.$message({
            message: '请选择 知识点/难度/题型',
            type: 'warning',
            customClass:"messageClass"
          });
        }



    },
    resetform() {
      this.form.options = default_form.options
      this.form.content = ''
      this.form.analysis = ''
    },
    removeOption(item) {
      var index = this.form.options.indexOf(item)

      if (index !== -1) {
        this.form.options.splice(index, 1)
        if(item.id !== undefined){
          deleteOption(item.id).then(res=>{
            this.$message({
              message: res.data,
              type: 'success',
              customClass:"messageClass"
            });
          })
        }
      }
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
      let form = JSON.parse(JSON.stringify(this.form))

      form.knowledgeId = this.list[1]
      console.log(form)
      addQuestion(form).then(res =>{
        this.resetform()
        this.$emit('submit_question', res.data)
      })
    },
    addQuestionNoClose(){
      console.log(this.form)
      let form = JSON.parse(JSON.stringify(this.form))
      form.knowledgeId = this.list[1]
      addQuestion(form).then(res =>{
        this.resetform()
        this.$emit('submit_question_noclose', res.data)

      })
    },
    async getChapterList(){
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
        this.chapters = data

      })
    },
  }
}
</script>

<style scoped>

</style>
