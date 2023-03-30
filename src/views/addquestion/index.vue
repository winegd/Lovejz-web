<template>
  <div class="editor">
    <Tinymce v-model="content"></Tinymce>

  </div>

</template>

<script>


import Tinymce from '@/components/Tinymce'

export default {
  components: {
    Tinymce
  },
  created(){

  },
  data() {
    return{
      content:''
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
