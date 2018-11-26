<template>
  <a-upload
    name="fileData"
    listType="picture-card"
    class="avatar-uploader"
    :showUploadList="false"
    :data="{type:'SPONSOR', userId:$store.state.account.user.data}"
    action="http://testadmin.yqh168.com/v1/image/uploadImg"
    :beforeUpload="beforeUpload"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">上传</div>
    </div>
  </a-upload>
</template>
<script>
  function getBase64 (img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  export default {
    data () {
      return {
        loading: false,
        imageUrl: this.imgPathf || "",
        fileData: ""
      }
    },
    props:{
      imgPathf:{
        type: String
      }
    },
    methods: {
      handleChange (info) {
        if (info.file.status === 'uploading') {
          this.loading = true
          console(this.imageUrl);
          return
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          console.log(info);
          getBase64(info.file.originFileObj, (imageUrl) => {
            this.imageUrl = imageUrl
            console.log(this.imageUrl);
            this.loading = false
          })
          this.$emit("imgUrl",info.file.response.data)
        }
      },
      beforeUpload (file) {
        let a="image/png";
        let b="image/jpeg";
        const isJPG = file.type===a || file.type===b;
        console.log(a);
        console.log(file.type);
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
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  img{
    height: 128px;
  }
</style>
