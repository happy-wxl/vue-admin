<template>
  <page-layout title="红包管理">
  <a-card>
      <div class="operator">
        <a-button @click="showModal" type="primary">新增红包</a-button>
        <a-modal
          title="新增红包"
          :visible="visible1"
          :confirmLoading="confirmLoading"
          @cancel="handleCancel"
          zIndex=5
          @ok="handleSubmit"
          okText="确认"
          cancelText="取消"
          htmlType="submit"
          destroyOnClose="true"
        >
          <a-form >
            <a-form-item
              label="红包标题"
              :labelCol="{span: 7}"
              :wrapperCol="{span: 14, offset: 0}"
              fieldDecoratorId="username"
              :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入红包标题' }]}"
            >
              <a-input placeholder="请输入" v-model="redData.title" />
            </a-form-item>
            <a-form-item
              label="红包链接（选填）"
              :labelCol="{span: 7}"
              :wrapperCol="{span: 14, offset: 0}"
            >
              <a-input placeholder="请输入" v-model="redData.webUrl" />
            </a-form-item>
            <a-form-item
              label="红包内容"
              :labelCol="{span: 7}"
              :wrapperCol="{span: 14, offset: 0}"
            >
              <a-textarea placeholder="请输入备注" maxlength="300" :autosize="{ minRows: 3, maxRows: 6 }" v-model="redData.content" />
            </a-form-item>
            <a-form-item
              label="上传红包图片："
              :labelCol="{span: 7}"
              :wrapperCol="{span: 14, offset: 0}"
            >
              <up-load @imgPath="imgPath" :fileLists="fileList"></up-load>
            </a-form-item>
            <a-form-item
              label="红包金额"
              :labelCol="{span: 7}"
              :wrapperCol="{span: 14, offset: 0}"
              fieldDecoratorId="amount"
              :fieldDecoratorOptions="{rules: [{ required: true, message: '必须大于0.01' }]}"
            >
              <a-input-number :min="0" style="width: 100%"  v-model="redData.amount"  />
            </a-form-item>
            <a-form-item
              label="红包总数"
              :labelCol="{span: 7}"
              :wrapperCol="{span: 14, offset: 0}"
              fieldDecoratorId="num"
              :fieldDecoratorOptions="{rules: [{ required: true, message: '数量大于0' }]}"
            >
              <a-input-number :min="1" style="width: 100%"  v-model="redData.num"  />
            </a-form-item>
            <a-form-item
              :labelCol="{span: 7}"
              :wrapperCol="{span: 14, offset: 0}"
            >
              <span ref="cont1" style="color: red;text-indent: 100px;display: inline-block;width: 100%"></span>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
      <s-table
        :columns="columns"
        :dataSource="dataSource"
        :selectedRows="selectedRows"
        @change="onchange"
        @handleEdit="handleEdit"
        :pagination="false"
        @redDelete="redDel"
      >
      </s-table>
    <a-modal
      title="编辑红包"
      :visible="visible"
      @ok="handleOk1"
      :confirmLoading="confirmLoading1"
      @cancel="handleCancel1"
      zIndex=5
      okText="确认"
      cancelText="取消"
      destroyOnClose="true"

    >
      <a-form layout='vertical'>
      <a-form-item
        label="红包标题"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 14, offset: 0}"
        fieldDecoratorId="username"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入红包标题' }]}"
      >
        <a-input placeholder="请输入" v-model="mdl.title" />
      </a-form-item>
      <a-form-item
        label="红包链接（选填）"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 14, offset: 0}"
        fieldDecoratorId="url"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入红包链接' }]}"
      >
        <a-input placeholder="请输入" v-model="mdl.url" />
      </a-form-item>
      <a-form-item
        label="红包内容"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 14, offset: 0}"
        fieldDecoratorId="content"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入红包内容' }]}"
      >
        <a-textarea placeholder="请输入备注" maxlength="300" :autosize="{ minRows: 3, maxRows: 6 }" v-model="mdl.description" />
      </a-form-item>
      <a-form-item
        label="上传红包图片："
        :labelCol="{span: 7}"
        :wrapperCol="{span: 14, offset: 0}"
      >
        <up-load @imgPath="imgPath" :fileLists="fileList"></up-load>
      </a-form-item>
      <a-form-item
        label="红包金额"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 14, offset: 0}"
        fieldDecoratorId="amount"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '必须大于0.01' }]}"
      >
        <a-input-number :min="0" style="width: 100%"  v-model="mdl.amount"  />
      </a-form-item>
      <a-form-item
        label="红包总数"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 14, offset: 0}"
        fieldDecoratorId="num"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '数量大于0' }]}"
      >
        <a-input-number :min="1" style="width: 100%"  v-model="mdl.num"  />
      </a-form-item>
        <a-form-item
        :labelCol="{span: 7}"
        :wrapperCol="{span: 14, offset: 0}"
      >
        <span ref="cont" style="color: red;text-indent: 100px;display: inline-block;width: 100%"></span>
      </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
  </page-layout>
