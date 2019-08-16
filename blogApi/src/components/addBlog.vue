<template>
  <div class="addblog">
    <div class="inputBox">
      <markdown />
    </div>
  </div>
</template>
<script>
import markdown from "./markdown";
export default {
  components: {
    markdown
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
  }
}
</style>