<template >
  <div class="markdown">
    <div class="header_input">
      <el-input placeholder="请输入内容" v-model="title" clearable></el-input>
      <el-button type="primary">提交文章</el-button>
    </div>
    <mavon-editor class="md" v-model="mdvalue" @save="saveText" />
  </div>
</template>
<script>
export default {
  methods: {
    saveText(value, render) {
      this.mdvalue = value;
      this.render = render;
      console.log("this is render" + this.render);
      console.log("this is value" +this.mdvalue);
    }
  },
  data() {
    return {
      mdvalue: "",
      render: "",
      title: ""
    };
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.markdown {
  width: 100%;
  height: 100%;
  padding-top: 20px;
}
.header_input {
  margin-bottom: 10px;
  display: flex;
}
.md {
  height: 80%;
  width: 100%;
}
</style>