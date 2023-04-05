<template>
      <el-dialog title="修改/添加 章节"  :modal=true :visible="FormVisible" :before-close="handleClose">
        <el-form label-width="80px" :model="form">

          <el-form-item label="名称">
            <el-input v-model="form.name"  />
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
</template>

<script>

import { addChapter, getChapters, updateChapter } from '@/api/chapter'

export default {
  name: 'index',
  props:{
    visible:{
      type: Boolean,
      default: false,
    },
    data:{
      default:{
        description:null,
        id:'',
        name:''
      }
    },
    f:{
      default:0
    }
  },
  data(){
    return{
      FormVisible:this.visible,
      form:this.data,
      chapters:[],
      selected:null,
      flag:0,
      chapter_id : null
    }
  },
  methods:{
    submit(form) {
      let that = this
      if (this.flag === 0) {
        updateChapter(form).then(res => {
          this.$emit('submit_chapter', res.data)
        })
      } else if (this.flag === 1) {
        let data = {}
        for (let i of this.chapters) {
          if (i.name === this.selected) {
            data.chapterId = i.id
          }
        }
        data.name = this.form.name
        data.description = this.form.description
        data.isImportant = this.form.isImportant
        console.log(data)
        addChapter(data).then(res => {
          this.$emit('submit_chapter', res.data)
        })
      }

    },
    Cancel () {
      this.$emit('resetPopupData')
    },
    handleClose(){
      this.$emit('resetPopupData')

    },
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
    }
  }
}
</script>

<style scoped>

</style>
