<template>
  <div class="addblog">
    <div class="inputBox">
      <div class="header_input">
        <el-input placeholder="请输入内容" v-model="blog.title" clearable></el-input>
        <el-button type="primary" @click="addBlog">提交文章</el-button>
      </div>
      <div class="type">
        <div class="aType">
          类型：
          <typeTag ref="Tag" @commitType="getType" />
        </div>
        <div class="bType">
          分类：
          <el-select
            size="small"
            style="width:150px;"
            v-model="blog.classification"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
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
      let that = this;
      let title = this.blog.title.replace(/ /g, "");
      this.$refs.Tag.send();
      this.blog.date = new Date().getTime();
      if (title && this.typeflag) {
        if (this.mdflag) {
          this.gl_ajax({
            method: "post",
            url: "/insertBlog",
            data: JSON.stringify({
              data: that.blog
            }),
            success(res) {
              console.log(res);
              if (res.data.status == 0) {
                that.$message({
                  message: "录入成功",
                  type: "success"
                });
                setTimeout(function() {
                  that.$router.push({
                    name: "blogMain"
                  });
                }, 1000);
              }
            },
            error(err) {
              console.log(err.message);
              this.$message.error(err.message);
            }
          });
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
      options: [
        {
          label: "知识总结",
          value: "summary"
        },
        {
          label: "生活牢骚",
          value: "whining"
        }
      ],
      blog: {
        title: "",
        mdvalue: "",
        render: "",
        blogType: [],
        date: "",
        classification: "",
        toTop: false,
        watch: 0,
        comment: 0
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
      width: 100%;
      .aType,
      .bType {
        display: flex;
        align-items: center;
        width: 50%;
      }
    }
  }
}
</style>