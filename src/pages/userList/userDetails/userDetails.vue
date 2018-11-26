<template>
  <page-layout title="普通用户详情">
    <a-card :bordered="false">
      <detail-list title="用户信息">
        <detail-list-item term="注册日期">{{userData.userInfo.createTime | FormatDate}}</detail-list-item>
        <detail-list-item term="状态">{{userData.userInfo.status==="NORMAL"?"启用":"禁用"}}</detail-list-item>
        <detail-list-item term="最后登录时间">{{userData.userInfo.lastLoginTime | FormatDate}}</detail-list-item>
        <!--<detail-list-item term="用户ID">{{userData.userInfo.userId}}</detail-list-item>-->
        <detail-list-item term="用户手机号">{{userData.userInfo.mobile}}</detail-list-item>
        <detail-list-item term="所在地址">{{userData.userInfo.area}}</detail-list-item>
        <detail-list-item term="用户昵称">{{userData.userInfo.nickName}}</detail-list-item>
        <detail-list-item term="推荐人">{{userData.userInfo.referee}}</detail-list-item>
        <detail-list-item term="最后登录地址">{{userData.userInfo.lastLoginArea}}</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px"/>
      <detail-list title="钱包信息">
        <detail-list-item term="钱包余额">{{userData.walletInfo.currentAmount || 0}}元</detail-list-item>
        <detail-list-item term="发出红包">{{userData.walletInfo.publishRed || 0}}元</detail-list-item>
        <detail-list-item term="收到红包">{{userData.walletInfo.receiveRed || 0}}元</detail-list-item>
        <detail-list-item term="提现金额">{{userData.walletInfo.withdrawAmount || 0}}元</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px"/>
      <detail-list title="推广信息">
        <detail-list-item term="推广收益">{{userData.promoterInfo.promoterProfitAmount || 0}}元</detail-list-item>
        <detail-list-item term="类型">{{userData.promoterInfo.level==="VIP"?"超级推广员":"普通用户"}}</detail-list-item>
        <!--<detail-list-item term="资格有效期">{{userData.promoterInfo.expiryDate | FormatDate}}</detail-list-item>-->
        <detail-list-item term="直属用户">{{userData.promoterInfo.childNum || 0}}人</detail-list-item>
        <detail-list-item term="直属收益">{{userData.promoterInfo.childProfitAmount || 0}}元</detail-list-item>
        <detail-list-item term="直属收益率">{{userData.promoterInfo.childProfit || 0}}</detail-list-item>
        <detail-list-item term="下属用户">{{userData.promoterInfo.subChildNum || 0}}人</detail-list-item>
        <detail-list-item term="下属收益">{{userData.promoterInfo.subChildProfitAmount || 0}}元</detail-list-item>
        <detail-list-item term="下属收益率">{{userData.promoterInfo.subChildProfit || 0}}</detail-list-item>
        <detail-list-item term="所属公司">{{userData.promoterInfo.company}}</detail-list-item>
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
  import { getDetail } from "../../../api/user.js";
  export default {
    name: 'userDetails',
    components: {PageLayout, DetailListItem, DetailList},
    data () {
      return {
        goodsColumns,
        goodsData,
        scheduleColumns,
        scheduleData,
        userData:{},
        userIdNew:this.$store.state.account.userId,
      }
    },
    created () {
      this.$nextTick(() => {
        this.getDetail();
      });
    },
    mounted () {
      this.$nextTick(() => {
        this.getDetail();
      });
    },
    methods:{
      // 普通用户信息详情
      getDetail () {
        getDetail({
          data:({
            userId:this.$store.state.account.userId
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
