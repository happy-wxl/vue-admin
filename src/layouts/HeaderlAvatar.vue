<template>
  <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial" >
    <span style="cursor: pointer">
      <a-avatar class="avatar" size="small" shape="circle" src="https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png"/>
      <span>{{currUser.userName}}</span>
    </span>
    <a-menu style="width: 150px" slot="overlay">
      <!--<a-menu-item>-->
        <!--<a-icon type="user" />-->
        <!--<span>个人中心</span>-->
      <!--</a-menu-item>-->
      <!--<a-menu-item>-->
        <!--<a-icon type="setting" />-->
        <!--<span>设置</span>-->
      <!--</a-menu-item>-->
      <!--<a-menu-divider />-->
      <a-menu-item @click="loginOut">
          <a-icon type="poweroff" />
          <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  name: 'HeaderAvatar',
  data () {
    return {
      name:""
    }
  },
  computed: {
    currUser () {
      console.log(this.$store.state.account.user);
      return this.$store.state.account.user;

    }
  },
  methods:{
    loginOut () {
      this.$router.replace("/login");
      this.$store.state.account.user={};
      sessionStorage.removeItem("user")
      console.log(this.$store.state.account.user);
    }
  }
}
</script>

<style lang="less" scoped>
  .avatar{
    margin: 20px 4px 20px 0;
    color: #1890ff;
    background: hsla(0,0%,100%,.85);
    vertical-align: middle;
  }
</style>
