<template>
  <div class="app-container">
    <div class="add_class">
      <el-button type="primary" @click="chapterFormVisible = true">添加章节<i
        class="el-icon-plus el-icon--right"
      /></el-button>

      <el-button type="primary" @click="dialogFormVisible = true">添加知识点<i
        class="el-icon-plus el-icon--right"
      /></el-button>
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

    <el-dialog title="添加章节"  :modal=true :visible.sync="chapterFormVisible">
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
        <el-button @click="chapterFormVisible = false;index='';">取 消</el-button>
        <el-button type="primary" @click="submit(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chapterFormVisible:false
    }
  }
}
</script>

<style scoped>

</style>
