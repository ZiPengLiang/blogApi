<template>
  <div id="app">
    <header>
      <blog-header v-if="notLogin" />
    </header>
    <div class="main">
      <navMenus v-if="notLogin" />
      <transition>
        <router-view class="router" />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      notLogin: this.$store.state.notLogin
    };
  },
  components: {
    blogHeader: resolve => require(["@/components/blogHeader"], resolve),
    navMenus: resolve => require(["@/components/navMenus"], resolve)
  }
};
</script>

<style>
body,
html,
#app {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100vw;
  overflow: hidden;
  text-align: center;
}
div,
p,
span,
li,
ul,
a,
body,
label,
input,
button {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
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
