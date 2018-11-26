<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal" @submit="onSubmit" :autoFormCreate="(form) => this.form = form">
          <a-row >
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="用户昵称"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="nickName"
              >
                <a-input placeholder="请输入用户昵称" v-model="searchData.nickName" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="用户手机号"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="mobile"
              >
                <a-input placeholder="请输入手机号" v-model="searchData.mobile" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="注册日期"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                okText="确定"
              >
                <a-date-picker
                  format="YYYY-MM-DD"
                  placeholder="注册日期"
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
                label="用户状态"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="status"
              >
                <a-select placeholder="请选择" v-model="searchData.status">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="NORMAL">启用</a-select-option>
                  <a-select-option value="DISABLE">禁用</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="用户类型"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="level"
              >
                <a-select placeholder="请选择" v-model="searchData.level">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="NORMAL">普通</a-select-option>
                  <a-select-option value="VIP">超级推广员</a-select-option>
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
      <div class="operator">
        <a-button @click="showModal1">批量设置超级推广员</a-button>
        <a-modal
          title="绑定为超级推广员"
          :visible="visible1"
          @ok="handleOk1"
          :confirmLoading="confirmLoading"
          @cancel="handleCancel1"
          okText="确认"
          cancelText="取消"
        >
          <el-card class="box-card">
            <div v-for="item in selectedRows" :key="item" class="text item">
              <span style="width: 50%;text-align: right;display: inline-block;margin-right: 10px;font-weight: bold">{{item.nickName}}：</span><span>{{item.mobile}}</span>
              <span style="width: 100%;height:1px;display: inline-block;border-top: 1px solid #c3c3c3"></span>
            </div>
          </el-card>
        </a-modal>
      </div>
      <s-table
        :columns="columns"
        :dataSource="dataSource"
        :selectedRows="selectedRows"
        @change="onchange"
        :loading="loading"
        @userOnload="userOnload"
        :pagination="pagination"
        @userLList="userLList"
        ref="c1"
      />
    </div>
  </a-card>
