<template>
  <div class="blogMain">
    <div class="datalists" v-if="tableData.dataList.length != 0">
      <table class="dataTable" v-loading="loading" id="dataTable">
        <thead>
          <th v-for="(item, index) in tableData.itemList" :key="index">
            {{ item.label }}
          </th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData.dataList" :key="index">
            <td v-for="(v, k) in item" :key="k">
              <div v-if="k.indexOf('type') == -1">
                <span v-if="k.indexOf('top') == -1">{{ v }}</span>
                <el-switch
                  v-else
                  v-model="item.top"
                  @change="toTop(index)"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </div>
              <div v-else>
                <el-tag class="typeTag" v-for="(t, i) in v" :key="i">{{
                  t
                }}</el-tag>
              </div>
            </td>
            <td>
              <button class="edit" @click="changeBlog(index)">编辑</button>
              <button class="edit" @click="checkBlog(index)">查看</button>
              <button class="edit" @click="deleteBlog(index)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="selectData.pageno"
          :page-sizes="[10, 20]"
          :page-size="selectData.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="current"
        ></el-pagination>
      </div>
    </div>
    <div class="nomessage" v-else>暂无信息，请添加博客</div>
    <el-dialog
      title="编辑博客"
      v-loading="loading"
      :visible.sync="changeBlogViable"
      class="blogDialog"
    >
      <div class="data">
        <div class="dtitle">
          <el-input
            placeholder="请输入内容"
            v-model="cBlog.title"
            clearable
          ></el-input>
        </div>
        <div class="dtype">
          <!-- 文章分类 -->
          <div>
            <el-tag
              :key="tag"
              class="typeTag"
              v-for="tag in cBlog.blogType"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
              >{{ tag }}</el-tag
            >
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ New Tag</el-button
            >
          </div>
          <!-- 录入图片 -->
          <div style="display: flex">
            <el-button type="primary" @click="uploadImg">上传图片</el-button>
            <img
              class="s_img"
              v-if="cBlog.base64 && cBlog.base64.indexOf('base64') != -1"
              :src="cBlog.base64"
              alt="点击上传图片"
            />
            <img
              class="s_img"
              v-else
              :src="base + '/' + cBlog.base64"
              alt="点击上传图片"
            />
            <input
              style="display: none"
              type="file"
              accept="image/*"
              ref="BlogImg"
              @change="selectFileImage($event)"
            />
          </div>
          <!-- 分类 -->
          <div>
            <el-select
              size="small"
              style="width: 150px"
              v-model="cBlog.classification"
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
        <div class="dBox">
          <mavon-editor
            class="md"
            ref="markdown"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
            v-model="cBlog.mdvalue"
            @save="saveText"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeBlogViable = false">取消</el-button>
        <el-button class="btnColor" type="primary" @click="commitBlog"
          >确定编辑</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="查看博客"
      :visible.sync="checkBlogViable"
      class="blogDialog"
    >
      <div class="mdtohtml">
        <div class="a_header">
          <p class="title">{{ cBlog.title }}</p>
          <p class="about">
            <span>
              <i class="el-icon-time"></i>
              {{ timeFormat(cBlog.date) }}
            </span>
            <span>
              <i class="el-icon-view"></i>
              {{ cBlog.watch }}
            </span>
            <span>
              <i class="el-icon-aim"></i>
              {{ cBlog.classification == "summary" ? "知识总结" : "生活牢骚" }}
            </span>
          </p>
          <div class="type">
            <span
              v-for="(item, index) in cBlog.blogType"
              :key="index"
              class="t_button"
              >{{ item }}</span
            >
          </div>
        </div>
        <div v-html="cBlog.render"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          class="btnColor"
          type="primary"
          @click="checkBlogViable = false"
          >确认</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { base } from "../common/server";
