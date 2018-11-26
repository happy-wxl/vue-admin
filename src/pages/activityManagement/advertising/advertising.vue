<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal" @submit="onSubmit" :autoFormCreate="(form) => this.form = form">
        <a-row >
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="广告标题"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
              fieldDecoratorId="title"
            >
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="广告模式"
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
              label="发放区域"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
              fieldDecoratorId="scope"
            >
              <a-select placeholder="请选择">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="COUNTRY">全国</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="发放人"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
              fieldDecoratorId="lssuserName"
            >
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" >
            <a-form-item
              label="广告状态"
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
        <a-button  @click="showModal" type="primary">新增</a-button>
        <a-modal
          title="新增赞助商广告"
          :visible="visible"
          @ok="handleOk(actData.time)"
          :confirmLoading="confirmLoading"
          @cancel="handleCancel"
          zIndex=5
          okText="确认"
          cancelText="取消"
          destroyOnClose="true"
        >
          <a-form>
            <a-form-item
              label="广告标题"
              :labelCol="{span: 7}"
              :wrapperCol="{span: 14, offset: 0}"
              max=20
            >
              <a-input placeholder="请输入广告名称" v-model="actData.title" />
            </a-form-item>
            <a-form-item
              label="广告链接"
              :labelCol="{span: 7}"
              :wrapperCol="{span: 14, offset: 0}"
              max=100
            >
              <a-input placeholder="请输入广告链接" v-model="actData.url" />
            </a-form-item>
            <a-form-item
              label="广告模式"
              :labelCol="{span: 7}"
              :wrapperCol="{span: 14, offset: 0}"
            >
              <a-select placeholder="请选择" style="width: 100%" v-model="actData.type">
                <a-select-option value="TEMP">单次</a-select-option>
                <a-select-option value="FOREVER">循环</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="发放日期"
              :labelCol="{span: 7}"
              :wrapperCol="{span: 14, offset: 0}"
            >
              <a-range-picker
                format="YYYY-MM-DD HH:mm:ss"
                :placeholder="['开始时间', '结束时间']"
                @change="onChangeded"
                @ok="onOk"
                style="width: 100%"
                v-model="actData.time"
                :disabledDate="disabledDate"
                :showTime="{
        hideDisabledOptions: true,
        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
      }"
              />
            </a-form-item>
            <a-form-item

              label="上传广告图片："
              :labelCol="{span: 7}"
              :wrapperCol="{span: 14, offset: 0}"
            >
              <up-load @imgUrl="imgUrlActivity"></up-load>
            </a-form-item>
            <a-form-item
              :labelCol="{span: 7}"
              :wrapperCol="{span: 14, offset: 0}"
            >
              <span ref="cont" style="color: red;text-indent: 100px;display: inline-block;width: 100%"></span>
            </a-form-item>
          </a-form>
        </a-modal>
        <a-modal
          title="编辑赞助商广告"
          :visible="visible1"
          @ok="handleOk1(actData.time)"
          :confirmLoading="confirmLoading1"
          @cancel="handleCancel1"
          zIndex=5
          okText="确认"
          cancelText="取消"
          destroyOnClose="true"
        >
          <a-form-item
            label="广告标题"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 14, offset: 0}"
            max=20
          >
            <a-input placeholder="请输入广告名称" v-model="mdl.title" />
          </a-form-item>
          <a-form-item
            label="广告链接"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 14, offset: 0}"
            max=100
          >
            <a-input placeholder="请输入广告链接" v-model="mdl.imageUrl" />
          </a-form-item>
          <a-form-item
            label="广告模式"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 14, offset: 0}"
          >
            <a-select placeholder="请选择" style="width: 100%" v-model="mdl.mode">
              <a-select-option value="TEMP">单次</a-select-option>
              <a-select-option value="FOREVER">循环</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="发放日期"
            :labelCol="{span: 7}"
            :wrapperCol="{span: 14, offset: 0}"
          >
            <a-range-picker
              format="YYYY-MM-DD HH:mm"
              :placeholder="['开始时间', '结束时间']"
              @change="onChangeded"
              @ok="onOk"
              style="width: 100%"
              v-model="actData.time"
              :disabledDate="disabledDate"
              :showTime="{
        hideDisabledOptions: true,
        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
      }"
            />
          </a-form-item>
          <a-form-item

            label="上传广告图片："
            :labelCol="{span: 7}"
            :wrapperCol="{span: 14, offset: 0}"
          >
            <up-load @imgUrl="imgUrlActivity" :imgPathf="imgPathf"></up-load>
          </a-form-item>
          <a-form-item
            :labelCol="{span: 7}"
            :wrapperCol="{span: 14, offset: 0}"
          >
            <span ref="cont1" style="color: red;text-indent: 100px;display: inline-block;width: 100%"></span>
          </a-form-item>
        </a-modal>
      </div>
      <s-table
        :columns="columns"
        :dataSource="dataSource"
        :selectedRows="selectedRows"
        @change="onchange"
        @userOnload="userOnload"
        @handleEdit="handleEdit"
        :pagination="pagination"
        @userLList="userLList"
        @userOnloadTop="userOnloadTop"
      />
    </div>
  </a-card>
