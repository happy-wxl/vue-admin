<template>
  <div class="clearfix">
    <a-upload
      name="fileData"
      :data="{type:'REDPACK', userId:$store.state.account.user.data}"
      action="http://testadmin.yqh168.com/v1/image/uploadImg"
      listType="picture-card"
      :fileList="fileList"
      @preview="handlePreview"
      @change="handleChange"
      :beforeUpload="beforeUpload"
    >
      <div v-if="fileList.length < 9">
        <a-icon type="plus" />
        <div class="ant-upload-text">上传</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        previewVisible: false,
        previewImage: '',
        fileList:[]
      }
    },
    props:{
      fileLists:Array,
    },
    created () {
      console.log(this.fileList)
this.fileList=this.fileLists;
    },
    methods: {
      handleCancel () {
        this.previewVisible = false
      },
      handlePreview (file) {
        console.log(file)
        this.previewImage = file.url || file.thumbUrl
        this.previewVisible = true
      },
      handleChange ({ fileList }) {
        console.log(fileList);
        this.fileList = fileList
        console.log(this.fileList)
        let a=this.fileList.filter(v=>v.status==="done");
        let b=this.fileList.filter(v=>v.status!=="done");
        let a1=[];
        a.forEach((item) =>{
            a1.push(item.response.data)
        })
          b.forEach((item) =>{
            a1.push(item.id)
          })
   let b1=a1.join(",")
          console.log(b1)
          this.$emit("imgPath",b1)
      },
      beforeUpload (file) {
        console.log(file)
        let a="image/png";
        let b="image/jpeg";
        const isJPG = file.type===a || file.type===b;
        if (!isJPG) {
          this.$message.error('你上传的格式不正确')
        }
        const isLt2M = file.size / 1024 / 1024 < 5
        if (!isLt2M) {
          this.$message.error('图片必须小于 5MB!')
        }
        return isJPG && isLt2M;
        // let fd = new FormData();//通过form数据格式来传
        // // fd.append("filed", file); //传文件
        // fd.append("shop_code", code); //传其他参数

      },
    },
  }
</script>
<style>
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
