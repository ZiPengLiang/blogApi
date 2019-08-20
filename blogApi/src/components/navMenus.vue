<template >
  <div class="navMenus">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">博客管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="blogMain">所有博客</el-menu-item>
          <el-menu-item index="addBlog">添加博客</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">友链管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="links">所有友链</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.navMenus {
  width: 200px;
  height: 100%;
  position: relative;
  .menusTag {
    position: absolute;
  }
}
.el-menu-vertical-demo {
  position: absolute;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}
</style>