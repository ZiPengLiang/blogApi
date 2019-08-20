<template>
  <div class="blogMain">
    <div class="datalists">
      <div class="linkHeader">
        <el-button style="float:right" @click="addlink" type="primary">添加友链</el-button>
      </div>
      <table class="dataTable" id="dataTable">
        <thead>
          <th v-for="(item,index) in tableData.itemList" :key="index">{{item.label}}</th>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tableData.dataList" :key="index">
            <td v-for="(v,k) in item" :key="k">
              <div v-if="k.indexOf('type')==-1">
                <!-- v-if="k.indexOf('evaluate') == -1" -->
                <span :class="k.indexOf('evaluate') == -1?'':'evaluate'">{{v}}</span>
              </div>
              <div v-else>
                <el-tag class="typeTag" v-for="(t,i) in v" :key="i">{{t}}</el-tag>
              </div>
            </td>
            <td>
              <button class="edit" @click="changeBlog(item)">编辑</button>
              <button class="edit" @click="deleteBlog(item)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-dialog title="编辑友链" :visible.sync="changeLinksViable" class="blogDialog">
      <div class="data">
        <div class="dtitle">
          <span>博主：</span>
          <el-input class="dInput" placeholder="请输入内容" v-model="cBlog.title" clearable></el-input>
        </div>
        <div class="dtype">
          <div>类型：</div>
          <div>
            <el-tag
              :key="tag"
              class="typeTag"
              v-for="tag in cBlog.dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="cBlog.inputVisible"
              v-model="cBlog.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleChangeInput"
              @blur="handleChangeInput"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showCInput">+ New Tag</el-button>
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
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeLinksViable = false">取消</el-button>
        <el-button class="btnColor" type="primary" @click="commitTenant('TenantForm')">确定编辑</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加友链" :visible.sync="addLinksViable" class="blogDialog">
      <div class="data">
        <div class="dtitle">
          <span>博主：</span>
          <el-input class="dInput" placeholder="请输入内容" v-model="aLinks.title" clearable></el-input>
        </div>
        <div class="dtype">
          <div>类型：</div>
          <div>
            <el-tag
              :key="tag"
              class="typeTag"
              v-for="tag in aLinks.dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="aLinks.inputVisible"
              v-model="aLinks.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleAddInput"
              @blur="handleAddInput"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showAddInput">+ New Tag</el-button>
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
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addLinksViable = false">取消</el-button>
        <el-button class="btnColor" type="primary" @click="commitTenant('TenantForm')">确定编辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import markdown from "./markdown";
export default {
  components: { markdown },
  methods: {
    //添加博客
    addlink() {
      this.addLinksViable = true;
    },
    changeBlog(item) {
      this.changeLinksViable = true;
      console.log(item);
    },
    checkBlog(item) {
      console.log(item);
    },
    deleteBlog(item) {
      console.log(item);
    },
    handleClose(tag) {
      this.cBlog.dynamicTags.splice(this.cBlog.dynamicTags.indexOf(tag), 1);
    },

    showCInput() {
      this.cBlog.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    showAddInput() {
      this.aLinks.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleChangeInput() {
      let inputValue = this.cBlog.inputValue;
      if (inputValue) {
        this.cBlog.dynamicTags.push(inputValue);
      }
      this.cBlog.inputVisible = false;
      this.cBlog.inputValue = "";
    },
    handleAddInput() {
      let inputValue = this.aLinks.inputValue;
      if (inputValue) {
        this.aLinks.dynamicTags.push(inputValue);
      }
      this.aLinks.inputVisible = false;
      this.aLinks.inputValue = "";
    }
  },
  data() {
    return {
      addLinksViable: false,
      changeLinksViable: false,
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
        dataList: [
          {
            date: "2016-05-02",
            title: "javascript基础",
            type: ["javascript", "html"],
            evaluate:
              "度娘无敌度娘无敌度娘无敌度娘无敌度娘无敌度娘无敌度娘无敌度娘无敌度娘无敌度娘无敌",
            url: "www.baidu.com"
          },
          {
            date: "2016-05-02",
            title: "javascript基础",
            type: ["javascript", "html"],
            evaluate: "度娘无敌",
            url: "www.baidu.com"
          },
          {
            date: "2016-05-02",
            title: "javascript基础",
            type: ["javascript", "html"],
            evaluate: "度娘无敌",
            url: "www.baidu.com"
          },
          {
            date: "2016-05-02",
            title: "javascript基础",
            type: ["javascript", "html"],
            evaluate: "度娘无敌",
            url: "www.baidu.com"
          }
        ]
      },
      cBlog: {
        title: "",
        dynamicTags: ["标签一", "标签二", "标签三"],
        inputValue: "",
        inputVisible: false,
        url: "",
        evaluate: ""
      },
      aLinks: {
        title: "",
        dynamicTags: ["标签一", "标签二", "标签三"],
        inputValue: "",
        inputVisible: false,
        url: "",
        evaluate: ""
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
