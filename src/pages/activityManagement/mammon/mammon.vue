<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal" @submit="onSubmit" :autoFormCreate="(form) => this.form = form">
        <a-row >
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="活动标题"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
              fieldDecoratorId="title"
            >
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="活动模式"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
              fieldDecoratorId="mode"
            >
              <a-select placeholder="请选择">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="TEMP">单次</a-select-option>
                <a-select-option value="FOREVER">循环</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="创建时间"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-date-picker
                format="YYYY-MM-DD"
                placeholder="创建时间"
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
              label="发放地区"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
              fieldDecoratorId="area"
            >
              <a-select placeholder="请选择" style="width: 100%">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="COUNTRY">全国</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="活动状态"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
              fieldDecoratorId="status"
            >
              <a-select placeholder="请选择">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="NORMAL">启用</a-select-option>
                <a-select-option value="DISABLE">禁用</a-select-option>
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
        <a-button type="primary" @click="showModal">新增活动</a-button>
        <a-modal
          title="活动设置"
          :visible="visible"
          @ok="handleOk"
          :confirmLoading="confirmLoading"
          @cancel="handleCancel"
          zIndex=5
          okText="确认"
          cancelText="取消"
          destroyOnClose="true"
        >
          <a-form>
          <a-form-item
            label="活动标题"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 14, offset: 0}"
          >
            <a-input placeholder="请输入活动标题" v-model="activtyData.title" />
          </a-form-item>
          <a-form-item
            label="活动时间"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 14, offset: 0}"
          >
            <a-date-picker
              style="width: 100%"
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="开始时间"
              @change="onChangeded"
              @ok="onOk"
              v-model="activtyData.time"
              :disabledDate="disabledDate"
              :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
              :showToday="false"
            />
          </a-form-item>
          <a-form-item
            label="活动模式"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 14, offset: 0}"
          >
            <a-select placeholder="请选择" style="width: 100%" v-model="activtyData.type">
              <a-select-option value="TEMP">单次</a-select-option>
              <a-select-option value="FOREVER">循环</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="投放区域"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 14, offset: 0}"
          >
            <a-select placeholder="请选择" style="width: 100%" v-model="activtyData.are">
              <a-select-option value="13">全国</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="允许加入"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 14, offset: 0}"
          >
            <a-select placeholder="请选择" style="width: 100%" v-model="activtyData.show">
              <a-select-option value="YES">允许</a-select-option>
              <a-select-option value="NO">不允许</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="抽中概率"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 14, offset: 0}"
          >
            <a-input-number :min="1" :max="100" v-model="number" style="width: 100%" />
          </a-form-item>
            <a-form-item
              :labelCol="{span: 7}"
              :wrapperCol="{span: 14, offset: 0}"
            >
              <span ref="cont" style="color: red;text-indent: 100px;display: inline-block;width: 100%"></span>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
      <s-table
        :columns="columns"
        :dataSource="dataSource"
        :selectedRows="selectedRows"
        @change="onchange"
        :pagination="pagination"
        @userLList="userLList"
        @userOnload="userOnload"
      />
    </div>
  </a-card>
