<template>
    <a-table
      :bordered="bordered"
      :loading="loading"
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="rowKey"
      :pagination="{showQuickJumper:true,hideOnSinglePage:true,total:pagination.total,showTotal:(total, range) => `第 ${range[0]}-${range[1]} 条 共 ${total} 条`}"
      @change="thisPage"
      :locale="{emptyText:'查无交易记录'}"
    >
      <span slot="time" slot-scope="text,record">
        <a-badge />{{record.applicationTime | FormatDate}}
      </span>
      <span slot="type" slot-scope="text,record">
        <a-badge />{{record.type==="WECHAT"?"微信":"支付宝"}}
      </span>
      <span slot="open" slot-scope="text,record">
        <span v-if="record.status==='INIT'">
          <a-badge status="processing" />待审核
        </span>
 <span v-else-if="record.status==='FAIL'">
          <a-badge status="error" />拒绝
        </span>
         <span v-else-if="record.status==='SUCCESS'">
          <a-badge status="success" />同意
        </span>
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">查看</a>
        <a-divider type="vertical" />
        <span v-if="record.status==='INIT'">
          <a-popconfirm
            v-if="dataSource.length"
            title="确定同意吗？"
            okText="确认"
            cancelText="取消"
            @confirm="() => goSeccess(record)">
           <a class="ant-dropdown-link" href="javascript:;">
             同意
          </a>
        </a-popconfirm>
        <a-divider type="vertical" />
          <a-popconfirm
            v-if="dataSource.length"
            title="确定拒绝吗？"
            okText="确认"
            cancelText="取消"
            @confirm="() => goFail(record)">
           <a class="ant-dropdown-link" href="javascript:;">
           拒绝
          </a>
        </a-popconfirm>
        </span>
        <span v-else></span>
      </span>
    </a-table>
  </div>
</template>

<script>
  import { updateStatus,WithdrawupdateStatus } from "../../api/user.js";
  export default {
    name: 'StandardTable',
    props: ['bordered', 'loading', 'columns', 'dataSource', 'rowKey', 'pagination', 'selectedRows'],
    data () {
      return {
        needTotalList: [],
        selectedRowKeys: []
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
      thisPage (value) {
        console.log(value)
        this.$emit("userLList",value);
        this.onClearSelected();
      },
      handleEdit (obj) {
        console.log(obj)
        console.log(obj.userId)
        this.$store.commit('account/setuserId', obj.id)
        this.$router.replace({path:"/finance/withdraw/withdrawDetails"});
      },
      // 启用
      goSeccess (record) {
        console.log(record);
          WithdrawupdateStatus({
            data:({
              id: record.id,
              approveId: this.$store.state.account.user.data,
              status: "SUCCESS",
              content: ""
            })})
            .then(res => {
              this.$emit("userOnload");

            }).catch();
      },
      goFail(record) {
          WithdrawupdateStatus({
            data:({
              id: record.id,
              approveId: this.$store.state.account.user.data,
              status: "FAIL",
              content: ""
            })})
            .then(res => {
              this.$emit("userOnload");

            }).catch();

      },
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
