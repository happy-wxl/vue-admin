<template>
  <div class="standard-table">
    <a-table
      :bordered="bordered"
      :loading="loading"
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="rowKey"
      :pagination="{showQuickJumper:true,hideOnSinglePage:true,total:pagination.total,showTotal:(total, range) => `第 ${range[0]}-${range[1]} 条 共 ${total} 条`}"
      @change="thisPage"
      :locale="{emptyText:'查无活动'}"
    >
      <span slot="time" slot-scope="text,record">
        <a-badge />{{record.createSTime | FormatDate}}
      </span>
      <span slot="time1" slot-scope="text,record">
        <a-badge />{{record.activityTime | FormatDate}}
      </span>
      <span slot="status" slot-scope="text,record">
        <a-badge />{{record.mode==="TEMP"?"单次":"循环"}}
      </span>
      <span slot="status1" slot-scope="text,record">
        <a-badge />{{record.scope==="COUNTRY"?"全国":""}}
      </span>
      <span slot="open" slot-scope="text,record">
<span v-if="record.status==='NORMAL'">
  <a-badge status="success" />启用</span>
        <span v-else-if="record.status==='DISABLE'">
          <a-badge status="default" />禁用
        </span>

      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">查看</a>
        <a-divider type="vertical" />
        <a @click="handleRed(record)">红包管理</a>
        <a-popconfirm
          v-if="dataSource.length"
          title="确定要这样操作吗？"
          okText="确认"
          cancelText="取消"
          @confirm="() => goSelect(record)">
          <a class="ant-dropdown-link" href="javascript:;">
            <span v-if="record.status==='NORMAL'">
              <a-divider type="vertical" />禁用
          </span>
          <span v-else-if="record.status==='DISABLE' && record.size>0">
          <a-divider type="vertical" />启用
          </span>
          </a>
        </a-popconfirm>
      </span>
    </a-table>
  </div>
</template>

<script>
  import { updateConfigStatus } from "../../api/user.js";
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
      thisPage (value) {
        console.log(value)
        this.$emit("userLList",value);
        this.onClearSelected();
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
        this.$store.commit('account/setuserId', obj.id)
        this.$router.replace({path:"/activityManagement/mammon/mammonDetails"});
      },
      handleRed (obj) {
        console.log(obj)
        this.$store.commit('account/setuserId', obj.id)
        console.log(obj.id)
        this.$router.replace({path:"/activityManagement/mammon/redManagement"});
      },
      // 启用
      goSelect (record) {
        console.log(record);
        if(record.status==="NORMAL") {
          updateConfigStatus({
            data:({
              status: "DISABLE",
              id: record.id,
              updateId: this.$store.state.account.userId,
            })})
            .then(res => {
              this.$emit("userOnload");

            }).catch();
        } else if (record.status==="DISABLE") {
          updateConfigStatus({
            data:({
              id: record.id,
              updateId: this.$store.state.account.userId,
              status: "NORMAL"
            })})
            .then(res => {
              this.$emit("userOnload");

            }).catch();
        }


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
