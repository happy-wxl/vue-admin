<template>
<div class="domesticConsumer">
  <div class="priceDisplay">
    <div >
      <div>总注册用户（人）</div>
      <div>{{userCount.countUser}}</div>
    </div>
    <a-divider style="width: 1px;height: 55px;margin-top:5px;float: left" type="vertical" />
    <div >
      <div>实时新增用户（人）</div>
      <div>{{userCount.newUserDay}}</div>
    </div>
    <a-divider style="width: 1px;height: 55px;margin-top:5px;float: left" type="vertical" />
    <div >
      <div>日活跃用户（人）</div>
      <div>{{userCount.activeUserDay}}</div>
    </div>
    <a-divider style="width: 1px;height: 55px;margin-top:5px;float: left" type="vertical" />
    <div >
      <div>月活跃用户（人）</div>
      <div>{{userCount.activeUserMonth}}</div>
    </div>
  </div>
  <user-list-show></user-list-show>
</div>
</template>

<script>
  import userListShow from "./userList"
  import upLoad from "../upLoad/upLoad"
  import { userList, countUsers } from "../../api/user.js";

    export default {
        name: "domesticConsumer",
      components: {
        userListShow,
        upLoad,
      },
      data () {
          return {
            userCount:{},
          }
      },
      created () {
          this.countUsers();
      },
      methods: {
        // 推广用户信息
        countUsers () {
          countUsers({
            data:({})})
            .then(res => {
              this.userCount=res.data.data;

            }).catch();
        },
      }
    }
</script>

<style scoped lang="less">
.domesticConsumer{
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
