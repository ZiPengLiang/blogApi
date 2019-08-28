<template>
  <div id="app">
    <transition>
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      show: true
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
</style>
