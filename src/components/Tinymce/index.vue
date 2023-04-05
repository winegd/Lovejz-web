<template>
  <div>
    <Editor  api-key="no-api-key"  v-model="content" :init="init">

    </Editor>

  </div>

</template>

<script>

import tinymce from "tinymce/tinymce";

import Editor from "@tinymce/tinymce-vue";


export default {
  name: 'index',
  components:{
    Editor
  },

  mounted() {
    tinymce.init({});
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default:
        "preview fullscreen image link charmap lists media code codesample table  wordcount kityformula-editor"
    },
    toolbar: {
      type: [String, Array],
      default:
      "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify|bullist numlist |outdent indent blockquote | undo redo | link unlink image code kityformula-editor | removeformat",

},
    h:{
      default:200
    }
  },
  data(){
    return{
      init:{
        menubar: false,
        selector: '#tiny',
        plugins: "link image media  table preview lists advlist fullscreen  kityformula-editor charmap quickbars",
        toolbar: "undo redo | preview fullscreen fontsize image kityformula-editor | alignleft bullist numlist   media table charmap | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
        // toolbar_mode: "wrap",
        quickbars_selection_toolbar: 'bold italic | fontsize h3 h4 superscript subscript',
        // quickbars_insert_toolbar:false,
        quickbars_insert_toolbar: 'image kityformula-editor',
        fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
        font_formats:
          "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
        branding: false,
        images_upload_url:'http://localhost/stu/uploadPic',
        images_upload_base_path:'http://love-jz-stu.lazyy.top',
        //如果写了内容页面刷新前询问是否退出
        autosave_ask_before_unload: true,
        height:this.h,

      },
      content: this.value
    }
  },
  methods: {

  },
  watch: {
    value(newValue) {
      this.content = newValue;
    },
    content(newValue) {
      this.$emit("input", newValue);
    }
  }

}
</script>

<style scoped>

</style>
