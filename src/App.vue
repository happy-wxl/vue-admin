<template>
  <a-locale-provider :locale="zh_CN">
  <div id="app">
    <router-view/>
  </div>
  </a-locale-provider>
</template>

<script>
import enquireScreen from './utils/device'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
export default {
  name: 'App',
  data () {
    return {
      zh_CN
    }
  },
  created () {
    let _this = this
    enquireScreen(isMobile => {
      _this.$store.commit('setting/setDevice', isMobile)
    })
  }
}
</script>

<style lang="less">
  :global{
    //拖拽控件全局样式
    .dragable-ghost{
      border: 1px dashed #aaaaaa;
      opacity: 0.65;
    }
    .dragable-chose{
      border: 1px dashed #aaaaaa;
      opacity: 0.65;
    }
    .dragable-drag{
      border: 1px dashed #aaaaaa;
      opacity: 0.65;
    }
    //页面切换动画
    .page-toggle-enter-active{
      transition: all 0.2s ease-in 0.25s;
    }
    .page-toggle-leave-active{
      transition: all 0.2s ease-out 0s;
    }
    .page-toggle-enter, .page-toggle-leave-to{
      opacity: 0;
      padding: 0px;
    }
  }
</style>
