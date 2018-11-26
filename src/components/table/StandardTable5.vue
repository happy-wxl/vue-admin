<template>
  <div class="standard-table">
    <div class="alert">
      <a-alert type="info" :show-icon="true">
        <div slot="message">
          已选择&nbsp;<a style="font-weight: 600">{{selectedRows.length}}</a>&nbsp;项&nbsp;&nbsp;
          <template  v-for="(item, index) in needTotalList" v-if="item.userTotal">
            {{item.title}}总计&nbsp;
            <a :key="index" style="font-weight: 600">
              {{item.customRender ? item.customRender(item.total) : item.total}}
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
      :pagination="pagination"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: updateSelect}"
      :locale="{emptyText:'暂无红包'}"
    >
      <span slot="action" slot-scope="text, record">
      <a @click="handleEdit(record)">编辑</a>
      <a-divider type="vertical" />
        <a-popconfirm
          v-if="dataSource.length"
          title="确定要删除吗？"
          okText="确认"
          cancelText="取消"
          @confirm="() => redDelete(record)">
           <a class="ant-dropdown-link" href="javascript:;">
            删除
          </a>
        </a-popconfirm>
      </span>
    </a-table>
  </div>
</template>

<script>
  import { removeRedpack } from "../../api/user.js";
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
      handleEdit (obj) {
        this.$emit("handleEdit",obj)
      },
      redDelete (record) {
        console.log(3.23232)
        removeRedpack({
          data:({
            id:record.id
          })})
          .then(res => {
            this.$emit("redDelete")
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
