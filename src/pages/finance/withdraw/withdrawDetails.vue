<template>
  <page-layout title="交易详情">
    <a-card :bordered="false">
      <detail-list title="交易信息">
        <detail-list-item term="申请时间">{{userData.createTime | FormatDate}}</detail-list-item>
        <detail-list-item term="交易流水号">{{userData.orderNo}}</detail-list-item>
        <!--<detail-list-item term="用户ID">{{userData.userId}}</detail-list-item>-->
        <detail-list-item term="用户名">{{userData.userName}}</detail-list-item>
        <detail-list-item term="手机号">{{userData.mobile}}</detail-list-item>
        <detail-list-item term="所在地址">{{userData.area}}</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px"/>
      <detail-list title="金融信息">
        <detail-list-item term="交易金额">{{userData.amount}}元</detail-list-item>
        <detail-list-item term="交易类型">提现</detail-list-item>
        <detail-list-item term="交易渠道">{{userData.type==="WECHAT"?"微信":"支付宝"}}</detail-list-item>
        <detail-list-item term="提现账号">{{userData.withdrawAccount}}</detail-list-item>
        <detail-list-item term="交易状态" >
          <span v-if="userData.tradStatus==='INIT'">新建</span>
          <span v-else-if="userData.tradStatus==='SUCCESS'">成功</span>
          <span v-else-if="userData.tradStatus==='FAIL'">失败</span>
          </detail-list-item>
        <detail-list-item term="钱包余额">{{userData.currentAmount}}元</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px"/>
      <detail-list title="操作记录">
        <detail-list-item term="审批人">{{userData.approveName}}</detail-list-item>
        <detail-list-item term="审批时间">{{userData.updateTime | FormatDate}}</detail-list-item>
        <detail-list-item term="审批结果">
          <span v-if="userData.status==='INIT'">待审核</span>
          <span v-else-if="userData.status==='SUCCESS'">同意</span>
          <span v-else-if="userData.status==='FAIL'">拒绝</span>
        </detail-list-item>
      </detail-list>
    </a-card>
  </page-layout>
</template>

<script>
  import DetailList from '../../../components/tool/DetailList'
  import PageLayout from '../../../layouts/PageLayout'

  const DetailListItem = DetailList.Item

  const goodsColumns = [
    {
      title: '商品编号',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '商品条码',
      dataIndex: 'barcode',
      key: 'barcode'
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      align: 'right'
    },
    {
      title: '数量（件）',
      dataIndex: 'num',
      key: 'num',
      align: 'right'
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right'
    }
  ]

  const goodsData = [
    {
      id: '1234561',
      name: '矿泉水 550ml',
      barcode: '12421432143214321',
      price: '2.00',
      num: '1',
      amount: '2.00'
    },
    {
      id: '1234562',
      name: '凉茶 300ml',
      barcode: '12421432143214322',
      price: '3.00',
      num: '2',
      amount: '6.00'
    },
    {
      id: '1234563',
      name: '好吃的薯片',
      barcode: '12421432143214323',
      price: '7.00',
      num: '4',
      amount: '28.00'
    },
    {
      id: '1234564',
      name: '特别好吃的蛋卷',
      barcode: '12421432143214324',
      price: '8.50',
      num: '3',
      amount: '25.50'
    }
  ]

  const scheduleColumns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time'
    },
    {
      title: '当前进度',
      dataIndex: 'rate',
      key: 'rate'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: '操作员ID',
      dataIndex: 'operator',
      key: 'operator'
    },
    {
      title: '耗时',
      dataIndex: 'cost',
      key: 'cost'
    }
  ]

  const scheduleData = [
    {
      key: '1',
      time: '2017-10-01 14:10',
      rate: '联系客户',
      status: 'processing',
      operator: '取货员 ID1234',
      cost: '5mins'
    },
    {
      key: '2',
      time: '2017-10-01 14:05',
      rate: '取货员出发',
      status: 'success',
      operator: '取货员 ID1234',
      cost: '1h'
    },
    {
      key: '3',
      time: '2017-10-01 13:05',
      rate: '取货员接单',
      status: 'success',
      operator: '取货员 ID1234',
      cost: '5mins'
    },
    {
      key: '4',
      time: '2017-10-01 13:00',
      rate: '申请审批通过',
      status: 'success',
      operator: '系统',
      cost: '1h'
    },
    {
      key: '5',
      time: '2017-10-01 12:00',
      rate: '发起退货申请',
      status: 'success',
      operator: '用户',
      cost: '5mins'
    }
  ]
  import { userWithdrawDetail } from "../../../api/user.js";

  export default {
    name: 'withdrawDetails',
    components: {PageLayout, DetailListItem, DetailList},
    data () {
      return {
        goodsColumns,
        goodsData,
        scheduleColumns,
        scheduleData,
        userData:{},
      }
    },
    created () {
      this.$nextTick(() => {
        this.userWithdrawDetail();
      });
    },
    methods:{
      // 普通用户信息详情
      userWithdrawDetail () {
        userWithdrawDetail({
          data:({
            id:this.$store.state.account.userId
          })})
          .then(res => {
            this.userData=res.data.data;
          }).catch();
      },
    }
  }
</script>

<style lang="less" scoped>
  .title {
    color: rgba(0,0,0,.85);
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
</style>


