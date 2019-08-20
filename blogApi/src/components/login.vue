<template>
  <div class="login">
    <div class="row">
      <div class="form-box">
        <div class="form-top">
          <div class="form-top-left">
            <h3>Login to our site</h3>
            <p>Enter your username and password to log on:</p>
          </div>
        </div>
        <div class="form-bottom">
          <div class="form-group">
            <label class="sr-only" for="form-username">Username</label>
            <input
              type="text"
              name="form-username"
              placeholder="Username..."
              class="form-username form-control"
              id="form-username"
            />
          </div>
          <div class="form-group">
            <label class="sr-only" for="form-password">Password</label>
            <input
              type="password"
              name="form-password"
              placeholder="Password..."
              class="form-password form-control"
              id="form-password"
            />
          </div>
          <button type="submit" class="btn">Sign in!</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
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
.form-bottom {
  padding: 25px 25px 30px 25px;
  background: #eee;
  -moz-border-radius: 0 0 4px 4px;
  -webkit-border-radius: 0 0 4px 4px;
  border-radius: 0 0 4px 4px;
  text-align: left;
}
.form-group {
  margin-bottom: 25px;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

</style>