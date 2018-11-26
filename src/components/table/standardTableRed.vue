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
      :locale="{emptyText:'查无红包'}"
    >
      <span slot="type" slot-scope="text,record">
        <a-badge :status="record.isFinish==='NO'?'success':'default'" />{{record.isFinish==="NO"?"派发中":"派发完"}}
      </span>
      <span slot="disabled" slot-scope="text,record">
        <a-badge :status="record.isDisable==='NO'?'success':'default'" />{{record.isDisable==="YES"?"禁用":"启用"}}
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
            {{record.isDisable==='NO'?"禁用":"启用"}}
          </a>
        </a-popconfirm>
      </span>
    </a-table>
  </div>
</template>

<script>
  import { isDisable } from "../../api/user.js";
  export default {
    name: 'standardTableRed',
    props: ['bordered', 'loading', 'columns', 'dataSource', 'rowKey', 'pagination', 'selectedRows'],
    data () {
      return {
        needTotalList: [],
        selectedRowKeys: []
      }
    },
    methods: {
      // 启用
      goSelect (record) {
        console.log(record);
        if(record.isDisable==="YES") {
          isDisable({
            data:({
              id: record.id,
              isDisable: "NO"
            })})
            .then(res => {
              this.$emit("userOnload");

            }).catch();
        } else {
          isDisable({
            data:({
              id: record.id,
              isDisable: "YES"
            })})
            .then(res => {
              this.$emit("userOnload");

            }).catch();
        }


      },
      thisPage (value) {
        console.log(value)
        this.$emit("userLList",value);
        this.onClearSelected();
      },
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
        console.log(obj.id)
        this.$store.commit('account/setuserId', obj.id)
        this.$router.replace({path:"/userList/redManage/redDetails"});
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