</template>
s
<script>
  import sTable from '../../../components/table/StandardTable3'
  import upLoad from '../../upload/upload'
  import { activityList, addConfig,getAll } from "../../../api/user.js";
  import moment from 'moment';
  const columns = [
    { title: '创建时间',
      dataIndex: 'createSTime'
    },
    {
      title: '活动标题',
      dataIndex: 'title'
    },
    { title: '活动模式', key: 'state', scopedSlots: { customRender: 'status' } },
    { title: '活动时间',
      dataIndex: 'activityTime'
    },
    { title: '发放地区', key: 'state', scopedSlots: { customRender: 'status1' } },
    { title: '活动配置状态', key: 'state', scopedSlots: { customRender: 'open' } },
    {
      title: '操作',
      key: 'operation',
      scopedSlots: { customRender: 'action' },
    },
  ]


  export default {
    name: 'mammon',
    components: {
      sTable,
      upLoad,
    },
    data () {
      return {
        advanced: true,
        columns: columns,
        dataSource: [],
        selectedRowKeys: [],
        selectedRows: [],
        number:1,
        options: [],
        searchVal:'',
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        datauser:[],
        are:"",
        createSTime:"",
        pagination:{},
        city:[],
        activtyData:{
          title:"",
          time:"",
          type:"",
          are:"",
          show:"",
          probability:""
        },
        creatId:0,
        numb:1,
        loading:false,
        selectDataSource:{},
        timitime:''
      }
    },
    created () {
      this.activityList(this.numb);
      this.creatId=this.$store.state.account.user.data;
      this.getAll();
    },
    methods: {
      moment,
      range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
      },
      disabledDate(current) {
        return current && current < moment().endOf("day");
      },
      onChanged(value) {
        console.log(value);
      },
      userOnload () {
        this.activityList(this.pagination.current);
      },
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
        this.are=value.join("");
        console.log(this.are)
      },
      thisTime (value) {
        console.log(value);
        this.createSTime=value.format("YYYY-MM-DD");
        console.log(this.createSTime)
      },
      userLList(pagination){
        console.log(pagination);
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.userLists(pagination.current,pagination.pageSize,this.selectDataSource.title,this.selectDataSource.mode,this.selectDataSource.status,this.selectDataSource.area,this.createSTime);
      },
      // 封装活动信息
      userLists(page,limit,title,mode,status,city,createDate) {
        this.loading = true;
        activityList({
          data:({
            page: page,
            limit: limit,
            title: title,
            mode: mode,
            status: status,
            scope: city,
            createDate: createDate
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
      onSubmit (e) {
        e.preventDefault()
        this.form.validateFields((error, values) => {
          console.log('Received values of form: ', values)
          this.selectDataSource=values;
          const pager = { ...this.pagination };
          pager.current=1;
          this.pagination=pager
          this.userLists(1,10,values.title,values.mode,values.status,values.area,this.createSTime);

        })
      },
      handleReset () {
        this.createSTime="";
        this.timitime="";
        this.form.resetFields();
        this.selectDataSource={};
        this.activityList(this.numb);
        this.city=[];
        const pager = { ...this.pagination };
        pager.current=1;
        this.pagination=pager
      },
      onChangeded(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
      },
      onOk(value) {
        console.log('onOk: ', value);
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
      },
      handleMenuClick (e) {
        if (e.key === 'delete') {
          this.remove()
        }
      },
      showModal() {
        console.log(this.$store.state.account.user);
        this.visible = true
         this.activtyData.title="";
          this.activtyData.type="";
           this.activtyData.are="";
           this.activtyData.show="";
           this.number=1;
           this.activtyData.time="";

      },
      handleOk() {
        console.log(323232)
        console.log(this.$store.state.account.user);
        this.ModalText = 'The modal will be closed after two seconds';

        addConfig({
          data:({
            title: this.activtyData.title,
            mode: this.activtyData.type,
            scope: this.activtyData.are,
            canJoin: this.activtyData.show,
            probability: this.number,
            startTime: this.activtyData.time._d,
            createId: this.$store.state.account.user.data
          })})
          .then(res => {
            if(res.data.code===200) {
              const pager = { ...this.pagination };
              pager.current=1;
              this.pagination=pager
              this.activityList(this.numb);
              this.confirmLoading = true;
              setTimeout(() => {
                this.visible = false;
                this.confirmLoading = false;
              }, 2000);
            } else {
              this.$refs.cont.innerHTML=res.data.message;
              setTimeout(() => {
                this.$refs.cont.innerHTML=""
              }, 3000);
            }

          }).catch();
      },
      handleCancel() {
        console.log('Clicked cancel button');
        this.visible = false
      },
      // 推广用户信息
      activityList (obj) {
        activityList({
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
      // 新增活动
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

