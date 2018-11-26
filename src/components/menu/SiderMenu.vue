<template>
  <a-layout-sider class="thisFixed" :class="[theme, 'sider', isMobile ? null : 'shadow']" width="256px" :collapsible="collapsible" v-model="collapsed" :trigger="null">
    <div :class="['logo', theme]">
      <router-link to="/userList/domesticConsumer">
        <img src="static/img/logo.png">
        <h1>{{systemName}}</h1>
      </router-link>
    </div>
    <i-menu :theme="theme" :collapsed="collapsed" :menuData="menuData" @select="onSelect"/>
  </a-layout-sider>
</template>

<script>
import IMenu from './menu'
export default {
  name: 'redpack',
  components: {IMenu},
  props: {
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menuData: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    }
  },
  created () {
    this.menuData=this.menuData.splice(5,6);
    console.log(this.menuData)
  },
  computed: {
    isMobile () {
      return this.$store.state.setting.isMobile
    },
    systemName () {
      return this.$store.state.setting.systemName
    }
  },
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    }
  }
}
</script>

<style lang="less" scoped>
  .thisFixed{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
  }
  @media screen and (max-width: 1400px) {
    .thisFixed{
      width: 180px;
    }
  }
  .shadow{
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
  }
  .sider{
    z-index: 10;
    &.light{
      background-color: #fff;
    }
    &.dark{
      background-color: #001529;
    }
    .logo{
      height: 64px;
      position: relative;
      line-height: 64px;
      padding-left: 24px;
      -webkit-transition: all .3s;
      transition: all .3s;
      overflow: hidden;
      &.light{
        background-color: #fff;
        h1{
          color: #1890ff;
        }
      }
      &.dark{
        background-color: #002140;
        h1{
          color: #fff;
        }
      }
      h1{
        color: #fff;
        font-size: 20px;
        margin: 0 0 0 12px;
        font-family: "Myriad Pro","Helvetica Neue",Arial,Helvetica,sans-serif;
        font-weight: 600;
        display: inline-block;
        height: 32px;
        line-height: 32px;
        vertical-align: middle;
      }
      img{
        width: 32px;
        height: 32px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
</style>
