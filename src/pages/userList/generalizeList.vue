<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal" @submit="onSubmit" :autoFormCreate="(form) => this.form = form">
          <a-row >
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="推广员名称"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="nickName"
              >
                <a-input placeholder="请输入用户名称"  v-model="searchData.nickName" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="推广员手机号"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="mobile"
              >
                <a-input placeholder="请输入手机号" v-model="searchData.mobile" />
              </a-form-item>
            </a-col>
            <!--<a-col :md="8" :sm="24" >-->
              <!--<a-form-item-->
                <!--label="更新日期"-->
                <!--:labelCol="{span: 5}"-->
                <!--:wrapperCol="{span: 18, offset: 1}"-->
                <!---->
              <!--&gt;-->
                <!--<a-range-picker style="width: 100%" @change="onChange" />-->
              <!--</a-form-item>-->
            <!--</a-col>-->
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="推广员等级"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="level"
              >
                <a-select placeholder="请选择" v-model="searchData.level">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="VIP">超级推广员</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="advanced">

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
                label="所在公司"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="company"
              >
                <a-select style="width: 100%" placeholder="请选择" v-model="searchData.company">
                  <a-select-option value="北京联通">北京联通</a-select-option>
                  <a-select-option value="北京移动">北京移动</a-select-option>
                  <a-select-option value="北京电信">北京电信</a-select-option>
                  <a-select-option value="星巴克">星巴克</a-select-option>
                  <a-select-option value="瑞幸咖啡">瑞幸咖啡</a-select-option>
                  <a-select-option value="王增成团队">王增成团队</a-select-option>
                  <a-select-option value="于涛团队">于涛团队</a-select-option>
                  <a-select-option value="中联艺术">中联艺术</a-select-option>
                  <a-select-option value="大鸭梨">大鸭梨</a-select-option>
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
        <a-button @click="showModal1">批量设置公司</a-button>
        <a-modal
          title="设置所属公司"
          :visible="visible1"
          @ok="handleOk1"
          :confirmLoading="confirmLoading"
          @cancel="handleCancel1"
          okText="确认"
          cancelText="取消"
        >
          <a-form-item
            label="选择人数"
            :labelCol="{span: 5}"
            :wrapperCol="{span: 16, offset: 0}"
          >
          总计选择{{selectedRows.length}}人
          </a-form-item>
          <a-form-item
            label="所属公司"
            :labelCol="{span: 5}"
            :wrapperCol="{span: 16, offset: 0}"
          >
            <a-select style="width: 100%" v-model="companyT" placeholder="北京联通">
              <a-select-option value="北京联通">北京联通</a-select-option>
              <a-select-option value="北京移动">北京移动</a-select-option>
              <a-select-option value="北京电信">北京电信</a-select-option>
              <a-select-option value="星巴克">星巴克</a-select-option>
              <a-select-option value="瑞幸咖啡">瑞幸咖啡</a-select-option>
              <a-select-option value="王增成团队">王增成团队</a-select-option>
              <a-select-option value="于涛团队">于涛团队</a-select-option>
              <a-select-option value="中联艺术">中联艺术</a-select-option>
              <a-select-option value="大鸭梨">大鸭梨</a-select-option>
            </a-select>
          </a-form-item>
        </a-modal>

      </div>
      <standard-table
        :columns="columns"
        :dataSource="dataSource"
        :selectedRows="selectedRows"
        @change="onchange"
        @userListCompany="userListCompany"
        :pagination="pagination"
        @userLList="userLList"
        ref="c1"
        @showModel="showModel"
      />
    </div>
    <a-modal
      title="设置所属公司"
      :visible="visible2"
      @ok="handleOk2(userId)"
      :confirmLoading="confirmLoading2"
      @cancel="handleCancel2"
      okText="确认"
      cancelText="取消"
    >
      <a-form-item
        label="选择人数"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 16, offset: 0}"
      >
        总计选择1人
      </a-form-item>
      <a-form-item
        label="所属公司"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 16, offset: 0}"
      >
        <a-select style="width: 100%" v-model="companyT" placeholder="北京联通">
          <a-select-option value="北京联通">北京联通</a-select-option>
          <a-select-option value="北京移动">北京移动</a-select-option>
          <a-select-option value="北京电信">北京电信</a-select-option>
          <a-select-option value="星巴克">星巴克</a-select-option>
          <a-select-option value="瑞幸咖啡">瑞幸咖啡</a-select-option>
          <a-select-option value="王增成团队">王增成团队</a-select-option>
          <a-select-option value="于涛团队">于涛团队</a-select-option>
          <a-select-option value="中联艺术">中联艺术</a-select-option>
          <a-select-option value="大鸭梨">大鸭梨</a-select-option>
        </a-select>
      </a-form-item>
    </a-modal>
  </a-card>
</template>

