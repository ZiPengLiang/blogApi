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
        <mavon-editor
          class="md"
          ref="markdown"
          @imgAdd="$imgAdd"
          @imgDel="$imgDel"
          v-model="blog.mdvalue"
          @save="saveText"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { base } from "../common/server";
import markdown from "./markdown";
import typeTag from "./typeTag";
export default {
  components: {
    markdown,
    typeTag
  },
  mounted() {
    this.base = base;
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
    selectFileImage(e) {
      let files = e.target.files || e.dataTransfer.files;
      let id = e.target.id;
      if (!files.length) return;
      let picavalue = files[0];
      if (picavalue.size / 1024 > 10240) {
        that.$message({
          message: "图片过大",
          type: "warning"
        });
      } else {
        this.imageToBase64(picavalue, id);
      }
    },
    uploadImg() {
      this.$refs.BlogImg.click();
    },

    imageToBase64(file, id) {
      let self = this;
      //判断支不支持FileReader
      if (!file || !window.FileReader) return false;
      if (/^image/.test(file.type)) {
        //创建一个reader
        let reader = new FileReader();
        //将图片转成base64格式
        reader.readAsDataURL(file);
        //读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          img.onload = function() {
            let data = self.compress(img, 0.3);
            self.blog.base64 = data;
            self.iconBase64 = data;
          };
        };
      }
    },
    compress(img, size) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      // let initSize = img.src.length ? img.src.length : img.length;
      let width = img.width;
      let height = img.height;
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);
      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", size);
      return ndata;
    },
    $imgAdd(pos, $file) {
      let that = this;
      this.gl_ajax({
        method: "post",
        url: "/setPic",
        data: JSON.stringify({
          data: $file.miniurl
        }),
        success(res) {
          if (res.data.status == 0) {
            let url = that.base + "/" + res.data.data.imgurl;
            that.$refs.markdown.$img2Url(pos, url);
          }
        }
      });
    },
    $imgDel(pos) {
      let imgName = pos[0].split("image/")[1];
      let that = this;
      this.gl_ajax({
        method: "post",
        url: "/deletepic",
        data: JSON.stringify({
          data: imgName
        }),
        success(res) {}
      });
    }
  },
  data() {
    return {
      base: "",
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