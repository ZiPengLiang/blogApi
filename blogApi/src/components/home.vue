<template>
  <div class="home">
    <header>
      <blog-header />
    </header>

    <div class="main">
      <navMenus />
      <transition>
        <router-view class="router" />
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    blogHeader: resolve => require(["@/components/blogHeader"], resolve),
    navMenus: resolve => require(["@/components/navMenus"], resolve)
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
.main {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.router {
  flex: 1;
}
</style>