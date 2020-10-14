
<template>
  <div>
    <hm-header>注册</hm-header>
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
      v-model="nickname"
      clearable
      required
      label="昵称"
      placeholder="昵称用户名"
      :error-message="nicknameErrMsg"
      @input="changeNickname"
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
    <hm-button @click.native="startRegister">注册</hm-button>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return{
      username: '',
      nickname: '',
      password: '',
      usernameErrMsg: '',
      nicknameErrMsg: '',
      passwordErrMsg: ''
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
    changeNickname() {
      const reg =/^[\u4e00-\u9fa5]{3,7}$/
      if(reg.test(this.nickname) || this.nickname == '') {
        this.nicknameErrMsg = ''
      }else{
        this.nicknameErrMsg = '昵称格式错误'
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
    async startRegister() {
      if(
        this.username !== ''&&
        this.nickname !== ''&&
        this.password !== ''&&
        this.usernameErrMsg === ''&&
        this.nicknameErrMsg === ''&&
        this.passwordErrMsg === ''
      ){
      let res = await this.$axios.post('http://localhost:3000/register', {
        username: this.username,
        password: this.password,
        nickname: this.nickname
      })
      // console.log(res.data);
      if(res.data.statusCode===200) {
        this.$router.push({
          name: 'login',
          params:{
            username: this.username,
            password: this.password
          }
        })
      }else{
        this.$toast.fail('注册失败');
      }
      }else{
        this.$toast.fail('注册失败');
      }
    }
  }
}
</script>

<style>

</style>