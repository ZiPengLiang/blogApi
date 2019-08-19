<template>
  <div class="blogMain">
    <div class="datalists">
      <table class="dataTable" id="dataTable">
        <thead>
          <th v-for="(item,index) in tableData.itemList" :key="index">{{item.label}}</th>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tableData.dataList" :key="index">
            <td v-for="(v,k) in item" :key="k">
              <span v-if="k.indexOf('type')==-1">{{v}}</span>
              <div v-else>
                <el-tag class="typeTag" v-for="(t,i) in v" :key="i">{{t}}</el-tag>
              </div>
            </td>
            <td>
              <button class="edit" @click="changeBlog(item)">编辑</button>
              <button class="edit" @click="checkBlog(item)">查看</button>
              <button class="edit" @click="deleteBlog(item)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-dialog title="编辑博客" :visible.sync="changeBlogViable" class="blogDialog">
      <div class="data">
        <div class="dtitle">
          <el-input placeholder="请输入内容" v-model="title" clearable></el-input>
        </div>
        <div class="dtype">
          <div>
            <el-tag
              :key="tag"
              class="typeTag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </div>
        </div>
        <div class="dBox">
          <markdown />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeBlogViable = false">取消</el-button>
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
    changeBlog(item) {
      this.changeBlogViable = true;
      console.log(item);
    },
    checkBlog(item) {
      console.log(item);
    },
    deleteBlog(item) {
      console.log(item);
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  },
  data() {
    return {
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
      changeBlogViable: false,
      tableData: {
        ifButton: true,
        itemList: [
          {
            label: "日期"
          },
          {
            label: "题目"
          },
          {
            label: "类型"
          },
          {
            label: "浏览数"
          },
          {
            label: "评论数"
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
            watch: "200",
            comment: "100"
          },
          {
            date: "2016-05-02",
            title: "javascript基础",
            type: ["javascript", "html"],
            watch: "200",
            comment: "100"
          },
          {
            date: "2016-05-02",
            title: "javascript基础",
            type: ["javascript", "html"],
            watch: "200",
            comment: "100"
          },
          {
            date: "2016-05-02",
            title: "javascript基础",
            type: ["javascript", "html"],
            watch: "200",
            comment: "100"
          }
        ]
      },
      cBlog: {
        title: ""
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
</style>
