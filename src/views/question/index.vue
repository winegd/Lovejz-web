<template>
  <div class="app-container">
    <div class="add_class">
      <router-link to="addquestion">
        <el-button type="primary" >添加题目<i
            class="el-icon-plus el-icon--right"
          /></el-button>
      </router-link>

    </div>

<!--    <el-table-->
<!--      :data="list"-->
<!--      border-->
<!--      v-loading="listLoading"-->
<!--      style="width: 100%"-->
<!--    >-->

<!--      <el-table-column-->
<!--        fixed-->
<!--        type="index"-->
<!--        label="序号"-->
<!--        width="100px"-->
<!--        align="center"-->
<!--      >-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="year"-->
<!--        label="年度"-->
<!--        align="center"-->
<!--      >-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="name"-->
<!--        label="班级"-->
<!--        align="center"-->
<!--      >-->
<!--      </el-table-column>-->
<!--      <el-table-column-->

<!--        label="操作"-->
<!--        align="center"-->
<!--      >-->
<!--        <template v-slot="scope">-->
<!--          <el-button  size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>-->
<!--          <el-button  size="mini" @click="handleDelete(scope.row)" type="danger">删除</el-button>-->

<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
  </div>

</template>

<script>



export default {
  components: {

  },
  created(){

  },
  data() {
    return{

    }
  },

  methods: {
    change(){
      console.log(this.content)
    },

  },




}
</script>

<style scoped>
.editor{
  /*width:700px;*/
  /*height:200px;*/
}


</style>
