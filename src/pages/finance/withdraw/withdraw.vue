<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal" @submit="onSubmit" :autoFormCreate="(form)=>{this.form = form}">
          <a-row >
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="流水号"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="orderNo"
              >
                <a-input placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="用户姓名"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="userName"
              >
                <a-input placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="用户手机号"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="mobile"
              >
                <a-input placeholder="请输入" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="advanced">
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="申请时间"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"

              >
                <a-date-picker
                  format="YYYY-MM-DD"
                  placeholder="申请时间"
                  style="width: 100%"
                  @change="thisTime"
                  v-model="timitime"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="提现渠道"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="type"
              >
                <a-select placeholder="请选择">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="WECHAT">微信</a-select-option>
                  <a-select-option value="ALI">支付宝</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="审批状态"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="status"
              >
                <a-select placeholder="请选择">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="INIT">待审核</a-select-option>
                  <a-select-option value="SUSSESS">同意</a-select-option>
                  <a-select-option value="FAIL">拒绝</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="审批人"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="approveName"
              >
                <a-input placeholder="请输入" />
              </a-form-item>
            </a-col>
          </a-row>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary" htmlType='submit'>查询</a-button>
          <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
        </span>
      </a-form>
    </div>
    <div>
      <s-table
        :columns="columns"
        :dataSource="dataSource"
        :selectedRows="selectedRows"
        @change="onchange"
        @userOnload="userOnload"
        :pagination="pagination"
        @userLList="userLList"
      />
    </div>
  </a-card>
</template>
<script>
  import sTable from '../../../components/table/StandardTable6'
  import { userWithdraw } from "../../../api/user.js";
  const columns = [
    { title: '申请时间',
      dataIndex:"applicationTime"
    },
    {
      title: '流水号',
      dataIndex: 'orderNo'
    },
    {
      title: '用户姓名',
      dataIndex: 'userName'
    },
    {
      title: '用户手机号',
      dataIndex: 'mobile',
      sorter: true
    },
    {
      title: '提现金额',
      dataIndex: 'amount',
      sorter: true,
      needTotal: true,
    },
    { title: '提现渠道', key: 'state', scopedSlots: { customRender: 'type' } },
    {
      title: '账号名',
      dataIndex: 'accountName',
      needTotal: true
    },
    { title: '审批状态', key: 'state', scopedSlots: { customRender: 'open' } },
    {
      title: '审批人',
      dataIndex: 'approveName',
      sorter: true
    },
    {
      title: '操作',
      key: 'operation',
      scopedSlots: { customRender: 'action' },
    },
  ]
  export default {
    name: 'withdraw',
    components: {
      sTable
    },
    data () {
      return {
        advanced: true,
        columns: columns,
        dataSource: [],
        selectedRowKeys: [],
        selectedRows: [],
        options: [],
        searchVal:'',
        user:[],
        datauser:[],
        searchData:{
          no1:"",
          no2:""
        },
        pagination:{},
        applicationTime:"",
        numb:1,
        loading:false,
        selectDataSource:{},
        timitime:""
      }
    },
    created () {
      this.userWithdraw(this.numb);
    },
    methods: {
      userWithdraw(obj) {
        userWithdraw({
          data:({
            page: obj,
            limit: 10
          })})
          .then(res => {
            this.datauser=res.data.data.list;
            console.log(this.datauser)
            this.dataSource=this.datauser
            const pagination = { ...this.pagination };
            pagination.total = res.data.data.total;
            this.loading = false;
            this.pagination = pagination;

          }).catch();
      },
      thisTime (value) {
        console.log(value);
        this.applicationTime=value.format("YYYY-MM-DD");
        console.log(this.applicationTime)
      },
      // 封装提现信息
      userLists(page,limit,orderNo,userName,mobile,registerDate,type,status,approveName) {
        this.loading = false;
        userWithdraw({
          data:({
            page: page,
            limit: limit,
            orderNo: orderNo,
            userName: userName,
            mobile: mobile,
            registerDate: registerDate,
            type: type,
            status: status,
            approveName: approveName
          })})
          .then(res => {
            this.datauser=res.data.data.list;
            console.log(this.datauser)
            this.dataSource=this.datauser
            const pagination = { ...this.pagination };
            pagination.total = res.data.data.total;
            this.loading = false;
            this.pagination = pagination;

          }).catch();
      },
      onSubmit (e) {
        e.preventDefault()
        this.form.validateFields((error, values) => {
          console.log('Received values of form: ', values)
          this.selectDataSource=values;
          const pager = { ...this.pagination };
          pager.current=1;
          this.pagination=pager
          this.userLists(1,10,values.orderNo,values.userName,values.mobile,this.applicationTime,values.type,values.status,values.approveName);
        })
      },
      handleReset () {
        this.applicationTime="";
        this.timitime="";
        this.form.resetFields();
        this.selectDataSource={};
        this.userWithdraw(this.numb);
        const pager = { ...this.pagination };
        pager.current=1;
        this.pagination=pager
      },
      userLList(pagination){
        console.log(pagination);
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.userLists(pagination.current,pagination.pageSize,this.selectDataSource.orderNo,this.selectDataSource.username,this.selectDataSource.mobile,this.applicationTime,this.selectDataSource.type,this.selectDataSource.status,this.selectDataSource.approveName);

      },
      userOnload () {
        this.userWithdraw(this.pagination.current);
      },
      onChanged(value) {
        console.log(value);
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
      onchange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      remove () {
        this.dataSource = this.dataSource.filter(item => this.selectedRowKeys.indexOf(item.key) < 0)
        this.selectedRows = this.selectedRows.filter(item => this.selectedRowKeys.indexOf(item.key) < 0)
      },
      addNew () {
        this.dataSource.unshift({
          key: this.dataSource.length,
          no: 'NO ' + this.dataSource.length,
          description: '用户手机号位置',
          callNo: Math.floor(Math.random() * 1000),
          status: Math.floor(Math.random() * 10) % 4,
          updatedAt: '2018-07-26'
        })
      },
      handleMenuClick (e) {
        if (e.key === 'delete') {
          this.remove()
        }
      },

    }
  }
</script>

<style lang="less" scoped>
  .search{
    margin-bottom: 54px;
  }
  .fold{
    width: calc(100% - 216px);
    display: inline-block
  }
  .operator{
    margin-bottom: 18px;
  }
  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>