</template>
<script>
  import sTable from '../../../components/table/StandardTable4'
  import upLoad from '../../upLoad/upLoad1'
  import { getSponsorList,addSponsor,updateSponsor } from "../../../api/user.js";
  import moment from 'moment';
  const columns = [
    {
      title: '排序',
      dataIndex: 'seq'
    },
    {
      title: '广告标题',
      dataIndex: 'title'
    },
    { title: '广告图片', key: 'state', scopedSlots: { customRender: 'status' } },
    { title: '展示时间',
      dataIndex:'showTime'
    },
    { title: '广告模式', key: 'state', scopedSlots: { customRender: 'type' } },
    { title: '发放区域', key: 'state', scopedSlots: { customRender: 'status1' } },
    {
      title: '发放人',
      dataIndex: 'lssuserName',
      sorter: true,
      needTotal: true,
    },
    { title: '广告状态', key: 'state', scopedSlots: { customRender: 'open' } },
    {
      title: '操作',
      key: 'operation',
      scopedSlots: { customRender: 'action' },
    },
  ]

  export default {
    name: 'advertising',
    components: {
      sTable,
      upLoad
    },
    data () {
      return {
        advanced: true,
        columns: columns,
        dataSource: [],
        selectedRowKeys: [],
        imgPathf:"",
        selectedRows: [],
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [{
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [{
                value: 'xihu',
                label: 'West Lake',
              }],
            }],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [{
              value: 'nanjing',
              label: 'Nanjing',
              children: [{
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              }],
            }],
          }],
        searchVal:'',
        datauser:[],
        pagination:{},
        visible: false,
        visible1: false,
        confirmLoading: false,
        confirmLoading1: false,
        imgUrl:"",
        actData:{
          title:"",
          url:"",
          type:"",
          time:[],
        },
        creatId:0,
        mdl:{},
        city:[],
        numb:1,
        loading:false,
        selectDataSource:{},
        addTime:[]
      }
    },
    created () {
      this.getSponsorList(this.numb);
      this.creatId=this.$store.state.account.user.data;
      console.log(this.creatId)
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
        return current && current < moment().startOf("day");
      },
      onChangeded(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
this.addTime=dateString;
      },
      // 封装广告信息
      userLists(page,limit,title,mode,status,scope,issuer) {
        this.loading = false;
        getSponsorList({
          data:({
            page: page,
            limit: limit,
            title: title,
            mode: mode,
            status: status,
            scope: scope,
            issuer: issuer
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
      userLList(pagination){
        console.log(pagination);
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.userLists(pagination.current,pagination.pageSize,this.selectDataSource.title,this.selectDataSource.mode,this.selectDataSource.status,this.selectDataSource.scope,this.selectDataSource.lssuserName);
        },
      onSubmit (e) {
        e.preventDefault()
        this.form.validateFields((error, values) => {
          console.log('Received values of form: ', values)
          this.selectDataSource=values;
          const pager = { ...this.pagination };
          pager.current=1;
          this.pagination=pager
          this.userLists(1,10,values.title,values.mode,values.status,values.scope,values.lssuserName);

        })
      },
      handleReset () {
        this.form.resetFields();
        this.getSponsorList(this.numb);
        this.selectDataSource={};
        const pager = { ...this.pagination };
        pager.current=1;
        this.pagination=pager
      },
      onOk(value) {
        console.log('onOk: ', value);
      },
      onChanged(value) {
        console.log(value);
      },
      handleEdit (record) {
        this.imgUrl="";
        console.log(33333333333333333333333333)
        this.mdl = Object.assign({}, record)
        console.log(this.mdl)
        this.imgPathf=this.mdl.imagePath;
        this.visible1 = true
        this.actData.time=[];
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
      imgUrlActivity (read) {
        this.imgUrl=read;
      },
      showModal() {
        this.visible = true;
        this.actData.title="";
        this.actData.type="";
        this.imgUrl="";
        this.actData.url="";
        this.actData.time=[];
        console.log(this.actData.time);
      },
      handleOk(e) {
        console.log(2222)
        console.log(e)
        if(e.length===0){
          console.log(232323232)
          this.$refs.cont.innerHTML="请选择时间不能为空";
          setTimeout(() => {
            this.$refs.cont.innerHTML=""
          }, 3000);
        } else {
          addSponsor({
            data:({
              title: this.actData.title,
              mode: this.actData.type,
              imagePath: this.imgUrl,
              imageUrl: this.actData.url,
              startTime: this.actData.time[0]._d || "",
              endTime: this.actData.time[1]._d || "",
              createId: this.$store.state.account.user.data
            })})
            .then(res => {
              console.log(22334)
              if (res.data.code===200) {
                const pager = { ...this.pagination };
                pager.current=1;
                this.pagination=pager
                this.getSponsorList(this.numb);
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
        }
      },
      handleCancel() {
        console.log('Clicked cancel button');
        this.visible = false
      },
      handleOk1(e) {
        console.log(e);
        console.log(this.actData.time);
        if(e.length===0) {
          console.log(2323239999)
          this.$refs.cont1.innerHTML="请选择时间不能为空";
          setTimeout(() => {
            this.$refs.cont1.innerHTML=""
          }, 3000);
        } else {
          updateSponsor({
            data:({
              title: this.mdl.title,
              mode: this.mdl.mode,
              imagePath: this.imgUrl || this.mdl.imagePath,
              imageUrl: this.mdl.imageUrl,
              startTime: this.actData.time[0]._d,
              endTime: this.actData.time[1]._d,
              updateId: this.$store.state.account.user.data,
              id: this.mdl.id
            })})
            .then(res => {
              if(res.data.code===200) {
                this.userLists(this.pagination.current,10,this.selectDataSource.title,this.selectDataSource.mode,this.selectDataSource.status,this.selectDataSource.scope,this.selectDataSource.lssuserName);
                this.confirmLoading1 = true;
                setTimeout(() => {
                  this.visible1 = false;
                  this.confirmLoading1 = false;
                }, 2000);
              } else {
                this.$refs.cont1.innerHTML=res.data.message;
                setTimeout(() => {
                  this.$refs.cont1.innerHTML=""
                }, 3000);
              }


            }).catch();
        }
      },
      handleCancel1() {
        console.log('Clicked cancel button');
        this.visible1 = false
      },
      handleMenuClick (e) {
        if (e.key === 'delete') {
          this.remove()
        }
      },
      userOnload () {
        this.getSponsorList(this.pagination.current);
      },
      userOnloadTop () {
        this.getSponsorList(this.pagination.current);
      },
      // 赞助商信息
      getSponsorList (obj) {
        getSponsorList({
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


