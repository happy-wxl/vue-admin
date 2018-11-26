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
      :locale="{emptyText:'查无用户'}"
    >
      <span slot="time" slot-scope="text,record">
        <a-badge />{{record.registerTime | FormatDate}}
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
        <a-popconfirm
          v-if="dataSource.length"
          title="确定要这样操作吗？"
          okText="确认"
          cancelText="取消"
          @confirm="() => goSelect(record)">
           <a class="ant-dropdown-link" href="javascript:;">
            {{record.status==="NORMAL"?"禁用":"启用"}}
          </a>
        </a-popconfirm>
      </span>
    </a-table>
  </div>
</template>

<script>
  import { updateStatus } from "../../api/user.js";
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
        this.selectedRowKeys = []
        this.updateSelect([], [])
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
        this.$router.replace({path:"/userList/userDetails/userDetails"});
      },
      // 启用
      goSelect (record) {
        console.log(record);
        if(record.status==="NORMAL") {
          updateStatus({
            data:({
              userId: record.userId,
              status: "DISABLE"
            })})
            .then(res => {
              this.$emit("userOnload");

            }).catch();
        } else {
          updateStatus({
            data:({
              userId: record.userId,
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