<script>
  import StandardTable from '../../components/table/StandardTable2'
  import addTable from './addTable'
  import { getProList,updateCompany,getAll } from "../../api/user.js";
  const columns = [
    // {
    //   title: '资格有效期',
    //   dataIndex: 'expiryDate'
    // },
    { title: '推广员等级', key: 'state', scopedSlots: { customRender: 'status' } },
    {
      title: '推广员名称',
      dataIndex: 'nickName',
      userTotal:true
    },
    {
      title: '推广员手机号',
      dataIndex: 'mobile',
      sorter: true
    },
    {
      title: '直属用户',
      dataIndex: 'childNum',
      sorter: true,
      needTotal: true,
    },
    {
      title: '下属用户',
      dataIndex: 'subChildNum',
      sorter: true,
      needTotal: true,
    },
    {
      title: '所在区域',
      dataIndex: 'area',
      needTotal: true
    },
    {
      title: '所在公司',
      dataIndex: 'company',
      sorter: true
    },
    {
      title: '操作',
      key: 'operation',
      scopedSlots: { customRender: 'action' },
    },
  ]

  export default {
    name: 'generalizeList',
    components: {
      StandardTable,
      addTable
    },
    data () {
      return {
        advanced: true,
        columns: columns,
        selectedRowKeys: [],
        selectedRows: [],
        options: [],
        searchVal:'',
        ModalText: 'Content of the modal',
        visible: false,
        visible1: false,
        confirmLoading: false,
        visible2: false,
        confirmLoading2: false,
        area:"",
        pagination:{},
        data: [
          {
            key: '1',
          },
          {
            key: '2',
          },
          {
            key: '3',
          },
          {
            key: '4',
          },
          {
            key: '5',
          },
        ],
        dataSource:[],
        datauser:[],
        companyT: "北京联通",
        city:[],
        numb:1,
        loading:false,
        searchData:{
          level:"VIP",
          nickName:"",
          mobile:"",
          company:"",
        },
        userId:'',
        show:false
      }
    },
    created () {
      this.getProList(this.numb);
      this.getAll();
    },
    methods: {
      onChanged(value) {
        console.log(value);
      },
      // 封装用户信息
      userLists(level,page,limit,nickName,mobile,province,city,district,company) {
        this.loading = false;
        getProList({
          data:({
            level: level,
            page: page,
            limit: limit,
            nickName: nickName,
            mobile: mobile,
            province: province,
            city: city,
            district: district,
            company: company
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
        this.area=value.join("");
        console.log(this.area)
      },
      onSubmit (e) {
        e.preventDefault()
        this.form.validateFields((error, values) => {
          console.log('Received values of form: ', values)
          const pager = { ...this.pagination };
          pager.current=1;
          this.pagination=pager
          this.userLists("VIP",1,10,this.searchData.nickName,this.searchData.mobile,this.city[0] || "",this.city[1] || "",this.city[2] || "",this.searchData.company);
        })
      },
      handleReset () {
        this.form.resetFields();
        this.getProList(this.numb);
        this.searchData.level="";
        this.searchData.nickName="";
        this.searchData.mobile="";
        this.searchData.company="";
        this.city=[];
        const pager = { ...this.pagination };
        pager.current=1;
        this.pagination=pager
      },
      userLList(pagination){
        console.log(pagination);
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.userLists("VIP",pagination.current,pagination.pageSize,this.searchData.nickName,this.searchData.mobile,this.city[0] || "",this.city[1] || "",this.city[2] || "",this.searchData.company);

      },
      // 推广用户信息
      getProList (obj) {
        this.loading=true;
        getProList({
          data:({
            level: "VIP",
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
      newMeber () {
        this.data.push({
          key: '+1',
        })
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
      onchange (selectedRowKeys, selectedRows) {
        if(selectedRowKeys.length>0) {
          this.show=true;
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
      handleMenuClick (e) {
        if (e.key === 'delete') {
          this.remove()
        }
      },
      // 绑定超级推广员
      showModal() {
        this.visible = true
      },
      showModal1() {
        if (this.show===true) {
          this.visible1 = true
        } else {
          this.show=false;
          this.$message.info("请选择用户，设置公司");
        }

      },
      handleOk(e) {
        console.log(e);
        this.ModalText = 'The modal will be closed after two seconds';
        this.confirmLoading = true;
        setTimeout(() => {
          this.visible = false;
          this.confirmLoading = false;
        }, 2000);
      },
      handleCancel(e) {
        console.log('Clicked cancel button');
        this.visible = false
      },
      handleOk1(e) {
        this.selectedRows.forEach((item)=>{
          updateCompany({
            data:({
              userId: item.userId,
              company: this.companyT
            })})
            .then(res => {
              console.log("设置成功");
              console.log(this.pagination.current)
              this.userLists("VIP",this.pagination.current,10,this.searchData.nickName,this.searchData.mobile,this.city[0] || "",this.city[1] || "",this.city[2] || "",this.searchData.company);

            }).catch();
        })
        this.ModalText = 'The modal will be closed after two seconds';
        this.confirmLoading = true;
        setTimeout(() => {
          this.visible1 = false;
          this.confirmLoading = false;
        }, 2000);
      },
      userListCompany () {

      },
      handleCancel1(e) {
        console.log('Clicked cancel button');
        this.visible1 = false
      },
      showModel (obj) {
        this.visible2 = true
        console.log(obj)
        this.userId=obj.userId
      },
      handleOk2(record) {
        console.log(record);
        updateCompany({
          data:({
            userId: record,
            company: this.companyT
          })})
          .then(res => {
            console.log("设置成功");
            this.userLists("VIP",this.pagination.current,10,this.searchData.nickName,this.searchData.mobile,this.city[0] || "",this.city[1] || "",this.city[2] || "",this.searchData.company);
          }).catch();
        this.ModalText = 'The modal will be closed after two seconds';
        this.confirmLoading2 = true;
        setTimeout(() => {
          this.visible2 = false;
          this.confirmLoading2 = false;
        }, 2000);
      },
      handleCancel2(e) {
        console.log('Clicked cancel button');
        this.visible2 = false
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


