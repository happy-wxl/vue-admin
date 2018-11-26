<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal" @submit="onSubmit" :autoFormCreate="(form)=>{this.form = form}">
          <a-row >
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="发放模式"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="mode"
              >
                <a-select placeholder="请选择">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="TEMP">单次</a-select-option>
                  <a-select-option value="FOREVER">循环</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="创建时间"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
              >
                <a-date-picker
                  format="YYYY-MM-DD"
                  placeholder="创建时间"
                  style="width: 100%"
                  @change="thisTime"
                  v-model="timitime"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="发放内容"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="content"
              >
                <a-input placeholder="请输入" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="advanced">
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="发放人群"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="sex"
              >
                <a-select placeholder="请选择">
                  <a-select-option value="ALL">全部</a-select-option>
                  <a-select-option value="FEMALE">女</a-select-option>
                  <a-select-option value="MALE">男</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="发放区域"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="scope"
              >
                <a-select placeholder="请选择">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="COUNTRY">全国</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <a-form-item
                label="发放状态"
                :labelCol="{span: 5}"
                :wrapperCol="{span: 18, offset: 1}"
                fieldDecoratorId="status"
              >
                <a-select placeholder="请选择">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="NORMAL">启用</a-select-option>
                  <a-select-option value="DISABLE">禁用</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary" htmlType='submit'>查询</a-button>
          <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
        </span>
      </a-form>
    </div>
    <div>
      <div class="operator">
        <a-button @click="addNew" type="primary">新建</a-button>
        <a-modal
          title="新建设置"
          v-model="visible1"
          @ok="handleOk1(mesaData.time)"
          :confirmLoading="confirmLoading1"
          align="center"
          okText="确认"
          cancelText="取消"
          destroyOnClose="true"
        >
          <a-form :autoFormCreate="(form)=>{this.form = form}">

            <a-form-item
              label='发放内容'
              hasFeedback
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 0}"
            >
              <a-textarea placeholder="请输入" maxlength="70" :autosize="{ minRows: 3, maxRows: 6 }" v-model="mesaData.content" />
            </a-form-item>

            <a-form-item
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 0}"
              label='发放模式'
              hasFeedback
            >
              <a-select placeholder='TEMP' v-model="mesaData.mode">
                <a-select-option value="TEMP">单次</a-select-option>
                <a-select-option value="FOREVER">循环</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 0}"
              label='发放时间'
              hasFeedback
            >
              <a-date-picker
                style="width: 100%"
                format="YYYY-MM-DD HH:mm:00"
                placeholder="选择时间"
                v-model="mesaData.time"
                :disabledDate="disabledDate"
                :showTime="{  format: 'HH:mm' }"
                @change="messageAddTime"
                :showToday="false"
              />
            </a-form-item>
            <a-form-item
              label="发放人群"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 0}"
            >
              <a-select placeholder='ALL' v-model="mesaData.sex">
                <a-select-option value='ALL'>全部</a-select-option>
                <a-select-option value='MALE'>男</a-select-option>
                <a-select-option value='FEMALE'>女</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="发放范围"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 0}"
            >
              <a-select placeholder='country' v-model="mesaData.country">
                <a-select-option value='country'>全国</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="渠道"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 0}"
            >
              <a-row>
                <a-col :span="10"><a-checkbox @click="check4" :default-checked="adda" ref="check4" value="官方消息">官方消息</a-checkbox></a-col>
                <a-col :span="10"><a-checkbox @click="check5" :default-checked="addb" ref="check5" value="短信">短信</a-checkbox></a-col>
                <a-col :span="10"><a-checkbox @click="check6" :default-checked="addc"  ref="check6" value="公告">公告</a-checkbox></a-col>
                <a-col :span="14"><a-select placeholder='1' >
                  <a-select-option value='1'>1</a-select-option>
                  <a-select-option value='2'>2</a-select-option>
                  <a-select-option value='3'>3</a-select-option>
                </a-select></a-col>
              </a-row>
            </a-form-item>
              <span ref="cont" style="color: red;text-indent: 100px;display: inline-block;width: 100%;"></span>
          </a-form>
        </a-modal>
      </div>
      <s-table
        :columns="columns"
        :dataSource="dataSource"
        :selectedRows="selectedRows"
        @change="onchange"
        @handleEdit="handleEdit"
        @userOnload="userOnload"
        :pagination="pagination"
        @userLList="userLList"
        destroyOnClose="true"
      >
      </s-table>
      <a-modal
        title="编辑设置"
        v-model="visible"
        @ok="handleOk(timer)"
        :confirmLoading="confirmLoading"
        align="center"
        okText="确认"
        cancelText="取消"
        destroyOnClose="true"
      >
        <a-form :autoFormCreate="(form)=>{this.form = form}">

          <a-form-item
            label='发放内容'
            hasFeedback
            :labelCol="{span: 5}"
            :wrapperCol="{span: 18, offset: 0}"
          >
            <a-textarea placeholder="请输入" maxlength="70" :autosize="{ minRows: 3, maxRows: 6 }" v-model="mdl.content" />
          </a-form-item>

          <a-form-item
            :labelCol="{span: 5}"
            :wrapperCol="{span: 18, offset: 0}"
            label='发放模式'
            hasFeedback
          >
            <a-select placeholder='TEMP' v-model="mdl.mode">
              <a-select-option value="TEMP">单次</a-select-option>
              <a-select-option value="FOREVER">循环</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :labelCol="{span: 5}"
            :wrapperCol="{span: 18, offset: 0}"
            label='发放时间'
            hasFeedback
          >
            <a-date-picker
              style="width: 100%"
              format="YYYY-MM-DD HH:mm:00"
              placeholder="选择时间"
              v-model="timer"
              :disabledDate="disabledDate"
              :showTime="{  format: 'HH:mm' }"
              @change="messageUpTime"
              :showToday="false"
            />
          </a-form-item>
          <a-form-item
            label="发放人群"
            :labelCol="{span: 5}"
            :wrapperCol="{span: 18, offset: 0}"
          >
            <a-select placeholder='ALL' v-model="mdl.sex">
              <a-select-option value='ALL'>全部</a-select-option>
              <a-select-option value='MALE'>男</a-select-option>
              <a-select-option value='FEMALE'>女</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="发放范围"
            :labelCol="{span: 5}"
            :wrapperCol="{span: 18, offset: 0}"
          >
            <a-select placeholder='country' v-model="country">
              <a-select-option value='country'>全国</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="渠道"
            :labelCol="{span: 5}"
            :wrapperCol="{span: 18, offset: 0}"
          >
            <a-row>
              <a-col :span="10"><a-checkbox @click="check1" :defaultChecked="a" ref="check1" value="官方消息">官方消息</a-checkbox></a-col>
              <a-col :span="10"><a-checkbox @click="check2" :defaultChecked="b" ref="check2" value="短信">短信</a-checkbox></a-col>
              <a-col :span="10"><a-checkbox @click="check3" :defaultChecked="c" ref="check3" value="公告">公告</a-checkbox></a-col>
              <a-col :span="14"><a-select placeholder='1' >
                <a-select-option value='1'>1</a-select-option>
                <a-select-option value='2'>2</a-select-option>
                <a-select-option value='3'>3</a-select-option>
              </a-select></a-col>
            </a-row>
          </a-form-item>
            <span ref="cont1" style="color: red;text-indent: 100px;display: inline-block;width: 100%"></span>
        </a-form>
      </a-modal>
    </div>
  </a-card>
