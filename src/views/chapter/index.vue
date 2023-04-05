<template>
  <div class="app-container">
    <div class="add_class">
      <el-button type="primary" @click="addChapter">添加章节<i
        class="el-icon-plus el-icon--right"
      /></el-button>

      <el-button type="primary" @click="addKnowledgeVisible = true;flag=1">添加知识点<i
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
        prop="chapter.name"
        label="章节"
        align="center"
      >

        <template  v-slot="scope">
          <div @click="updateChapter(scope.row.chapter)" style="display:inline-block;" >
            {{scope.row.chapter.name}}
          </div>

        </template>
      </el-table-column>
      <el-table-column
        prop="list"
        label="知识点"
        align="center"
      >
      <template v-slot="scope">
        <div v-for="tag in scope.row.list" style="display:inline-block;">

          <div style="margin-top:10px;margin-right: 10px;" >
            <el-tag
              v-if="tag.isImportant === 0"
              closable
              type="info"
              @click="updateKnowledge(tag)"
              @close="deleteKnowledge(tag)">
              {{tag.name}}
            </el-tag>

            <el-tag v-else-if="tag.isImportant === 1"
              closable
              @click="updateKnowledge(tag)"
              @close="deleteKnowledge(tag)"
            >
              {{tag.name}}
            </el-tag>
          </div>
        </div>



      </template>

      </el-table-column>
      <el-table-column
        width="100px"
        label="操作"
        align="center"
      >
        <template v-slot="scope">
          <el-button  size="mini" @click="handleDelete(scope.row)" type="danger">删除</el-button>

        </template>
      </el-table-column>
    </el-table>





    <Dialog :visible="KnowledgeFormVisible"
            :data="KnowledgeForm"
            :f="flag"
            :chapters="chapters"
            :selected="selected"
            @resetPopupData="resetPopupData"
            @submit_knowledge="submit_knowledge"
    >
    </Dialog>

    <Dialog :visible="addKnowledgeVisible"
            :f="flag"
            :data="{}"
            :chapters="chapters"
            :selected="selected"
            @resetPopupData="resetPopupData"
            @submit_knowledge="submit_knowledge"
    >

    </Dialog>

    <ChapterDialog :visible="ChapterFormVisible" :f="flag_chapter" :data="chapter_form"
          @resetPopupData="ChapterresetPopupData"
          @submit_chapter="submit_chapter"
          >

    </ChapterDialog>

    <ChapterDialog :visible="addChapterFormVisible" :f="flag_chapter" :data="chapter_form"
                   @resetPopupData="ChapterresetPopupData"
                   @submit_chapter="submit_chapter"
    >

    </ChapterDialog>
  </div>
</template>

<script>
import { deleteChapters, getChapters, getList } from '@/api/chapter'
import Dialog from '@/components/KnowledgeDialog'
import { deleteKnowledge } from '@/api/knowledge'
import ChapterDialog from '@/components/ChapterDialog'
export default {
  components:{
    Dialog,
    ChapterDialog

  },
  created() {
    this.fetchData()
    this.getchapter()
  },
  data() {
    return {
      KnowledgeFormVisible:false,
      list:[],
      KnowledgeForm:{},
      addKnowledgeVisible:false,
      flag:0,
      flag_chapter:0,
      ChapterFormVisible:false,
      addChapterFormVisible:false,
      chapter_form:{},
      chapters:[],
      selected:null
    }
  },
  methods: {
    updateChapter(chapter){
      console.log(chapter)
      this.ChapterFormVisible=true
      this.flag_chapter=0
      this.chapter_form=chapter
    },
    handleDelete(row){
      console.log(row)
      deleteChapters(row.chapter).then(res =>{
        this.list = res.data
      })
    },
    submit_knowledge(val){
      this.list = val
      this.resetPopupData()
    },
    ChapterresetPopupData(){
      this.ChapterFormVisible=false
       this.addChapterFormVisible=false
    },
    submit_chapter(val){
      this.list = val
      this.getchapter()
      this.ChapterresetPopupData()
    },
    resetPopupData(){
      this.KnowledgeFormVisible = false
      this.addKnowledgeVisible = false
    },
    updateKnowledge(tag){
      console.log(tag)
      this.flag = 0
      this.KnowledgeFormVisible = true
      let data = this.chapters
      if (data.length > 0){
        for (let i of data){
          if(i.id === tag.chapterId){
            this.selected = i.name
          }
        }
      }
      this.KnowledgeForm = JSON.parse(JSON.stringify(tag))

    },
    fetchData() {
      let that = this
      this.listLoading = true
      getList().then(res => {
        console.log(res)
        this.list = res.data
        this.listLoading = false
      })
    },
    async getchapter(){
      getChapters().then(res =>{
        this.chapters = res.data
        if (res.data.length > 0){
          this.selected = res.data[0].name
        }
      })
    },
    deleteKnowledge(tag){
      deleteKnowledge(tag).then(res =>{
        this.list = res.data
      })
    },
    addChapter(){
      this.addChapterFormVisible = true
      this.flag_chapter = 1
    }
  }
}
</script>

<style scoped>
.add_class {
  margin-bottom: 20px;
}
</style>
