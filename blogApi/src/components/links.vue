<template>
  <div class="blogMain">
    <div class="datalists">
      <div class="linkHeader">
        <el-button style="float:right" @click="addlink" type="primary">添加友链</el-button>
      </div>
      <table
        class="dataTable"
        v-if="tableData.dataList.length != 0"
        v-loading="loading"
        id="dataTable"
      >
        <thead>
          <th v-for="(item,index) in tableData.itemList" :key="index">{{item.label}}</th>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tableData.dataList" :key="index">
            <td v-for="(v,k) in item" :key="k">
              <div v-if="k.indexOf('linkType')==-1">
                <!-- v-if="k.indexOf('evaluate') == -1" -->
                <span :class="k.indexOf('evaluate') == -1?'':'evaluate'">{{v}}</span>
              </div>
              <div v-else>
                <el-tag class="typeTag" v-for="(t,i) in v" :key="i">{{t}}</el-tag>
              </div>
            </td>
            <td>
              <button class="edit" @click="changeLink(index)">编辑</button>
              <button class="edit" @click="deleteLink(index)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="nomessage" v-else>暂无信息，请添加链接</div>
    </div>
    <el-dialog title="编辑友链" :visible.sync="changeLinksViable" class="blogDialog">
      <div class="data">
        <div class="dtitle">
          <span>博主：</span>
          <el-input class="dInput" placeholder="请输入内容" v-model="cBlog.blogname" clearable></el-input>
        </div>
        <div class="dtype">
          <div>类型：</div>
          <div>
            <el-tag
              :key="tag"
              class="typeTag"
              v-for="tag in cBlog.linkType"
              closable
              :disable-transitions="false"
              @close="handleClose('cBlog',tag)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInput('cBlog')"
              @blur="handleInput('cBlog')"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </div>
        </div>
        <div class="dtitle">
          <span>评价：</span>
          <el-input class="dInput" placeholder="请输入评价" v-model="cBlog.evaluate" clearable></el-input>
        </div>
        <div class="dtitle">
          <span>网址：</span>
          <el-input class="dInput" placeholder="请输入网址" v-model="cBlog.url" clearable></el-input>
        </div>
        <div class="dtitle">
          <span>头像地址：</span>
          <el-input class="dInput" placeholder="请输入网址" v-model="cBlog.imgurl" clearable></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeLinksViable = false">取消</el-button>
        <el-button class="btnColor" type="primary" @click="commitchange">确定编辑</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加友链" v-loading="loading" :visible.sync="addLinksViable" class="blogDialog">
      <div class="data">
        <div class="dtitle">
          <span>博主：</span>
          <el-input class="dInput" placeholder="请输入内容" v-model="aLinks.blogname" clearable></el-input>
        </div>
        <div class="dtype">
          <div>类型：</div>
          <div>
            <el-tag
              :key="tag"
              class="typeTag"
              v-for="tag in aLinks.linkType"
              closable
              :disable-transitions="false"
              @close="handleClose('aLinks',tag)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInput('aLinks')"
              @blur="handleInput('aLinks')"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </div>
        </div>
        <div class="dtitle">
          <span>评价：</span>
          <el-input class="dInput" placeholder="请输入评价" v-model="aLinks.evaluate" clearable></el-input>
        </div>
        <div class="dtitle">
          <span>网址：</span>
          <el-input class="dInput" placeholder="请输入网址" v-model="aLinks.url" clearable></el-input>
        </div>
        <div class="dtitle">
          <span>头像地址：</span>
          <el-input class="dInput" placeholder="请输入网址" v-model="aLinks.imgurl" clearable></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addLinksViable = false">取消</el-button>
        <el-button class="btnColor" type="primary" @click="commitLink">确定编辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    //添加链接
    addlink() {
      this.addLinksViable = true;
    },
    // 提交添加链接
    commitLink() {
      let { blogname, linkType, evaluate, url, imgurl } = this.aLinks;
      let t = blogname.replace(/ /g, "");
      let e = evaluate.replace(/ /g, "");
      let u = url.replace(/ /g, "");
      let that = this;
      if (t && e && u) {
        this.loading = true;
        this.gl_ajax({
          method: "post",
          url: "/insert",
          data: JSON.stringify({
            library: "friendlink",
            data: {
              blogname: t,
              evaluate: e,
              url: u,
              linkType,
              imgurl,
              date: new Date().getTime()
            }
          }),
          success(res) {
            console.log(res);
            that.loading = false;
            if (res.data.status == 0) {
              that.$message({
                message: "录入成功",
                type: "success"
              });
              setTimeout(function() {
                that.addLinksViable = false;
                that.getLinks();
              }, 1000);
            } else {
              that.$message({
                message: "录入失败",
                type: "warning"
              });
            }
          },
          error(err) {
            this.loading = false;
            console.log(err);
          }
        });
      }
    },
    //提交修改
    commitchange() {
      let that = this;
      let data = {
        blogname: that.cBlog.blogname,
        date: new Date().getTime(),
        evaluate: that.cBlog.evaluate,
        linkType: that.cBlog.linkType,
        url: that.cBlog.url,
        imgurl: that.cBlog.imgurl
      };
      this.setlink({
        _id: that.cBlog._id,
        data
      }).then(res => {
        if (res.data.status == 0) {
          that.$message({
            message: "修改成功",
            type: "success"
          });
          setTimeout(function() {
            that.changeLinksViable = false;
          }, 1000);
        } else {
          that.$message({
            message: "修改失败",
            type: "warning"
          });
        }
        that.getLinks();
      });
    },
    //修改link
    setlink(bdata) {
      let that = this;
      this.loading = true;
      let { _id, data } = bdata;
      return new Promise((resolve, rejuct) => {
        that.gl_ajax({
          method: "post",
          url: "/updata",
          data: JSON.stringify({
            library: "friendlink",
            _id,
            data
          }),
          success: function(res) {
            that.loading = false;
            resolve(res);
          },
          error: function(err) {
            that.loading = false;
            rejuct(err);
            console.log("err", err);
          }
        });
      });
    },
    // 初始化时间
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
    changeLink(index) {
      this.changeLinksViable = true;
      this.cBlog = this.allLink[index];
    },
    deleteLink(index) {
      let that = this;
      this.$confirm("是否删除该友链，删除后无法恢复", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(actions => {
        if (actions == "confirm") {
          that.loading = true;
          that.gl_ajax({
            method: "post",
            url: "/delete",
            data: JSON.stringify({
              library: "friendlink",
              _id: that.allLink[index]._id
            }),
            success(res) {
              that.loading = false;
              if (res.data.status == 0) {
                that.$message({
                  message: "删除成功",
                  type: "success"
                });
                that.getLinks();
              } else {
                that.$message({
                  message: "删除失败",
                  type: "warning"
                });
              }
            },
            error(err) {
              that.loading = false;
              console.log("delete:" + err);
            }
          });
        }
      });
    },
    handleClose(link, tag) {
      this[link].linkType.splice(this[link].linkType.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInput(link) {
      let inputValue = this.inputValue;
      if (inputValue) {
        this[link].linkType.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    getLinks() {
      let that = this;
      this.loading = true;
      this.gl_ajax({
        method: "get",
        url: "/getData",
        data: {
          pageno: 1,
          pagesize: 10,
          library: "friendlink",
          data: {}
        },
        success(res) {
          that.loading = false;
          if (res.data.status == 0) {
            let data = res.data;
            let link = data.data;
            that.allLink = link;
            that.tableData.dataList = [];
            link.forEach(item => {
              let object = {};
              object["date"] = that.timeFormat(item.date);
              object["blogname"] = item.blogname;

              object["linkType"] = item.linkType;
              object["evaluate"] = item.evaluate;
              object["url"] = item.url;
              that.tableData.dataList.push(object);
            });
          }
        },
        error(err) {
          this.loading = false;
          console.log(err);
        }
      });
    }
  },
  mounted() {
    this.getLinks();
  },
  data() {
    return {
      loading: false,
      addLinksViable: false,
      changeLinksViable: false,
      inputVisible: false,
      inputValue: "",
      allLink: [],
      tableData: {
        ifButton: true,
        itemList: [
          {
            label: "日期"
          },
          {
            label: "博主"
          },
          {
            label: "类型"
          },
          {
            label: "评价"
          },
          {
            label: "网址"
          },
          {
            label: "操作"
          }
        ],
        dataList: []
      },
      cBlog: {
        blogname: "",
        linkType: [],
        url: "",
        evaluate: "",
        imgurl: ""
      },
      aLinks: {
        blogname: "",
        linkType: [],
        url: "",
        evaluate: "",
        imgurl: ""
      }
    };
  }
};
</script>

<style scoped land='scss'>
.blogMain {
  padding-top: 100px;
}
.typeTag {
  margin: 2px 8px;
}
.linkHeader {
  height: 50px;
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
}
.dtype {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
}
.dtitle {
  font-size: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 15px 0;
}
.dtitle span {
  display: inline-block;
  width: 50px;
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
.evaluate {
  display: inline-block;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
