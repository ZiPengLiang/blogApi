<template>
  <div class="addblog">
    <div class="inputBox">
      <div class="header_input">
        <el-input placeholder="请输入内容" v-model="blog.title" clearable></el-input>
        <el-button type="primary" @click="addBlog">提交文章</el-button>
      </div>
      <div class="type">
        类型：
        <typeTag ref="Tag" @commitType="getType" />
      </div>
      <div class="markdown">
        <mavon-editor class="md" ref="markdown" v-model="blog.mdvalue" @save="saveText" />
      </div>
    </div>
  </div>
</template>
<script>
import markdown from "./markdown";
import typeTag from "./typeTag";
export default {
  components: {
    markdown,
    typeTag
  },
  methods: {
    getType(data) {
      if (data.length != 0) {
        this.blog.blogType = data;
        this.typeflag = true;
      } else {
        this.typeflag = false;
      }
    },
    addBlog() {
      let title = this.blog.title.replace(/ /g, "");
      this.$refs.Tag.send();
      this.blog.date = new Date().getTime();
      if (title && this.typeflag) {
        if (this.mdflag) {
          console.log(this.blog);
        } else {
          this.$message.error("请保存文章");
        }
      } else {
        this.$message.error("请填写完整的信息");
      }
    },
    saveText(value, render) {
      if (value) {
        this.blog.mdvalue = value;
        this.blog.render = render;
        this.mdflag = true;
      } else {
        this.mdflag = false;
      }
    }
  },
  data() {
    return {
      mdflag: false,
      typeflag: false,
      blog: {
        title: "",
        mdvalue: "",
        render: "",
        blogType: [],
        date: ""
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.addblog {
  height: 100%;
  .inputBox {
    width: 70%;
    height: 100%;
    margin: 0 auto;
    text-align: left;
    padding-top: 20px;
    .header_input {
      margin-bottom: 10px;
      display: flex;
    }
    .markdown {
      margin-top: 20px;
      height: 70%;
      .md {
        height: 100%;
        width: 100%;
      }
    }
    .type {
      display: flex;
      align-items: center;
    }
  }
}
</style>