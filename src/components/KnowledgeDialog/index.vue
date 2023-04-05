<template>
  <div>
    <el-dialog title="修改/添加 知识点"  :modal=true :visible="FormVisible" :before-close="handleClose">
      <el-form label-width="80px" :model="form">
        <el-form-item label="章节">
          <el-select v-model="selecte" placeholder="请选择"
                     @change="change">
            <el-option
              v-for="item in chapter"
              :key="item.id"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="名称">
          <el-input v-model="form.name"  />
        </el-form-item>
        <el-form-item label="是否重要">
          <el-input v-model="form.isImportant"  />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"  />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="Cancel">取 消</el-button>
        <el-button type="primary" @click="submit(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>


</template>

<script>
import { addKnowledge, addOrUpdate, updateKnowledge } from '@/api/knowledge'
import { getChapters, getList } from '@/api/chapter'

export default {
  name: 'index',
  created() {
  // this.getchapters()
  },
  props:{
    visible:{
      type: Boolean,
      default: false,
    },
    data:{
      default:{
        chapterId:'',
        description:null,
        id:'',
        isImportant:'',
        name:''
      }
    },
    f:{
      default:0
    },
    chapters:{
      default:[]
    },
    selected:{
      default:null
    }
  },
  data(){
    return{
      FormVisible:this.visible,
      form:this.data,
      chapter:[],
      selecte:null,
      flag:0,
      chapter_id : null
    }
  },
  methods:{
    submit(form) {
      let that = this
      if (this.flag === 0) {
        updateKnowledge(form).then(res => {
          this.$emit('submit_knowledge', res.data)
        })
      } else if (this.flag === 1) {
        let data = {}
        for (let i of this.chapters) {
          if (i.name === this.selecte) {
            data.chapterId = i.id
          }
        }
        data.name = this.form.name
        data.description = this.form.description
        data.isImportant = this.form.isImportant
        console.log(data)
        addKnowledge(data).then(res => {
          this.$emit('submit_knowledge', res.data)
        })
      }

    },
    Cancel () {
      this.$emit('resetPopupData')
    },
    handleClose(){
      this.$emit('resetPopupData')

    },
    // getchapters(){
    //   getChapters().then(res =>{
    //     this.chapters = res.data
    //     if (res.data.length > 0){
    //       this.selected = res.data[0].name
    //     }
    //   })
    // },
    change(val){
      // console.log(val)
      // console.log(val)

    }
  },
  watch: {
    visible(newValue){
      this.FormVisible = newValue
    },
    data(newValue){
      this.form = newValue
    },
    f(newValue){
      this.flag = newValue
    },
    chapters(newValue){
      this.chapter = newValue
    },
    selected(newValue){
      this.selecte = newValue
    }
  }
}
</script>

<style scoped>

</style>
