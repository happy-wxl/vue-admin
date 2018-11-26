<template>
  <page-layout title="红包详情">
    <a-card :bordered="false">
      <detail-list title="红包信息">
        <detail-list-item term="发出时间">{{userData.createDate}}</detail-list-item>
        <detail-list-item term="状态">{{userData.isFinish==="YES"?"派发完":"派发中"}}</detail-list-item>
        <!--<detail-list-item term="红包编号">{{userData.id}}</detail-list-item>-->
        <!--<detail-list-item term="用户ID">{{userData.userId}}</detail-list-item>-->
        <detail-list-item term="发放用户">{{userData.userName}}</detail-list-item>
        <detail-list-item term="手机号">{{userData.mobile}}</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px"/>
      <detail-list title="红包设置">
        <detail-list-item term="红包总额">{{userData.amount || 0}}元</detail-list-item>
        <detail-list-item term="剩余总额">{{userData.residueAmount || 0}}元</detail-list-item>
        <detail-list-item term="红包总数">{{userData.num || 0}}个</detail-list-item>
        <detail-list-item term="剩余总数">{{userData.residueNum || 0}}个</detail-list-item>
        <detail-list-item term="发放范围">{{userData.area}}</detail-list-item>
        <detail-list-item term="发放地点">{{userData.site}}</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px"/>
      <detail-list title="分享信息">
        <detail-list-item term="阅读次数">{{userData.browseNum}}次</detail-list-item>
        <detail-list-item term="点赞数">{{userData.likeNum}}次</detail-list-item>
        <detail-list-item term="收藏数">{{userData.collectNum}}次</detail-list-item>
        <detail-list-item term="转发次数">{{userData.shareNum}}次</detail-list-item>
        <detail-list-item term="评论数">{{userData.commentNum}}次</detail-list-item>
        <detail-list-item term="评论人数">{{userData.commentPeopleNum}}人</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px"/>
      <detail-list title="红包内容">
        <detail-list-item term="红包标题" style="width: 40%">{{userData.title}}</detail-list-item>
        <detail-list-item term="红包链接" style="width: 60%">{{userData.redpackUrl}}</detail-list-item>
        <detail-list-item term="内容信息" style="width: 100%">{{userData.description}}</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px"/>
      <detail-list title="图片详情">
        <detail-list-item v-for="item in userData.images" :key="item" ><img style="height: 300px;width: 400px" :src="item.url" alt=""></detail-list-item>
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
  import { redpackDetail } from "../../../api/user.js";
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
        this.redpackDetail();
      });
    },
    mounted () {
      this.$nextTick(() => {
        this.getDetail();
      });
    },
    methods:{
      // 普通用户信息详情
      redpackDetail () {
        redpackDetail({
          data:({
            id:this.$store.state.account.userId
          })})
          .then(res => {
            this.userData=res.data.data;
            console.log(this.userData);
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
