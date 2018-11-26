<template>
  <div class="standard-table">
    <div class="alert">
      <a-alert type="info" :show-icon="true">
        <div slot="message">
          已选择&nbsp;<a style="font-weight: 600">{{selectedRows.length}}</a>&nbsp;项&nbsp;&nbsp;
          <template  v-for="(item, index) in needTotalList" v-if="item.userTotal">
            用户数&nbsp;
            <a :key="index" style="font-weight: 600">
              {{selectedRows.length}}
            </a>&nbsp;&nbsp;
          </template>
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </div>
      </a-alert>
    </div>
    <a-table
      :bordered="bordered"
      :loading="loading"
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="rowKey"
      :pagination="{showQuickJumper:true,hideOnSinglePage:true,total:pagination.total,showTotal:(total, range) => `第 ${range[0]}-${range[1]} 条 共 ${total} 条`}"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: updateSelect}"
      @change="thisPage"
      :locale="{emptyText:'查无推广员'}"
    >
      <span slot="time" slot-scope="text,record">
        <a-badge />{{record.createSTime | FormatDate}}
      </span>
      <span slot="status" slot-scope="text,record">
        <a-badge />{{record.level==="NORMAL"?"普通用户":"超级推广员"}}
      </span>
      <span slot="open" slot-scope="text,record">
        <a-badge :status="record.status==='NORMAL'?'success':'default'" />{{record.status==="NORMAL"?"启用":"禁用"}}
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">查看</a>
        <a-divider type="vertical" />
          <a class="ant-dropdown-link" @click="showModal1(record)">
            设置公司
          </a>
        <a-modal
        title="设置所属公司"
        :visible="visible1"
        @ok="handleOk1(userId)"
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
          总计选择1人
        </a-form-item>
        <a-form-item
          label="所属公司"
          :labelCol="{span: 5}"
          :wrapperCol="{span: 16, offset: 0}"
        >
          <a-select style="width: 100%" v-model="companyT" defaultValue="北京联通">
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
      </span>

    </a-table>
  </div>
</template>

<script>
  import { updateCompany } from "../../api/user.js";
  export default {
    name: 'StandardTable',
    props: ['bordered', 'loading', 'columns', 'dataSource', 'rowKey', 'pagination', 'selectedRows'],
    data () {
      return {
        needTotalList: [],
        selectedRowKeys: [],
        visible1: false,
        confirmLoading: false,
        companyT:"北京联通"
      }
    },
    methods: {
      updateSelect (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        let list = this.needTotalList
        this.needTotalList = list.map(item => {
          return {
            ...item,
            total: selectedRows.reduce((sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
        this.$emit('change', selectedRowKeys, selectedRows)
      },
      initTotalList (columns) {
        const totalList = []
        columns.forEach(column => {
          if (column.userTotal) {
            totalList.push({...column, total: 0})
          }
        })
        return totalList
      },
      onClearSelected () {
        this.selectedRowKeys = []
        this.updateSelect([], [])
      },
      handleEdit (obj) {
        console.log(obj)
        console.log(obj.userId)
        this.$store.commit('account/setuserId', obj.userId)
        this.$router.replace({path:"/userList/generalizeDetails/generalizeDetails"});
      },
      thisPage (value) {
        console.log(value)
        this.$emit("userLList",value);
        this.onClearSelected();
      },
      showModal1(obj) {
        this.$emit("showModel",obj)
      },
      handleOk1(record) {
        console.log(record);
        updateCompany({
          data:({
            userId: record,
            company: this.companyT
          })})
          .then(res => {
            console.log("设置成功");
            this.$emit("userListCompany")
          }).catch();
        this.ModalText = 'The modal will be closed after two seconds';
        this.confirmLoading = true;
        setTimeout(() => {
          this.visible1 = false;
          this.confirmLoading = false;
        }, 2000);
      },
      handleCancel1(e) {
        console.log('Clicked cancel button');
        this.visible1 = false
      },
      // 启用
      goSelect (record) {
        console.log(record);
          updateCompany({
            data:({
              userId: record.userId,
              company: "DISABLE"
            })})
            .then(res => {
              this.$emit("userOnload");

            }).catch();
      }
    },
    created () {
      this.needTotalList = this.initTotalList(this.columns)
    },
    watch: {
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce((sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .alert{
    margin-bottom: 16px;
  }
</style>
