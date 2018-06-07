<template>
  <div>
    <el-row>
      <el-col :span="24" class="header">
        <span></span>
      </el-col>
      <el-col :span="24" class="main">

        <el-form :model="login" :rules="rules" ref="login" label-position="left" label-width="0px" class="demo-ruleForm login-container">
          <h3 class="title">系统登录</h3>
          <el-form-item prop="userName">
            <el-input type="text" v-model="login.userName" auto-complete="off" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="login.password" auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="identifyCode">
            <el-input type="text" placeholder="请输入验证码" class="yanzhengma_input" auto-complete="off" v-model="login.identifyCode"></el-input>
            <input type="button" id="code" @click="createCode"  class="verification1" v-model="checkCode"/> <br>
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="Login" :loading="logining">登录</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>


    </div>
</template>

<script>
    import { requestLogin } from '../api/api';
  var code;
  export default {
    data() {
          var identifyCode = (rule, value, callback) => {
              if (value === '') {
                  callback(new Error('请输入验证码'));
              } else {
                  this.login.identifyCode.toUpperCase();
                  if (this.login.identifyCode.toUpperCase() != this.checkCode ) {
                      callback(new Error('不正确验证码'));
                      this.createCode();
                      this.login.identifyCode='';
                  }else{
                      callback();
                  }
              }
          };
      return {
          logining: false,
          checkCode:'',
          login: {
            userName: '',
            password: '',
            identifyCode:''
        },
        rules: {
            userName: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          identifyCode: [
              { required: true,validator: identifyCode, trigger: 'blur' }
          ]
        },
      };
    },
    methods: {
        // 图片验证码
        createCode(){
            code = "";
            var codeLength = 4;
            var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
                'S','T','U','V','W','X','Y','Z');
            for(var i = 0; i < codeLength; i++) {
                var index = Math.floor(Math.random()*36);
                code += random[index];
            }
            this.checkCode = code;//把code值赋给验证码
        },
        Login(){
            this.$refs.login.validate((valid) => {
                if (valid) {
                    let para={
                        userName:this.login.userName,
                        password:this.login.password
                    };
                    requestLogin(para).then((res)=>{
                        this.logining = true;
                        this.msg=res.data.result;

                        if(this.msg=="success"){
                            this.$router.push('/systemUserManage')
                        }else{
                            this.logining = false;
                            this.$router.push('/login');
                        }
                        this.logining = false;
                    }).catch(function (err) {
                            this.$router.push('/login');
                            console.log(err);
                        });
                } else {
                    return false;
                }
            });
        }
    },
      created(){
          this.createCode();
      }
  }

</script>

<style lang="scss" scoped>

  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 140px 100px 0 800px;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
<style>

  .header{
    height: 100px!important;
    width:100%;
    margin: 0 auto;
  }
  .header span{
    display: block;
    background:url("../assets/logoi.png") no-repeat 0 0 ;
    margin:40px auto;
    height:30px;
    margin-left:70px;

  }

  .main {
    background:url("../assets/banner1.png") no-repeat center;
    height: 800px;
    width: 100%;
    margin: 0 auto;
  }
  .tishixiaoxi{
    font-size: 12px;
    color:#ed711f;
    display: block;
    line-height: 30px;
  }
  .yanzhengma_input{
    width: 170px;
  }
  .disappear{
    display: none;
  }
  #code{
    font-size: 18px;
    letter-spacing:6px;
    color: #053d84;
    background: #f2f2f5;
    width: 160px;
    height: 40px;
  }
  .el-input--medium .el-input__inner{
    height: 40px;
  }
</style>