</template>
<script>
  import sTable from '../../../components/table/StandardTable5'
  import PageLayout from '../../../layouts/PageLayout'
  import upLoad from '../../upload/upload'
  import { getRedpackDetail,addRedpack,updateRedpack,getRedpack } from "../../../api/user.js";
  const columns = [
    {
      title: '红包标题',
      dataIndex: 'title'
    },
    {
      title: '发起人',
      dataIndex: 'createUser'
    },
    {
      title: '红包总额',
      dataIndex: 'amount'
    },
    {
      title: '红包总数',
      dataIndex: 'num',
      sorter: true
    },
    {
      title: '操作',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' },
    }
  ]

  export default {
    name: 'redManagement',
    components: {
      sTable,
      PageLayout,
      upLoad

    },
    data () {
      return {
        advanced: true,
        columns: columns,
        dataSource: [],
        selectedRowKeys: [],
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
        visible:false,
        visible1: false,
        confirmLoading: false,
        confirmLoading1: false,
        mdl:{},
        redData:{
          title:"",
          webUrl:"",
          content:"",
          amount:0,
          num:1
        },
        images:"",
        catId:'',
        fileList:[]
      }
    },
    created () {
      console.log(this.$store.state.account.userId)
      this.catId=this.$store.state.account.userId;
      this.getDetail();
      console.log()

    },
    methods: {
      handleEdit (record) {
        this.mdl = Object.assign({}, record)
        console.log(this.mdl)
        this.images="";
        getRedpack({
          data:({
            id:record.id
          })})
          .then(res => {
            this.fileList=res.data.data.imageList;
            console.log(this.fileList);
            this.fileList.forEach(item=>{
              item.uid=item.id
              console.log(this.fileList)
            })
          }).catch();
        setTimeout(()=>{
          this.visible = true;
        },500)
      },
      // 获取图片组
      imgPath (images) {
        console.log(images);
        this.images=images;
      },
      getDetail () {
        getRedpackDetail({
          data:({
            id:this.$store.state.account.userId
          })})
          .then(res => {
            let data=res.data.data;
            this.dataSource=data;
            console.log(this.dataSource)
          }).catch();
      },
      showModal() {
        this.visible1 = true;
        this.redData.title="";
          this.redData.content="";
           this.images="";
          this.redData.webUrl="";
          this.redData.amount=0;
          this.redData.num=1;
          this.fileList=[];
      },
      handleSubmit(e) {
            console.log(this.redData.title);
            console.log(this.$store.state.account.userId);
            this.ModalText = 'The modal will be closed after two seconds';
            addRedpack({
              data:({
                title: this.redData.title,
                description: this.redData.content,
                images: this.images,
                configId:this.$store.state.account.userId,
                url: this.redData.webUrl,
                amount: this.redData.amount,
                num: this.redData.num,
                userId:this.$store.state.account.user.data
              })})
              .then(res => {
                if (res.data.code===200) {
                  this.getDetail();
                  this.confirmLoading = true;
                  setTimeout(() => {
                    this.visible1 = false;
                    this.confirmLoading = false;
                  }, 2000);
                } else {
                  this.$refs.cont1.innerHTML=res.data.message;
                  setTimeout(() => {
                    this.$refs.cont1.innerHTML=""
                  }, 3000);
                }


              }).catch();


      },
      handleCancel() {
        console.log('Clicked cancel button');
        this.visible1 = false
      },
      handleOk1(e) {
        console.log(12343445)

            updateRedpack({
              data:({
                title: this.mdl.title,
                description: this.mdl.description,
                images: this.images || this.mdl.images,
                id:this.mdl.id,
                url: this.mdl.url,
                amount: this.mdl.amount,
                num: this.mdl.num,
                userId:this.$store.state.account.user.data
              })})
              .then(res => {
                if (res.data.code===200){
                  this.getDetail();
                  this.confirmLoading1 = true;
                  setTimeout(() => {
                    this.visible = false;
                    this.confirmLoading1 = false;
                  }, 2000);
                }
                else {
                  this.$refs.cont.innerHTML=res.data.message;
                  setTimeout(() => {
                    this.$refs.cont.innerHTML=""
                  }, 3000);
                }


              }).catch();

      },
      redDel () {
        this.getDetail();
      },
      handleCancel1() {
        console.log('Clicked cancel button');
        this.visible = false
      },
      onChange (row) {
        this.selectedRowKeys = row.selectedRowKeys
        this.selectedRows = row.selectedRows

        console.log(this.$refs.table)
      },
      searchUser () {
        console.log(2);
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
</style>



