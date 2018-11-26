<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <img alt="logo" class="logo" src="../../../static/img/logo.png" />
          <span class="title">{{systemName}}</span>
        </div>
        <div class="desc">后台管理系统</div>
      </div>
      <div class="login">
        <a-form @submit="onSubmit" :autoFormCreate="(form) => this.form = form">
          <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
            <a-tab-pane tab="账户密码登录" key="1">
              <a-alert type="error" :closable="true" v-if="error" :message="error" showIcon style="margin-bottom: 24px;" />
              <a-form-item
                fieldDecoratorId="name"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入账户名', whitespace: true}]}"
              >
                <a-input size="large" placeholder="用户名" >
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>
              <a-form-item
                fieldDecoratorId="password"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码', whitespace: true}]}"
              >
                <a-input size="large" placeholder="密码" type="password">
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
            </a-tab-pane>
          </a-tabs>
          <a-form-item>
            <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <global-footer :link-list="linkList" :copyright="copyright" />
  </div>
</template>

<script>
  import GlobalFooter from '../../layouts/GlobalFooter'
  import { Login } from "../../api/user.js";
  export default {
    name: 'Login',
    components: {GlobalFooter},
    data () {
      return {
        logging: false,
        error: ''
      }
    },
    created () {
    },
    computed: {
      systemName () {
        return this.$store.state.setting.systemName
      },
      linkList () {
        return this.$store.state.setting.footerLinks
      },
      copyright () {
        return this.$store.state.setting.copyright
      }
    },
    methods: {
      onSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            this.logging = true
            Login({
              data:({
                userName:this.form.getFieldValue('name'),
                password:this.form.getFieldValue('password')
              })}).then((res) => {
              this.logging = false
              const result = res.data
              if (result.code === 200) {
                console.log(result.data.user)
                const username=this.form.getFieldValue('name')
                let key="userName";
                let valu=username;
                result[key]=valu;
                const user = result
                console.log(result)
                console.log(user);
                let u=JSON.stringify(user)
                sessionStorage.setItem("user",u)
                console.log(sessionStorage.getItem("user"));
                this.$router.push('/userList/domesticConsumer')
                this.$store.commit('account/setuser', user)
                this.$message.success(result.message, 3)
              } else {
                console.log(res);
                this.error = result.message;
                setTimeout(()=> {
                  this.error="";
                  console.log(this.error)
                },2000)
                console.log(this.error)
              }
            })
          }
        })
      },
      // 登录
      loginDo () {
        Login({
          data:({
            userName:this.form.getFieldValue('name'),
            password:this.form.getFieldValue('password')
          })})
      .then(res => {
          console.log(res.data.data);
        })
          .catch(err => { console.log(err); });
      },
    }
  }
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background: #f0f2f5 url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px;
    background-size: 100%;
    .content {
      padding: 32px 0;
      flex: 1;
      @media (min-width: 768px){
        padding: 112px 0 24px;
      }
      .top {
        text-align: center;
        .header {
          height: 44px;
          line-height: 44px;
          a {
            text-decoration: none;
          }
          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
          }
          .title {
            font-size: 33px;
            color: rgba(0,0,0,.85);
            font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0,0,0,.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }
      .login{
        width: 368px;
        margin: 0 auto;
        @media screen and (max-width: 576px) {
          width: 95%;
        }
        @media screen and (max-width: 320px) {
          .captcha-button{
            font-size: 14px;
          }
        }
        .icon {
          font-size: 24px;
          color: rgba(0, 0, 0, 0.2);
          margin-left: 16px;
          vertical-align: middle;
          cursor: pointer;
          transition: color 0.3s;

          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }
</style>
