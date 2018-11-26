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
      :locale="{emptyText:'查无公告'}"
    >
       <span slot="time" slot-scope="text,record">
        <a-badge />{{record.createSTime | FormatDate}}
      </span>
      <span slot="time1" slot-scope="text,record">
        <a-badge />{{record.releaseTime | FormatDate}}
      </span>
      <span slot="status" slot-scope="text,record">
        <a-badge />{{record.mode==="TEMP"?"单次":"循环"}}
      </span>
      <span slot="country" slot-scope="text,record">
        <a-badge />全国
      </span>
      <span slot="type" slot-scope="text,record">
        <a-badge :status="record.status==='NORMAL'?'success':'default'" />{{record.status==="NORMAL"?"启用":"禁用"}}
      </span>
      <span slot="open" slot-scope="text,record">
        <span v-if="record.sex==='ALL'">
          全部
        </span>
 <span v-else-if="record.sex==='FEMALE'">
          女
        </span>
         <span v-else-if="record.sex==='MALE'">
          男
        </span>
        <span v-else>
          <a-badge />
        </span>
      </span>
      <span slot="message" slot-scope="text,record">
        <span v-if="record.isNews==='YES' && record.isMessage==='YES' && record.isNotice==='YES'">
          <a-badge status="success" />全部
        </span>
        <span v-else-if="record.isNews==='YES' && record.isMessage==='YES' && record.isNotice==='NO'">
          <a-badge status="success" />官方消息/短信
        </span>
        <span v-else-if="record.isNews==='YES' && record.isMessage==='NO' && record.isNotice==='YES'">
          <a-badge status="success" />官方消息/公告
        </span>
        <span v-else-if="record.isNews==='YES' && record.isMessage==='NO' && record.isNotice==='NO'">
          <a-badge status="success" />官方消息
        </span>
        <span v-else-if="record.isNews==='NO' && record.isMessage==='YES' && record.isNotice==='YES'">
          <a-badge status="success" />短信/公告
        </span>
        <span v-else-if="record.isNews==='NO' && record.isMessage==='YES' && record.isNotice==='NO'">
          <a-badge status="success" />短信
        </span>
        <span v-else-if="record.isNews==='NO' && record.isMessage==='NO' && record.isNotice==='YES'">
          <a-badge status="success" />公告
        </span>
        <span v-else-if="record.isNews==='NO' && record.isMessage==='NO' && record.isNotice==='NO'">
          <a-badge status="default" />无
        </span>
        <span v-else>
          <a-badge />
        </span>
      </span>
      <span slot="action" slot-scope="text, record">
      <a @click="handleEdit(record)">编辑</a>
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
  import { noticeConfigStatus } from "../../api/user.js";
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
      // 启用
      goSelect (record) {
        console.log(record);
        if(record.status==="NORMAL") {
          noticeConfigStatus({
            data:({
              id: record.id,
              status: "DISABLE"
            })})
            .then(res => {
              this.$emit("userOnload");

            }).catch();
        } else {
          noticeConfigStatus({
            data:({
              id: record.id,
              status: "NORMAL"
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
        this.$emit("handleEdit",obj)
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
