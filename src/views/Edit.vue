
<template>
  <div>
    <hm-header>编辑资料</hm-header>
    <div class="photo">
      <img :src="$axios.defaults.baseURL + info.head_img" alt="">
      <van-uploader class="uploader" :after-read="afterRead" />
    </div>
    <div class="cell">
      <van-cell-group>
        <van-cell title="昵称" is-link :value="info.nickname"  @click="showNickname"/>
        <van-cell title="密码" is-link value="******" @click="showPassword"/>
        <van-cell title="性别" is-link :value="info.gender === 1 ? '男': '女'" @click="showGender" />
      </van-cell-group>
    </div>
    <van-dialog v-model="isShowNickname" title="修改昵称" show-cancel-button @confirm="confirmNickname">
      <van-field v-model="nickname" placeholder="请输昵称" />
    </van-dialog>
    <van-dialog v-model="isShowPassword" title="修改密码" show-cancel-button @confirm="confirmPassword">
      <van-field v-model="passwrod" placeholder="请输入密码" />
    </van-dialog>
    <van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm="confirmGender">
      <van-radio-group v-model="gender">
        <van-cell-group >
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    
  </div>
</template>

<script>
export default {
  data(){
    return{
      info:{},
      isShowNickname: false,
      nickname: '',
      isShowGender: false,
      gender: '',
      isShowPassword: false,
      passwrod: ''
    }
  },
  created() {
    this.getInfo()
  },
  methods:{
    async getInfo() {
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')

    let res = await this.$axios.get(`/user/${user_id}`,)
      // console.log(res.data);
      const {statusCode,data} = res.data
      if(statusCode===200) {
        this.info = data
      }
    },
    showNickname() {
      this.isShowNickname = true
      this.nickname = this.info.nickname
    },
    confirmNickname() {
      if(this.nickname === this.info.nickname){
        return
      }
      this.editUser({
        nickname: this.nickname
      })
    },
    showGender() {
      this.isShowGender = true
      this.gender = this.info.gender
    },
    confirmGender() {
      if(this.gender === this.info.gender){
        return
      }
      this.editUser({
        gender: this.gender
      })
    },
    showPassword() {
      this.isShowPassword = true
      this.passwrod = this.info.passwrod
    },
    confirmPassword() {
      if(this.passwrod === this.info.passwrod){
        return
      }
      this.editUser({
        passwrod: this.passwrod
      })
    },
    async editUser(data) {
      const user_id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')
      let res = await this.$axios.post(`/user_update/${user_id}`,data)
      // console.log('修改结果',res);
      this.getInfo()
      this.$toast.success('修改成功')
    },
    async afterRead(file) {
      const token = localStorage.getItem('token')

      let formData =new FormData()
      formData.append('file', file.file)

      let res = await this.$axios.post('/upload', formData)
      // console.log(res);
      this.editUser({
        head_img: res.data.data.url
      })
    }
 
 }

}
</script>

<style lang='less' scoped>
 .photo{
   position: relative;
   height: 100px;
   margin: 20px 0;
   img{
     position: absolute;
     left: 50%;
     top: 50%;
     transform: translate(-50%,-50%);
     width: 70px;
     height: 70px;
     border-radius: 50%;
   }
   .uploader{
     position: absolute;
     left: 50%;
     top: 50%;
     transform: translate(-50%,-50%);
     opacity: 0;
   }
 }

</style>