</template>
<script>
  import sTable from '../../components/table/StandardTable1'
  import { noticeConfig,addNotice,updateNotice} from "../../api/user.js";
  import moment from 'moment';

  const columns = [
    { title: '创建时间',
      dataIndex: 'createSTime',
    },
    { title: '发送模式',
      key: 'state',
      scopedSlots: { customRender: 'status' }
    },
    { title: '发送时间',
      dataIndex: 'releaseTime',
    },
    {
      title: '发送内容',
      dataIndex: 'content',
      width:"20%",
      sorter: true
    },
    { title: '发送人群',
      key: 'state',
      scopedSlots: { customRender: 'open' }
    },
    { title: '发放区域',
      key: 'state',
      scopedSlots: { customRender: 'country' }
    },
    { title: '发放渠道',
      key: 'state',
      scopedSlots: { customRender: 'message' }
    },
    { title: '发放状态',
      key: 'state',
      scopedSlots: { customRender: 'type' }
    },
    {
      title: '操作',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' },
    }
  ]

  export default {
    name: 'messageManagement',
    components: {
      sTable
    },
    data () {
      return {
        advanced: true,
        columns: columns,
        dataSource: [],
        selectedRowKeys: [],
        selectedRows: [],
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [{
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [{
                value: 'xihu',
                label: 'West Lake',
              }],
            }],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [{
              value: 'nanjing',
              label: 'Nanjing',
              children: [{
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              }],
            }],
          }],
        searchVal:'',
        visible:false,
        visible1:false,
        confirmLoading:false,
        confirmLoading1:false,
        mdl:{},
        datauser:[],
        country:"",
        timer:"",
        mesaData:{
          content:"",
          mode:"",
          sex:"",
          time:"",
          country:"",
          is_news: "NO",
          is_message: "NO",
          is_notice: "NO",
        },
        newmes:{
          is_news: "NO",
          is_message: "NO",
          is_notice: "NO",
        },
        pagination:{},
        applicationTime:"",
        a:"",
        b:"",
        c:"",
        adda:false,
        addb:false,
        addc:false,
        numb:1,
        loading:false,
        selectDataSource:{},
        timitime:"",
        dateB:"",
        dateC:"",
      }
    },
    created () {
      this.noticeConfig(this.numb);
    },
    methods: {
      messageAddTime (date, dateString) {
        console.log(dateString,date)
        this.dateB=dateString;
      },
      messageUpTime (date, dateString) {
        console.log(dateString,date)
        this.dateC=dateString;
      },
      moment,
      range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
      },
      disabledDate(current) {
        return current && current < moment().startOf('day');
      },
      disabledDateTime() {
        return {
          disabledHours: () => {
            console.log(moment())
            var hours = [];
            for(var i =0; i < moment().hour(); i++){
              hours.push(i);
            }
            return hours;
          },
          disabledMinutes: (selectedHour) => {
            console.log(selectedHour)
            var minutes= [];
            if(selectedHour===moment().hour()) {
              for(var i =0; i <= moment().minute()+1; i++){
                minutes.push(i);
              }
            }
            return minutes;
          },
        };
      },
      userOnload () {
        this.noticeConfig(this.pagination.current);
      },
      check1(){
        console.log(this.$refs.check1.value);
        console.log(this.$refs.check1.value)
        this.a=!this.a;
        if (this.a===true) {
          this.newmes.is_news="YES"
        }  else {
          this.newmes.is_news="NO"
        }
        console.log(this.newmes.is_news)
      },
      check2(){
        console.log(this.$refs.check2.value);
        console.log(this.$refs.check2.value)
        this.b=!this.b;
        if (this.b===true) {
          this.newmes.is_message="YES"
        }  else {
          this.newmes.is_message="NO"
        }
        console.log(this.newmes.is_message)
      },
      check3(){
        console.log(this.$refs.check3.value);
        console.log(this.$refs.check3.value)
        this.c=!this.c;
        if (this.c===true) {
          this.newmes.is_notice="YES"
        }  else {
          this.newmes.is_notice="NO"
        }
        console.log(this.newmes.is_notice)
      },
      check4(){
        this.adda=!this.adda;
        console.log(this.adda)
        if (this.adda===true) {
          this.mesaData.is_news="YES"
        }  else {
          this.mesaData.is_news="NO"
        }
        console.log(this.mesaData.is_news)
      },
      check5(){
        this.addb=!this.addb;
        if (this.addb===true) {
          this.mesaData.is_message="YES"
        }  else {
          this.mesaData.is_message="NO"
        }
        console.log(this.mesaData.is_message)
      },
      check6(){
        this.addc=!this.addc;
        if (this.addc===true) {
          this.mesaData.is_notice="YES"
        }  else {
          this.mesaData.is_notice="NO"
        }
        console.log(this.mesaData.is_notice)
      },
      thisTime (value) {
        console.log(value);
        this.applicationTime=value.format("YYYY-MM-DD");
        console.log(this.applicationTime)
      },
      // 封装消息信息
      userLists(page,limit,mode,status,sex,scope,content,createDate) {
        this.loading = false;
        noticeConfig({
          data:({
            page: page,
            limit: limit,
            mode: mode,
            status: status,
            sex: sex,
            scope: scope,
            content: content,
            createDate: createDate
          })})
          .then(res => {
            this.datauser=res.data.data.list;
            console.log(this.datauser)
            this.dataSource=this.datauser
            const pagination = { ...this.pagination };
            pagination.total = res.data.data.total;
            this.loading = false;
            this.pagination = pagination;

          }).catch();
      },
      onSubmit (e) {
        e.preventDefault()
        this.form.validateFields((error, values) => {
          console.log('Received values of form: ', values,this.applicationTime)
          this.selectDataSource=values;
          const pager = { ...this.pagination };
          pager.current=1;
          this.pagination=pager
          this.userLists(1,10,values.mode,values.status,values.sex,values.scope,values.content,this.applicationTime);
        })
      },
      handleReset () {
        this.applicationTime="";
        this.form.resetFields();
        this.timitime="";
        this.selectDataSource={};
        this.noticeConfig(this.numb);
        const pager = { ...this.pagination };
        pager.current=1;
        this.pagination=pager
      },
      userLList(pagination){

        console.log(pagination);
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.userLists(pagination.current,pagination.pageSize,this.selectDataSource.mode,this.selectDataSource.status,this.selectDataSource.sex,this.selectDataSource.scope,this.selectDataSource.content,this.applicationTime);
      },
      handleEdit (record) {
        this.timer="";
        this.a="";
        this.b="";
        this.c="";
        this.mdl = Object.assign({}, record)
        console.log(this.mdl)
        if( this.mdl.isNews==='YES'){
          this.a=true;
        } else {
          this.a=false;
        }
        if( this.mdl.isMessage==='YES'){
          this.b=true;
        } else {
          this.b=false;
        }
        if( this.mdl.isNotice==='YES'){
          this.c=true;
        } else {
          this.c=false;
        }
        this.newmes.is_message=this.mdl.isMessage;
        this.newmes.is_news=this.mdl.isNews;
        this.newmes.is_notice=this.mdl.isNotice;
        console.log(this.a,this.b,this.c)
        console.log(this.newmes.is_message,this.newmes.is_news,this.newmes.is_notice)
        console.log(this.mdl.isNews)
        if (this.mdl.scope==="COUNTRY"){
          this.country="全国"
        }
        this.visible = true
      },
      noticeConfig (obj) {
        noticeConfig({
          data:({
            page: obj,
            limit: 10
          })})
          .then(res => {
            this.datauser=res.data.data.list;
            console.log(this.datauser)
            this.dataSource=this.datauser
            const pagination = { ...this.pagination };
            pagination.total = res.data.data.total;
            this.loading = false;
            this.pagination = pagination;

          }).catch();
      },
      handleOk1(e) {
        if (e.length===0) {
          this.$refs.cont.innerHTML="请选择发放时间不能为空";
          setTimeout(() => {
            this.$refs.cont.innerHTML=""
          }, 3000);
        } else {
          var date = new Date();
          var seperator1 = "-";
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          var strHour=date.getHours();
          var strMi=date.getMinutes();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          var currentdate = year + seperator1 + month + seperator1 + strDate+" "+strHour+":"+strMi;
          console.log(currentdate)
          console.log(this.dateB)
          var startDateTemp = this.dateB.split(" ");
          var endDateTemp = currentdate.split(" ");

          var arrStartDate = startDateTemp[0].split("-");
          var arrEndDate = endDateTemp[0].split("-");

          var arrStartTime = startDateTemp[1].split(":");
          var arrEndTime = endDateTemp[1].split(":");

          var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1]);
          var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2], arrEndTime[0], arrEndTime[1]);
          console.log(allStartDate,allEndDate)
          if (allStartDate.getTime() > allEndDate.getTime()) {
            addNotice({
              data:({
                content:this.mesaData.content,
                mode:this.mesaData.mode,
                sex:this.mesaData.sex,
                startTime:allStartDate,
                scope:this.mesaData.country,
                isNews: this.mesaData.is_news,
                isMessage: this.mesaData.is_message,
                isNotice: this.mesaData.is_notice,
                createId: this.$store.state.account.user.data
              })})
              .then(res => {
                if (res.data.code===200) {
                  const pager = { ...this.pagination };
                  pager.current=1;
                  this.pagination=pager
                  this.noticeConfig(this.numb);
                  this.confirmLoading1 = true;
                  setTimeout(() => {
                    this.visible1 = false;
                    this.confirmLoading1 = false;
                  }, 2000);
                } else {
                  this.$refs.cont.innerHTML=res.data.message;
                  setTimeout(() => {
                    this.$refs.cont.innerHTML=""
                  }, 3000);
                }

              }).catch();
          } else {
            this.$refs.cont.innerHTML="发放时间必须大于当前时间";
            setTimeout(() => {
              this.$refs.cont.innerHTML=""
            }, 3000);
          }
        }

      },
      handleOk(e) {
        if (e.length===0) {
          this.$refs.cont1.innerHTML="请选择发放时间不能为空";
          setTimeout(() => {
            this.$refs.cont1.innerHTML=""
          }, 3000);
        } else {
          var date = new Date();
          var seperator1 = "-";
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          var strHour=date.getHours();
          var strMi=date.getMinutes();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          var currentdate = year + seperator1 + month + seperator1 + strDate+" "+strHour+":"+strMi;
          console.log(currentdate)
          console.log(this.dateC)
          var startDateTemp = this.dateC.split(" ");
          var endDateTemp = currentdate.split(" ");

          var arrStartDate = startDateTemp[0].split("-");
          var arrEndDate = endDateTemp[0].split("-");

          var arrStartTime = startDateTemp[1].split(":");
          var arrEndTime = endDateTemp[1].split(":");

          var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1]);
          var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2], arrEndTime[0], arrEndTime[1]);
          if (allStartDate.getTime() > allEndDate.getTime()) {
            updateNotice({
              data: ({
                content: this.mdl.content,
                mode: this.mdl.mode,
                sex: this.mdl.sex,
                startTime: allStartDate,
                scope: this.mdl.country,
                isNews: this.newmes.is_news,
                isMessage: this.newmes.is_message,
                isNotice: this.newmes.is_notice,
                updateId: this.$store.state.account.user.data,
                id: this.mdl.id
              })
            })
              .then(res => {
                if (res.data.code === 200) {
                  this.noticeConfig(this.pagination.current);
                  this.confirmLoading = true;
                  setTimeout(() => {
                    this.visible = false;
                    this.confirmLoading = false;
                  }, 2000);
                } else {
                  this.$refs.cont1.innerHTML = res.data.message;
                  setTimeout(() => {
                    this.$refs.cont1.innerHTML = ""
                  }, 3000);
                }

              }).catch();
          } else {
            this.$refs.cont1.innerHTML="发放时间必须大于当前时间";
            setTimeout(() => {
              this.$refs.cont1.innerHTML=""
            }, 3000);
          }
        }
      },
      onChange (row) {
        this.selectedRowKeys = row.selectedRowKeys
        this.selectedRows = row.selectedRows

        console.log(this.$refs.table)
      },
      searchUser () {
        console.log(2);
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
      onchange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      remove () {
        this.dataSource = this.dataSource.filter(item => this.selectedRowKeys.indexOf(item.key) < 0)
        this.selectedRows = this.selectedRows.filter(item => this.selectedRowKeys.indexOf(item.key) < 0)
      },
      addNew () {
        this.visible1=true;
        this.adda=false;
        this.addb=false;
        this.addc=false;
        this.mesaData.content="";
        this.mesaData.mode="";
        this.mesaData.sex="";
        this.mesaData.time="";
        this.mesaData.country="";
        this.mesaData.is_news= "NO";
        this.mesaData.is_message= "NO";
        this.mesaData.is_notice= "NO";
      },
      handleMenuClick (e) {
        if (e.key === 'delete') {
          this.remove()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .search{
    margin-bottom: 54px;
  }
  .fold{
    width: calc(100% - 216px);
    display: inline-block
  }
  .operator{
    margin-bottom: 18px;
  }
  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>



