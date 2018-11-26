<template>
  <div class="redManage">
    <div class="priceDisplay">
      <div >
        <div>累计金额（元）</div>
        <div>￥{{userCount.amountTotal}}</div>
      </div>
      <a-divider style="width: 1px;height: 55px;margin-top:5px;float: left" type="vertical" />
      <div >
        <div>待领金额（元）</div>
        <div>￥{{userCount.amountWaitTotal}}</div>
      </div>
      <a-divider style="width: 1px;height: 55px;margin-top:5px;float: left" type="vertical" />
      <div >
        <div>累计红包数（个）</div>
        <div>{{userCount.redpackNum}}</div>
      </div>
      <a-divider style="width: 1px;height: 55px;margin-top:5px;float: left" type="vertical" />
      <div >
        <div>待领红包数（个）</div>
        <div>{{userCount.redpackWaitNum}}</div>
      </div>
    </div>
    <red-list></red-list>
  </div>
</template>

<script>
  import redList from "./redList";
  import { countRedpack } from "../../../api/user.js";
  export default {
    name: "redManage",
    data () {
      return {
        userCount:{},
      }
    },
    components:{
      redList
    },
    created () {
      this.countRed();
    },
    methods: {
      // 红包信息
      countRed () {
        countRedpack({
          data:({})})
          .then(res => {
            if(res.data.code===200) {
              this.userCount=res.data.data;
            } else {
              this.$message.info(res.data.message);
            }

          }).catch();
      },
    }
  }
</script>

<style scoped lang="less">
  .redManage{
    width: 100%;
    .priceDisplay{
      width: 100%;
      height: 105px;
      background-color: #fff;
      font-size: 14px;
      padding: 20px;
      text-align: center;
      >div{
        width: 23.5%;
        float: left;
        div{
          line-height: 32px;
        }
        div:nth-child(2){
          font-size: 24px;
          color: red;
        }
      }
    }
  }
</style>