</template>
<script>
  import sTable from '../../components/table/StandardTable'
  import { userList,updatePromoter,getAll } from "../../api/user.js";
  const columns = [
    { title: '注册日期',
      dataIndex: 'registerTime'
      },
    {
      title: '用户昵称',
      dataIndex: 'nickName'
    },
    {
      title: '用户手机号',
      dataIndex: 'mobile',
    },
    {
      title: '账户余额',
      dataIndex: 'currentAmount',
      sorter: true,
      needTotal: true,
    },
    {
      title: '领取红包',
      dataIndex: 'receiveRed',
      sorter: true,
      needTotal: true,
    },
    { title: '用户类型', key: 'state', scopedSlots: { customRender: 'status' } },
    {
      title: '所在区域',
      dataIndex: 'area',
      sorter: true
    },
    { title: '用户状态', key: 'state', scopedSlots: { customRender: 'open' } },
    {
      title: '操作',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'action' },
    },
  ]
  export default {
    name: 'userList',
    components: {
      sTable
    },
    data () {
      return {
        advanced: true,
        columns: columns,
        dataSource: [],
        user:[],
        user1:[],
        selectedRowKeys: [],
        selectedRows: [],
        timer:1,
        options: [],
        searchVal:'',
        searchData:{
          nickName:"",
          mobile:"",
          createTime:"",
          country:"",
          level:"",
          status:"",
          registerDate:""
        },
        visible1:false,
        confirmLoading: false,
        pagination:{},
        city:[],
        total:0,
        total1:0,
        numb:1,
        loading:false,
        selcetData:[],
        timitime:"",
        show:false
      }
    },
    created () {
      this.userList(this.numb);
      this.getAll();
    },
    methods: {
      // 封装用户信息
      userLists(level,page,limit,nickName,mobile,status,registerDate,province,city,district) {
        this.loading = true;
        userList({
          data:({
            level: level,
            page: page,
            limit: limit,
            nickName: nickName,
            mobile: mobile,
            status: status,
            registerDate: registerDate,
            province: province,
            city: city,
            district: district
          })})
          .then(res => {
            this.user=res.data.data.list;
            console.log(this.user)
            this.dataSource=this.user
            const pagination = { ...this.pagination };
            pagination.total = res.data.data.total;
            this.loading = false;
            this.pagination = pagination;

          }).catch();
      },
      onChanged(value) {
        console.log(value);
      },
      getAll () {
        getAll({
          data:({
          })})
          .then(res => {
       this.options=res.data.data;
          }).catch();
      },
      onSubmit (e) {
        e.preventDefault()
        this.form.validateFields((error, values) => {
          console.log('Received values of form: ', values)
          const pager = { ...this.pagination };
          pager.current=1;
          this.pagination=pager
          this.userLists(this.searchData.level,1,10,this.searchData.nickName,this.searchData.mobile,this.searchData.status,this.searchData.registerDate,this.city[0] || "",this.city[1] || "",this.city[2] || "");
        })
      },
      handleReset () {
        this.form.resetFields();
        this.searchData.level="";
         this.searchData.nickName="";
          this.searchData.mobile="";
          this.searchData.status="";
          this.searchData.registerDate="";
          this.timitime=""
          this.city=[];
        this.userLists("",1,10,"","","","","","","");
        const pager = { ...this.pagination };
         pager.current=1;
         this.pagination=pager
      },
      userLList(pagination, filters, sorter){
        console.log(pagination);
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
          this.userLists(this.searchData.level,pagination.current,pagination.pageSize,this.searchData.nickName,this.searchData.mobile,this.searchData.status,this.searchData.registerDate,this.city[0] || "",this.city[1] || "",this.city[2] || "");

      },
      showModal1() {
        if (this.show===true) {
          this.visible1 = true
        } else {
          this.show=false;
          this.$message.info("请选择用户，设置超级推广员");
        }

      },
      handleOk1(e) {
        this.selcetData=[]
        this.selectedRows.forEach((item)=>{
          updatePromoter({
            data:({
              mobile: item.mobile,
            })})
            .then(res => {
              console.log("设置成功");
              this.userLists(this.searchData.level,this.pagination.current,10,this.searchData.nickName,this.searchData.mobile,this.searchData.status,this.searchData.registerDate,this.city[0] || "",this.city[1] || "",this.city[2] || "");
            }).catch();
          if(!item.mobile){
          }
        })
        let a=this.selectedRows.filter(v=>v.mobile!=="未绑定")
        this.ModalText = 'The modal will be closed after two seconds';
        console.log(a.length)
        if (a.length<this.selectedRows.length) {
          this.$message.info('您选择的用户中有未绑定手机号的账户，该账户无法设为超级推广员。');
        }
        this.confirmLoading = true;
        setTimeout(() => {
          this.visible1 = false;
          this.confirmLoading = false;
          this.$refs.c1.onClearSelected();
        }, 2000);

      },
      handleCancel1(e) {
        console.log('Clicked cancel button');
        this.visible1 = false
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
      onchange (selectedRowKeys, selectedRows) {
        console.log(selectedRowKeys,selectedRows)
        if (selectedRowKeys.length>0) {
          console.log(selectedRowKeys.length)
          this.show=true;
          console.log(this.show)
        }  else {
          this.show=false;
        }
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      remove () {
        this.dataSource = this.dataSource.filter(item => this.selectedRowKeys.indexOf(item.key) < 0)
        this.selectedRows = this.selectedRows.filter(item => this.selectedRowKeys.indexOf(item.key) < 0)
      },
      addNew () {
      },
      thisTime (value) {
        console.log(value);
        this.searchData.registerDate=value.format("YYYY-MM-DD");
        console.log(this.searchData.registerDate)
      },
      onArea (value){
        console.log(value);
        this.city=value;
        this.searchData.country=value.join("");
        console.log(this.searchData.country)
      },
      handleMenuClick (e) {
        if (e.key === 'delete') {
          this.remove()
        }
      },
      // 普通用户信息
      userList (obj) {
        this.loading = true
        userList({
          data:({
            level: "",
            page: obj,
            limit: 10
          })})
          .then(res => {
            this.user=res.data.data.list;
            console.log()
            this.dataSource=this.user
            console.log(this.total);
            // this.pagination.pageNum=res.data.data.pageNum;
            //   this.pagination.pageSize=res.data.data.pageSize;
            //   this.pagination.total=res.data.data.total;
            //   this.pagination.pages=res.data.data.pages;
            const pagination = { ...this.pagination };
            pagination.total = res.data.data.total;
            this.loading = false;
            this.pagination = pagination;
          }).catch();
      },
      userOnload () {
        this.userList(this.pagination.current);
      },
    },
    watch:{
      searchData:{
        handler (val){
          if(val.nickName===""){
            this.dataSource=this.user;
          }
        },
        deep:true
      }
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
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>

