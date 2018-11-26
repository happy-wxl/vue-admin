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
      :locale="{emptyText:'查无广告'}"
    >
      <span slot="time" slot-scope="text,record">
        <a-badge />{{record.createTime | FormatDate}}
      </span>
      <span slot="time1" slot-scope="text,record">
        <a-badge />{{record.showTime | FormatDate}}
      </span>
      <span slot="type" slot-scope="text,record">
        <a-badge />{{record.mode==="TEMP"?"单次":"循环"}}
      </span>
      <span slot="status" slot-scope="text,record">
        <a-badge /><img style="height: 150px" :src="record.imagePath" alt="">
      </span>
      <span slot="status1" slot-scope="text,record">
        <a-badge />{{record.scope==="COUNTRY"?"全国":""}}
      </span>
      <span slot="open" slot-scope="text,record">
        <a-badge :status="record.status==='NORMAL'?'success':'default'" />{{record.status==="NORMAL"?"启用":"禁用"}}
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
        <a-divider type="vertical" />
<a-popconfirm
  v-if="dataSource.length"
  title="确定要置顶吗？"
  okText="确认"
  cancelText="取消"
  @confirm="() => goTop(record)">
           <a class="ant-dropdown-link" href="javascript:;">
            置顶
          </a>
        </a-popconfirm>
      </span>
    </a-table>
  </div>
</template>

<script>
  import { updateStatus,updateSponsorStatus, updateConfigStatus,stickSponsor } from "../../api/user.js";
  export default {
    name: 'StandardTable',
    props: ['bordered', 'loading', 'columns', 'dataSource', 'rowKey', 'pagination', 'selectedRows'],
    data () {
      return {
        needTotalList: [],
        selectedRowKeys: [],
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
        console.log(233333333)
        this.$emit("handleEdit",obj)
      },
      // 启用
      goSelect (record) {
        console.log(record);
        if(record.status==="NORMAL") {
          updateSponsorStatus({
            data:({
              status: "DISABLE",
              id: record.id,
              updateId: record.updateId,
            })})
            .then(res => {
              this.$emit("userOnload");

            }).catch();
        } else {
          updateSponsorStatus({
            data:({
              id: record.id,
              updateId: record.updateId,
              status: "NORMAL"
            })})
            .then(res => {
              this.$emit("userOnload");

            }).catch();
        }


      },
      goTop (record) {
        console.log(record);
        stickSponsor({
          data:({
            id: record.id,
          })})
          .then(res => {
            this.$emit("userOnloadTop");

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
