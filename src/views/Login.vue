
<template>
  <div>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-field
      v-model="username"
      clearable
      required
      label="用户名"
      placeholder="请输入用户名"
      :error-message="usernameErrMsg"
      @input="changeUsername"
    />
    <van-field
      v-model="password"
      clearable
      required
      label="密码"
      placeholder="请输入密码"
      :error-message="passwordErrMsg"
      @input="changePassword"
    />
    <hm-button @click.native="startLogin">登录</hm-button>
    <div class="go-register">
      <router-link to="/register">注册帐号</router-link>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return{
      username: '',
      password: '',
      usernameErrMsg: '',
      passwordErrMsg: ''
    }
  },
  created() {
    // this.$route.query
    const {username,password} = this.$route.params
    if(username&&password){
      this.username = username
      this.password = password
    }
  },
  methods: {
    changeUsername() {
      const reg = /^\d{1,5}$/ 
      if(reg.test(this.username) || this.username == '') {
        this.usernameErrMsg = ''
      }else{
        this.usernameErrMsg = '用户名格式错误'
      }
    },
    changePassword() {
      const reg = /^\d{1,3}$/
      if(reg.test(this.password) || this.password == '') {
        this.passwordErrMsg = ''
      }else{
        this.passwordErrMsg = '密码格式错误'
      }
    },
    async startLogin() {
      if(
        this.username !== ''&&
        this.password !== ''&&
        this.usernameErrMsg === ''&&
        this.passwordErrMsg === ''
      ){
      let res = await this.$axios.post('http://localhost:3000/login', {
        
        username: this.username,
        password: this.password
      })
      // console.log(res.data);
      const {statusCode,data} = res.data
      if(statusCode===200) {
        // console.log(res);
        this.$toast.success('登录成功')
        localStorage.setItem('token', data.token)
        localStorage.setItem('user_id', data.user.id)

        this.$router.push('/user')
      }else{
        this.$toast.fail('登录失败');
      }
      }else{
        this.$toast.fail('登录失败');
      }
    }
  }
}
</script>

<style lang='less' scopde>
  .go-register{
    text-align: center;
  }
</style>