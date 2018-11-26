<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal" @submit="onSubmit" :autoFormCreate="(form)=>{this.form = form}">
        <a-row >
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="红包标题"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
              fieldDecoratorId="title"
            >
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="用户名"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
              fieldDecoratorId="userName"
            >
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="发出时间"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-date-picker
                format="YYYY-MM-DD"
                placeholder="发出时间"
                style="width: 100%"
                @change="thisTime"
                v-model="timitime"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="所在区域"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
              fieldDecoratorId="area"
            >
              <a-cascader :options="options" @change="onArea" placeholder="省市区" changeOnSelect />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="派发状态"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
              fieldDecoratorId="isFinish"
            >
              <a-select placeholder="请选择">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="NO">派发中</a-select-option>
                <a-select-option value="YES">派发完</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="审核状态"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
              fieldDecoratorId="isDisable"
            >
              <a-select placeholder="请选择">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="YES">禁用</a-select-option>
                <a-select-option value="NO">启用</a-select-option>
              </a-select>
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
        @userOnload="userOnload"
        :pagination="pagination"
        @userLList="userLList"
      >
      </s-table>
    </div>
  </a-card>
</template>
<script>
  import sTable from '../../../components/table/standardTableRed'
  import { redpack,getAll } from "../../../api/user.js";

  const columns = [
    { title: '发出时间',
      dataIndex: 'createDate',
    },
    { title: '红包标题',
      dataIndex: 'title',
    },
    { title: '用户名',
      dataIndex: 'userName',
    },
    { title: '总金额',
      dataIndex: 'totalAmount',
    },
    {
      title: '剩余金额',
      dataIndex: 'residueAmount',
    },
    {
      title: '总红包数',
      dataIndex: 'num',
    },
    {
      title: '待领红包',
      dataIndex: 'residueNum',
    },
    {
      title: '红包范围',
      dataIndex: 'area',
    },
    { title: '派发状态',
      key: 'state',
      scopedSlots: { customRender: 'type' }
    },
    { title: '审核状态',
      key: 'state',
      scopedSlots: { customRender: 'disabled' }
    },
    {
      title: '操作',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' },
    }
  ]

  export default {
    name: 'redList',
    components: {
      sTable
    },
    data () {
      return {
        columns: columns,
        advanced: true,
        dataSource: [],
        selectedRowKeys: [],
        selectedRows: [],
        options: [],
        mdl:{},
        datauser:[],
        country:"",
        timer:"",
        mesaData:{
          content:"",
          mode:"",
          sex:"",
          time:"",
          country:"",
        },
        pagination:{},
        applicationTime:"",
        numb:1,
        loading:false,
        selectDataSource:{},
        timitime:"",
        city:""
      }
    },
    created () {
      this.userLists(this.numb,10);
      this.getAll();
    },
    methods: {
      userOnload () {
        this.userLists(this.pagination.current,10);
      },
      thisTime (value) {
        console.log(value);
        this.applicationTime=value.format("YYYY-MM-DD");
        console.log(this.applicationTime)
      },
      // 获得省市区
      getAll () {
        getAll({
          data:({
          })})
          .then(res => {
            this.options=res.data.data;
          }).catch();
      },
      onArea (value){
        console.log(value);
        this.city=value;
      },
      // 封装消息信息
      userLists(page,limit,title,createDate,province,city,district,isFinish,isDisable,userName) {
        this.loading = true;
        redpack({
          data:({
            page: page,
            limit: limit,
            title: title,
            createDate: createDate,
            province: province,
            city: city,
            district: district,
            isFinish: isFinish,
            isDisable: isDisable,
            userName: userName
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
        console.log(2222)
        this.form.validateFields((error, values) => {
          console.log('Received values of form: ', values,this.applicationTime,this.city);
          this.selectDataSource=values;
          const pager = { ...this.pagination };
          pager.current=1;
          this.pagination=pager;
          console.log(222)
           this.userLists(1,10,values.title,this.applicationTime,this.city[0] || "",this.city[1] || "",this.city[2] || "",values.isFinish,values.isDisable,values.userName);
        })
      },
      handleReset () {
        this.applicationTime="";
        this.form.resetFields();
        this.city=[];
        this.timitime="";
        this.selectDataSource={};
        this.userLists(this.numb,10);
        const pager = { ...this.pagination };
        pager.current=1;
        this.pagination=pager
      },
      userLList(pagination){
        console.log(pagination);
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.userLists(pagination.current,pagination.pageSize,this.selectDataSource.title,this.applicationTime,this.city[0] || "",this.city[1] || "",this.city[2] || "",this.selectDataSource.isFinish,this.selectDataSource.isDisable,this.selectDataSource.userName);
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



