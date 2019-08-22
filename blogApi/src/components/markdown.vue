<template >
  <div class="markdown">
    <mavon-editor class="md" v-model="mdvalue" @save="saveText" />
  </div>
</template>
<script>
export default {
  props: ["data"],
  methods: {
    saveText(value, render) {
      this.mdvalue = value;
      this.render = render;
      console.log("this is render" + this.render);
      console.log("this is value" + this.mdvalue);
    }
  },
  data() {
    return {
      mdvalue: this.data ? this.data : "",
      render: ""
    };
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.markdown {
  width: 100%;
  height: 100%;
}
.md {
  height: 100%;
  width: 100%;
}
</style>