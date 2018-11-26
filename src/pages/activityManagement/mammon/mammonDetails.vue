<template>
  <page-layout title="活动详情">
    <a-card :bordered="false">
      <detail-list title="活动详情">
        <detail-list-item term="活动标题">{{userData.title}}</detail-list-item>
        <detail-list-item term="活动模式">{{userData.mode==="TEMP"?"单次":"循环"}}</detail-list-item>
        <detail-list-item term="活动时间">{{userData.startTime | FormatDate}}~{{userData.endTime | FormatDate}}</detail-list-item>
        <detail-list-item term="投放区域">全国</detail-list-item>
        <detail-list-item term="允许加入">{{userData.canJoin==="NO"?"不允许":"允许"}}</detail-list-item>
        <detail-list-item term="抽中概率">{{userData.probability}}%</detail-list-item>
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
  import { getConfigDetail } from "../../../api/user.js";
  export default {
    name: 'mammonDetails',
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
        getConfigDetail({
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