export default {
  methods: {
    //修改博客
    changeBlog(index) {
      this.changeBlogViable = true;
      this.cBlog = this.allBlog[index];
    },
    //查看博客
    checkBlog(index) {
      this.checkBlogViable = true;
      this.cBlog = this.allBlog[index];
    },
    //删除博客
    deleteBlog(index) {
      let that = this;
      this.$confirm("是否删除该文章，删除后无法恢复", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((actions) => {
        if (actions == "confirm") {
          that.loading = true;
          that.gl_ajax({
            method: "post",
            url: "/delete",
            data: JSON.stringify({
              library: "blog",
              _id: that.allBlog[index]._id,
            }),
            success(res) {
              that.loading = false;
              if (res.data.status == 0) {
                that.$message({
                  message: "删除成功",
                  type: "success",
                });
                that.getBlog();
              } else {
                that.$message({
                  message: "删除失败",
                  type: "warning",
                });
              }
            },
            error(err) {
              that.loading = false;
              console.log("deleteBlog:" + err);
            },
          });
        }
      });
    },
    handleClose(tag) {
      this.cBlog.blogType.splice(this.cBlog.blogType.indexOf(tag), 1);
    },
    //获取所有的博客
    getBlog() {
      // console.log(this);
      let that = this;
      this.loading = true;
      this.gl_ajax({
        url: "/getData",
        method: "get",
        data: {
          pageno: that.selectData.pageno,
          pagesize: that.selectData.pagesize,
          data: {},
          library: "blog",
        },
        success(res) {
          if (res.data.status == 0) {
            let data = res.data;
            that.allBlog = data.data;
            that.current = data.count;
            let bdata = data.data;
            that.tableData.dataList = [];
            bdata.forEach((item) => {
              let object = {};
              object["date"] = that.timeFormat(item.date);
              object["title"] = item.title;
              object["type"] = item.blogType;
              object["watch"] = item.watch;
              object["comment"] = item.comment;
              object["top"] = item.toTop;
              that.tableData.dataList.push(object);
            });
            that.loading = false;
          } else {
            that.loading = false;
          }
        },
        error(err) {
          that.loading = false;
          console.log(err.message);
        },
      });
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    timeFormat(time) {
      //传入时间戳
      let date = new Date(time);
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 >= 10
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
      return year + "-" + month + "-" + day;
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.cBlog.blogType.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //将文章是否顶置
    toTop(index) {
      let that = this;
      let title = that.allBlog[index].toTop
        ? "是否取消文章顶置?"
        : "是否将该文章顶置?";
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((actions) => {
          if (actions == "confirm") {
            that
              .setBlog({
                _id: that.allBlog[index]._id,
                data: {
                  toTop: !that.allBlog[index].toTop,
                },
              })
              .then((res) => {
                if (res.data.status == 0) {
                  that.$message({
                    message: "修改成功",
                    type: "success",
                  });
                } else {
                  that.$message({
                    message: "修改失败",
                    type: "warning",
                  });
                }
                that.getBlog();
              });
          }
        })
        .catch((_) => {
          that.getBlog();
        });
    },
    //提交修改
    commitBlog() {
      let that = this;
      if (this.mdflag) {
        let cblog = this.cBlog;
        let data = {
          blogType: cblog.blogType,
          classification: cblog.classification,

          mdvalue: cblog.mdvalue,
          render: cblog.render,
          title: cblog.title,
          base64: cblog.base64,
        };
        that
          .setBlog({
            _id: cblog._id,
            data,
          })
          .then((res) => {
            if (res.data.status == 0) {
              that.$message({
                message: "修改成功",
                type: "success",
              });
              setTimeout(function () {
                that.changeBlogViable = false;
                that.getBlog();
              }, 1000);
            } else {
              that.$message({
                message: "修改失败",
                type: "success",
              });
              that.changeBlogViable = false;
            }
          });
        that.mdflag = false;
      } else {
        this.$message.error("请保存文章");
      }
    },
    //修改blog
    setBlog(bdata) {
      let that = this;
      this.loading = true;
      let { _id, data } = bdata;
      return new Promise((resolve, rejuct) => {
        that.gl_ajax({
          method: "post",
          url: "/updata",
          data: JSON.stringify({
            library: "blog",
            _id,
            data,
          }),
          success: function (res) {
            that.loading = false;
            resolve(res);
          },
          error: function (err) {
            that.loading = false;
            rejuct(err);
            console.log("err", err);
          },
        });
      });
    },
    //保存md内容
    saveText(value, render) {
      if (value) {
        this.cBlog.mdvalue = value;
        this.cBlog.render = render;
        this.mdflag = true;
        console.log(value);
      } else {
        this.mdflag = false;
      }
    },
    // 上传图片
    selectFileImage(e) {
      let files = e.target.files || e.dataTransfer.files;
      let id = e.target.id;
      if (!files.length) return;
      let picavalue = files[0];
      if (picavalue.size / 1024 > 10240) {
        that.$message({
          message: "图片过大",
          type: "warning",
        });
      } else {
        this.imageToBase64(picavalue, id);
      }
    },
    //触发上传
    uploadImg() {
      this.$refs.BlogImg.click();
    },
    //将图片转成base64位
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
        reader.onloadend = function () {
          let result = this.result;
          let img = new Image();
          img.src = result;
          img.onload = function () {
            let data = self.compress(img, 0.3);
            self.cBlog.base64 = data;
          };
        };
      }
    },
    // 图片压缩
    compress(img, size) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let initSize = img.src.length;
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
    // 页数修改
    handleSizeChange(val) {
      this.selectData.pagesize = val;
      this.getBlog();
    },
    //页码修改
    handleCurrentChange(val) {
      this.selectData.pageno = val;
      this.getBlog();
    },
    $imgAdd(pos, $file) {
      let that = this;
      this.gl_ajax({
        method: "post",
        url: "/setPic",
        data: JSON.stringify({
          data: $file.miniurl,
        }),
        success(res) {
          if (res.data.status == 0) {
            let url = that.base + "/" + res.data.data.imgurl;
            that.$refs.markdown.$img2Url(pos, url);
          }
        },
      });
    },
    $imgDel(pos) {
      let imgName = pos[0].split("image/")[1];
      let that = this;
      this.gl_ajax({
        method: "post",
        url: "/deletepic",
        data: JSON.stringify({
          data: imgName,
        }),
        success(res) {},
      });
    },
  },
  mounted() {
    this.base = base;
    this.getBlog();
  },
  data() {
    return {
      base: "",
      selectData: {
        pageno: 1,
        pagesize: 10,
      },
      // 所有博客数
      current: 1,
      //判断是否保存了
      mdflag: false,
      options: [
        {
          label: "知识总结",
          value: "summary",
        },
        {
          label: "生活牢骚",
          value: "whining",
        },
      ],
      inputVisible: false,
      //加载中
      loading: false,
      //所有的博客
      allBlog: [],
      changeBlogViable: false,
      checkBlogViable: false,
      tableData: {
        ifButton: true,
        itemList: [
          {
            label: "日期",
          },
          {
            label: "题目",
          },
          {
            label: "类型",
          },
          {
            label: "浏览数",
          },
          {
            label: "评论数",
          },
          {
            label: "顶置",
          },
          {
            label: "操作",
          },
        ],
        dataList: [],
      },
      inputValue: "",
      cBlog: {
        title: "",
        blogType: [],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.blogMain {
  padding-top: 100px;
}
.typeTag {
  margin: 2px 8px;
}
.blogDialog {
  width: 100%;
  /* margin: 0 auto; */
}
.data {
  text-align: left;
}
.dBox {
  height: 600px;
  .md {
    height: 100%;
    width: 100%;
  }
}
.dtype {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.dtitle {
  font-size: 30px;
}
.datalists {
  position: relative;
  width: 70%;
  margin: 0 auto;
  background-color: #fff;
}
button.right,
button.edit,
button.delete,
button.cancel {
  width: 68px;
  height: 32px;
  outline: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: #a7a7a7;
  background-color: #fff;
  border: 1px solid #e7e7e7;
  transition: all 0.6s;
}
.datalists table {
  width: 100%;
  font-size: 14px;
  color: #a7a7a7;
  font-weight: normal;
  border-collapse: collapse;
  border: 1px solid #e7e7e7;
  box-shadow: 0 4px 11px 0 rgba(204, 204, 204, 0.5);
  border-radius: 6px;
}
.datalists table > thead {
  height: 58px;
  line-height: 58px;
  background-color: #f4f5f6;
  border-bottom: 1px solid #e7e7e7;
}
.datalists table > thead > th {
  font-weight: normal;
}
.datalists table > tbody > tr {
  height: 58px;
  /* line-height: 58px; */
  border-bottom: 1px solid #e7e7e7;
  transition: all 0.6s;
}
.datalists table > tbody > tr:hover {
  background-color: #f4f5f6;
  border-left: 2px solid #1a1a1a;
  cursor: pointer;
}
.datalists table > tbody > tr:hover button.delete {
  color: #fff;
  background-color: #f10000;
}
.datalists table > tbody > tr:hover button.edit {
  color: #fff;
  background-color: #1a1a1a;
}
.datalists table > tbody > tr:hover button.right {
  color: #fff;
  background-color: #001fff;
}
/* 添加一个取消设置的按钮   */
.datalists table > tbody > tr:hover button.cancel {
  color: #fff;
  background-color: #001fff;
}
.datalists table > tbody > tr button.cancel:hover {
  color: #fff;
  background-color: #f10000;
}
.datalists table > tbody > tr button.cancel > span {
  display: block;
  margin-top: -30px;
  height: 32px;
  line-height: 32px;
}
.datalists table > tbody > tr button.cancel:hover {
  padding-top: 30px;
}
.datalists table > tbody > tr > td {
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap;
  position: relative;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.mdtohtml {
  text-align: left;
}
.a_header {
  padding: 15px 0;
  border-bottom: 1px dashed #cccccc;
  .title {
    font-size: 22px;
    color: #222;
    font-weight: 400;
    line-height: 1.8;
  }
  .about {
    font-size: 12px;
    font-size: #999;
    margin-top: 12px;
    span {
      margin-right: 20px;
    }
  }
  .type {
    .t_button {
      margin-top: 14px;
      color: #fff;
      border: 1px solid #f16d71;
      border-radius: 15px;
      background: #f16d71;
      display: inline-block;
      margin-right: 10px;
      padding: 0 15px;
      height: 25px;
      line-height: 25px;
      transition: 0.4s;
      font-size: 12px;
      cursor: pointer;
    }
    .t_button:hover {
      color: #5f5f5f !important;
      border: 1px solid #f7f7f7;
      outline-style: none;
      background: #f7f7f7;
    }
  }
}
.s_img {
  width: 50px;
  height: 50px;
  margin-left: 15px;
}

.paging {
  margin-top: 20px;
}
</style>
