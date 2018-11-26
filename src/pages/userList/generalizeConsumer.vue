<template>
  <div class="domesticConsumer">
    <div class="priceDisplay">
      <div >
        <div>推广员总数（人）</div>
        <div>{{dataList.promoters}}</div>
      </div>
      <a-divider style="width: 1px;height: 55px;margin-top:5px;float: left" type="vertical" />
      <div >
        <div>实时新增（人）</div>
        <div>{{dataList.promotersDay}}</div>
      </div>
      <a-divider style="width: 1px;height: 55px;margin-top:5px;float: left" type="vertical" />
      <div >
        <div>直属用户总数（人）</div>
        <div>{{dataList.childUser}}</div>
      </div>
    </div>
    <generalize-list></generalize-list>
  </div>
</template>

<script>
  import generalizeList from "./generalizeList"
  import upLoad from "../upLoad/upLoad"
  import {countPromoters } from "../../api/user.js";

  export default {
    name: "generalizeConsumer",
    data () {
      return {
        dataList:{}
      }
    },
    components: {
      generalizeList,
      upLoad,
    },
    created () {
      this.countPromoters();
    },
    methods:{
      countPromoters () {
        countPromoters({
          data:({})})
          .then(res => {
            this.dataList=res.data.data;

          }).catch();
      },
      userOnload () {
        this.userList()
      },
    }
  }
</script>

<style scoped lang="less">
  .domesticConsumer{
    .priceDisplay{
      width: 100%;
      height: 105px;
      background-color: #fff;
      font-size: 14px;
      padding: 20px;
      text-align: center;
      >div{
        width: 32%;
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

