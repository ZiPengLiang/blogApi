<template>
  <div class="addblog">
    <div class="inputBox">
      <div class="header_input">
        <el-input placeholder="请输入内容" v-model="blog.title" clearable></el-input>
        <el-button type="primary" @click="addBlog">提交文章</el-button>
      </div>
      <div class="type">
        <!-- 文章类型 -->
        <div class="aType">
          类型：
          <typeTag ref="Tag" @commitType="getType" />
        </div>
        <!-- 分类 -->
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
        <!-- 上传展示图 -->
        <div class="showImg">
          <el-button type="primary" @click="uploadImg">上传图片</el-button>
          <input
            style="display: none;"
            type="file"
            accept="image/*"
            ref="BlogImg"
            @change="selectFileImage($event)"
          />
          <img class="s_img" :src="iconBase64" alt />
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
          if (this.iconBase64) {
            this.gl_ajax({
              method: "post",
              url: "/insert",
              data: JSON.stringify({
                library: "blog",
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
            this.$message.error("请录入封面图");
          }
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
    },
    selectFileImage(event) {
      let imgData = event.target.files[0];
      this.imageToBase64(imgData);
    },
    uploadImg() {
      this.$refs.BlogImg.click();
    },

    imageToBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // console.log("file 转 base64结果：" + reader.result);
        this.iconBase64 = reader.result;
        this.blog.base64 = reader.result;
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    }
  },
  data() {
    return {
      mdflag: false,
      typeflag: false,
      iconBase64: "",
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
        comment: 0,
        base64: ""
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
      .bType,
      .showImg {
        display: flex;
        align-items: center;
        width: 33%;
      }
      .s_img {
        width: 50px;
        height: 50px;
        margin-left: 20px;
      }
    }
  }
}
</style>