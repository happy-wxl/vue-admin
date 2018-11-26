<template>
  <div>
    <!-- table -->
    <a-card>
            <a-form-item
               v-for="col in data"
              label="手机号"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 16, offset: 0}"
               :key="col.key"
            >
              <a-input
                placeholder="请输入准确手机号" />
            </a-form-item>
        <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMeber">新增成员</a-button>

    </a-card>
  </div>
</template>

<script>

  export default {
    name: "AdvancedForm",
    data () {
      return {
        description: '高级表单常见于一次性输入和提交大批量数据的场景。',
        loading: false,

        // table
        data: [
          {
            key: '1',
          }
        ]
      }
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault()
      },
      newMeber () {
        this.data.push({
          key: '+1',
        })
      },
      remove (key) {
        const newData = this.data.filter(item => item.key !== key)
        this.data = newData
      },
      saveRow (key) {
        let target = this.data.filter(item => item.key === key)[0]
        target.editable = false
        target.isNew = false
      },
      toggle (key) {
        let target = this.data.filter(item => item.key === key)[0]
        target.editable = !target.editable
      },
      getRowByKey (key, newData) {
        const data = this.data
        return (newData || data).filter(item => item.key === key)[0]
      },
      cancle (key) {
        let target = this.data.filter(item => item.key === key)[0]
        target.editable = false
      },
      handleChange (value, key, column) {
        const newData = [...this.data]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          target[column] = value
          this.data = newData
        }
      },

      // 最终全页面提交
      validate () {
        this.$refs.repository.form.validateFields((err, values) => {
          if (!err) {
            this.$notification['error']({
              message: 'Received values of form:',
              description: values
            })
          }
        })
        this.$refs.task.form.validateFields((err, values) => {
          if (!err) {
            this.$notification['error']({
              message: 'Received values of form:',
              description: values
            })
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .card{
    margin-bottom: 24px;
  }
</style>
