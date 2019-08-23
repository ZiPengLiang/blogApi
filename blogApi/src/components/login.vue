<template>
  <div class="login">
    <div class="row">
      <div class="form-box">
        <div class="form-top">
          <div class="form-top-left">
            <h3>Login to our site</h3>
            <p>Enter your username and password to log on:</p>
          </div>
          <div class="inputBox">
            <el-input placeholder="请输入用户名" class="elinput" v-model="username" clearable></el-input>
            <el-input
              placeholder="请输入密码"
              class="elinput"
              type="password"
              v-model="password"
              clearable
            ></el-input>
            <el-button type="primary" class="loginBtn" @click="login">LOGIN</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { username: "", password: "" };
  },

  methods: {
    login() {
      let that = this;
      let username = this.username.replace(/ /g, "");
      let password = this.password.replace(/ /g, "");
      if (username && password) {
        this.gl_ajax({
          method: "post",
          url: "/login",
          data: JSON.stringify({
            username,
            password
          }),
          success(res) {
            if (res.data.status == 0) {
              that.$message({
                message: "登陆成功",
                type: "success"
              });
              sessionStorage.setItem("token", res.data.data.token);
              sessionStorage.setItem("username", res.data.data.username);
              that.$store.commit("changeLoginStatus", true);

              setTimeout(function() {
                that.$router.push({
                  name: "home"
                });
              }, 1000);
            } else {
              that.$message({
                message: "登陆失败",
                type: "warning"
              });
            }
          },
          error(err) {
            console.log(err);
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../assets/bg.jpg") no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-box {
  width: 555px;
  height: 355px;
}
.form-top {
  overflow: hidden;
  padding: 0 25px 15px 25px;
  background: #fff;
  -moz-border-radius: 4px 4px 0 0;
  -webkit-border-radius: 4px 4px 0 0;
  border-radius: 4px 4px 0 0;
  text-align: left;
}
.form-top-left {
  float: left;
  width: 75%;
  padding-top: 25px;
}
h3 {
  font-size: 22px;
  font-weight: 300;
  color: #555;
  line-height: 30px;
}
p {
  font-size: 16px;
  font-weight: 300;
  color: #888;
  line-height: 30px;
}
.inputBox {
  height: 235px;
  width: 100%;
  float: left;
  box-sizing: border-box;
  padding: 20px 15px;
}
.elinput {
  margin: 15px 0;
}
.loginBtn {
  margin-top: 15px;
  width: 100%;
}
</style>