<template>
  <div class="info-box">
    <div class="title">
      <div style='display:flex'>
        <div @click="goBack" v-if="active !== 1" style="cursor: pointer">
          <i class="el-icon-back" style="font-size:14px;color:#666"></i>
          <span style="padding-left: 5px;font-size:14px;color:#666">返回</span>
          <span style="padding:0px 10px;cursor:auto">|</span>
        </div>
        <div class="name">在招职位</div>
      </div>
      <!--click点击哪个 就显示当前的值-->
      <el-dropdown v-if="active === 2" style="cursor: pointer">
        <span class="el-dropdown-link">
          条件筛选({{ tj }})<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            @click.native="clickItem(item)"
            v-for="item in tiaojian"
            :key="item.id"
            >{{ item.value }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="info notAllow" v-if="userinfo.user.status === 1">
      <el-alert
        title="您还没有进行企业认证"
        type="warning"
        :closable="false"
        center
        description="请前往企业认证页面进行认证或点击下方按钮进行跳转"
        show-icon
      >
      </el-alert>
      <div class="btn">
        <el-button type="primary" @click="goCelebrity">前往认证</el-button>
      </div>
    </div>
    <div class="info" v-else>
      <div class="content" v-if="active === 1">
        <el-alert
          v-if="!isHave"
          title="暂无发布"
          type="warning"
          :closable="false"
          show-icon
        ></el-alert>
        <div v-else class="list">
          <div class="item-box" v-for="(item,index) in list.jobs" :key="index">
            <div class="item">
              <el-image
                class="user-img"
                :src="item.image"
                fit="cover"
              ></el-image>
              <div class="user-info">
                <div class="user-name">
                  <span class="head" @click="watchDetail(item.id)">{{
                    item.title
                  }}</span>
                  <span>{{ item.launch }}</span>
                </div>
                <div class="content">
                  <span>职位：{{ item.job }}</span>
                  <span
                    >时间：{{ Number(item.begintime) | formatDate }} -
                    {{ Number(item.endtime) | formatDate }}</span
                  >
                </div>
                <div class="content">
                  <span>面试地点：{{ item.place }}</span>
                  <span>年龄要求：{{ item.age }}岁</span>
                  <span>薪资：{{ item.money }}</span>
                </div>
                <div class="content oneLine">要求：{{ item.jobneed }}</div>
              </div>
              <div class="user-btn">
                <div>
                  <el-button
                    type="primary"
                    size="mini"
                    plain
                    @click="watchDeliver(item.id)"
                    >查看投递</el-button
                  >
                </div>
                <div>
                  <el-button
                    type="warning"
                    size="mini"
                    plain
                    @click="editJob(item)"
                    >修改职位</el-button
                  >
                </div>
                <div>
                  <el-button
                    type="danger"
                    size="mini"
                    plain
                    @click="cancel(item.id)"
                    >删除职位</el-button
                  >
                </div>
              </div>
            </div>
            <el-divider></el-divider>
          </div>
        </div>
        <div class="footer-page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="6"
            layout="prev, pager, next"
            :page-count="list.allpage"
            hide-on-single-page
          >
          </el-pagination>
        </div>
      </div>
      <div class="content" v-else-if="active === 0">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="90px"
          class="demo-ruleForm"
          :disabled="flag"
        >
          <el-form-item label="项目标题" prop="title">
            <el-input
              maxlength="10"
              v-model="ruleForm.title"
              placeholder="请输入项目标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="截止日期" prop="endtime">
            <el-date-picker
              v-model="ruleForm.endtime"
              type="date"
              value-format="timestamp"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="项目照片" prop="image">
            <!--element上传图片按钮-->
            <el-upload
            :http-request="upload"
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :on-change='changeUpload'
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i> </el-upload>
               <!-- vueCropper 剪裁图片实现-->
            <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
            <div class="cropper-content">
                <div class="cropper" style="text-align:center">
                <vueCropper
                    ref="cropper"
                    :img="option.img"
                    :outputSize="option.size"
                    :outputType="option.outputType"
                    :info="true"
                    :full="option.full"
                    :canMove="option.canMove"
                    :canMoveBox="option.canMoveBox"
                    :original="option.original"
                    :autoCrop="option.autoCrop"
                    :fixed="option.fixed"
                    :fixedNumber="option.fixedNumber"
                    :centerBox="option.centerBox"
                    :infoTrue="option.infoTrue"
                    :fixedBox="option.fixedBox"
                ></vueCropper>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
            </div>
            </el-dialog>
          </el-form-item>
          <el-form-item label="职位要求" prop="jobneed">
            <el-input
              maxlength="150"
              :show-word-limit="true"
              resize="none"
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6 }"
              v-model="ruleForm.jobneed"
              placeholder="请输入职位要求"
            ></el-input>
          </el-form-item>
          <el-form-item label="面试地点" prop="place">
            <el-input
              v-model="ruleForm.place"
              placeholder="请输入面试地点"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目周期" prop="worktime">
            <el-input
              v-model="ruleForm.worktime"
              placeholder="请输入项目周期"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目详情" prop="description">
            <el-input
              maxlength="300"
              :show-word-limit="true"
              resize="none"
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6 }"
              v-model="ruleForm.description"
              placeholder="请输入项目详情"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">保存</el-button>
          </el-form-item>
        </el-form>
        <!--发布角色-->
        <div>
          <el-divider></el-divider>
          <div v-for="(role, index) in roleList"  :key="'role'+index" >
            <el-form :disabled='flag2' class="ruleForm2" label-width="100px">
              <el-form-item label="职位名称：">
                <span>{{ role.name }}</span>
              </el-form-item>
              <el-form-item label="性别：">
                <span>{{ role.sex }}</span>
              </el-form-item>
              <el-form-item label="年龄：">
                <span>{{ role.age }}</span>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="detelerole(role)">移除</el-button>
              </el-form-item>
              <el-form-item label="招募人数：">
                <span>{{ role.nums }}</span>
              </el-form-item>
              <el-form-item label="薪资：">
                <span>{{ role.money }}</span>
              </el-form-item>
              <el-form-item label="职位详情：">
                <span>{{ role.description }}</span>
              </el-form-item>
            </el-form>
            <el-divider></el-divider>
          </div>
          <div class="warn">
              请在下方添加您所需要招募的项目角色（如：男女主角/配角群演/摄影师/灯光师等等）
          </div>
         <el-form
            :model="ruleForm1"
            :rules="rules1"
            ref="ruleForm1"
            label-width="90px"
            class="demo-ruleForm1"
            :disabled="flag"
          >
            <el-form-item label="职位名称" prop="name">
              <el-select
                v-model="ruleForm1.name"
                placeholder="请选择职位名称"
              >
                <el-option
                  v-for="item in jobType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="ruleForm1.sex" placeholder="请选择性别">
                <el-option
                  v-for="item in sexList"
                  :key="item.value"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input
                maxlength="10"
                v-model="ruleForm1.age"
                placeholder="请输入年龄 例如18-30"
              ></el-input>
            </el-form-item>
            <el-form-item label="招募人数" prop="nums">
              <el-input
                maxlength="10"
                v-model="ruleForm1.nums"
                placeholder="请输入招募人数"
              ></el-input>
            </el-form-item>
            <el-form-item label="薪资" prop="money">
              <el-input
                maxlength="10"
                v-model="ruleForm1.money"
                placeholder="请输入薪资"
              ></el-input>
            </el-form-item>
            <el-form-item label="职位详情" prop="description">
              <el-input
                maxlength="150"
                :show-word-limit="true"
                resize="none"
                type="textarea"
                :autosize="{ minRows: 6, maxRows: 6 }"
                v-model="ruleForm1.description"
                placeholder="请输入项目详情"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm1">添加</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="content" v-else>
        <div class="info1">
          <el-alert
            v-if="!isHave"
            title="暂无投递"
            type="warning"
            :closable="false"
            show-icon
          ></el-alert>
          <div v-else class="list">
            <div class="item-box" v-for="item in list.applys" :key="item.id">
              <div class="item">
                <div class="user-info">
                  <div class="head">
                    <span class="user-name"
                      >角色：<span
                        @click="watchDetail(item.jobid, item.companyInfoId)"
                        >{{ item.rolename }}</span
                      ></span
                    >
                    <span class="user-vip">{{ item.status }}</span>
                  </div>
                  <div class="head1">
                    申请人：
                    <div @click="watchDetail1(item.userinfoId, item.userid)">
                      <el-image
                        class="user-img"
                        :src="item.userimage"
                        fit="cover"
                      ></el-image
                      >{{ item.username }}
                    </div>
                  </div>
                </div>
                <div class="user-btn">
                  <div>
                    <el-button
                      type="primary"
                      size="mini"
                      plain
                      @click="view(item.infoid, item.userinfoId, item.userid)"
                      >查看简历</el-button
                    >
                  </div>
                  <div
                    v-if="
                      item.status !== '已被拒绝' && item.status !== '已被录用'
                    "
                  >
                  <el-button
                      v-if="item.status === '有意向'"
                      type="warning"
                      size="mini"
                      plain
                      @click="intention(item.infoid)"
                      >确认录用</el-button
                    >
                    <el-button
                      v-else
                      type="warning"
                      size="mini"
                      plain
                      @click="openPop(item)"
                      >意向面试</el-button
                    >
                  </div>
                  <div
                    v-if="
                      item.status !== '已被拒绝' && item.status !== '已被录用'
                    "
                  >
                    <el-button
                      type="danger"
                      size="mini"
                      plain
                      @click="refuse(item.infoid)"
                      >拒绝录用</el-button
                    >
                  </div>
                </div>
              </div>
              <el-divider></el-divider>
            </div>
            <div class="footer-page">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="6"
                layout="prev, pager, next"
                :page-count="list.allpage"
                hide-on-single-page
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--弹窗-->
    <el-dialog
      :destroy-on-close="true"
      :title="'发送面试通知--'+ popItem.username"
      :visible.sync="ispop"
      width="500px"
    >
      <el-form
        :model="popruleForm"
        :rules="poprules"
        ref="popruleForm"
        label-width="80px"
        class="popruleForm"
        :disabled="formFlag"
      >
        <el-form-item label="联系人" prop="name">
          <el-input
            v-model="popruleForm.name"
            placeholder="请输入联系人"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input
            v-model="popruleForm.phone"
            placeholder="请输入联系电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="面试地点" prop="place">
          <el-input
            v-model="popruleForm.place"
            placeholder="请输入面试地点"
          ></el-input>
        </el-form-item>
        <el-form-item label="面试时间" prop="time">
          <el-date-picker
           :editable='false'
            v-model="popruleForm.time"
            type="datetime"
            placeholder="请选择面试时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="intentionUser()"
            >确定</el-button
          >
          <el-button
            @click="resetPop"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { companyJob, deleteJob, getJobType, editJob, intentionUser, getAllRole, addRole, deleteRole, findAllDeliver, viewCv, refuseUser, offerUser } from '../../ajax/index';
import { formatDate } from '../../assets/js/date.js';
export default {
  props: ['info', 'companyInfo'],
  data() {
    return {
       fileinfor: '',
       dialogVisible: false,
      // 裁剪组件的基础配置option
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [2.5, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      picsList: [], // 页面显示的数组
      // 防止重复提交
      loading: false,
      flag: false,
      flag1: false,
      flag2: false,
      formFlag: false,
      imageUrl: '',
      imageData: '',
      ruleForm: {
        image: '',
        title: '',
        description: '',
        launch: '',
        place: '',
        jobneed: '',
        worktime: '',
        job: '',
        begintime: '',
        endtime: '',
        type: '1'
      },
      rules: {
        image: [
          { required: true, message: '项目照片不能为空', trigger: 'change' }
        ],
        title: [
          { required: true, message: '项目标题不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '项目详情不能为空', trigger: 'blur' }
        ],
        place: [
          { required: true, message: '面试地点不能为空', trigger: 'blur' }
        ],
        endtime: [
          { required: true, message: '截至日期不能为空', trigger: 'change' }
        ],
        worktime: [
          { required: true, message: '项目周期不能为空', trigger: 'blur' }
        ],
        jobneed: [
          { required: true, message: '职位要求不能为空', trigger: 'blur' }
        ]
      },
      editItem: [], // 选中要修改的项目
      ruleForm1: {
        jobid: '',
        name: '',
        sex: '',
        age: '',
        nums: '',
        money: '',
        description: ''
      },
      rules1: {
        name: [
          { required: true, message: '职位名字不能为空', trigger: 'change' }
        ],
        sex: [
          { required: true, message: '性别不能为空', trigger: 'change' }
        ],
        age: [
          { required: true, message: '年龄不能为空', trigger: 'blur' }
        ],
        nums: [
          { required: true, message: '人数不能为空', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '薪资不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '职位详情不能为空', trigger: 'blur' }
        ]
      },
      active: 1, // 0 发布职位  1 已发布 2 查看投递记录
      isHave: true,
      list: [],
      currentPage: 1,
      currentPage1: 1,
      jobType: [],
      sexList: [{
        value: '男'
      }, {
        value: '女'
      }, {
        value: '不限'
      }],
      isdeleteRole: false,
      roleList: [],
      jobid: '', // 选中的职位id
      tiaojian: [
        { id: 0, value: '全部', code: 'a' },
        { id: 1, value: '待查看', code: 'w' },
        { id: 2, value: '已查看', code: 'h' },
        { id: 3, value: '有意向', code: 'c' },
        { id: 4, value: '已拒绝', code: 'r' },
        { id: 5, value: '已录用', code: 's' }
      ],
      ispop: false, // 查看简历弹窗
      popruleForm: {
        name: '',
        phone: '',
        place: '',
        time: ''
      },
      poprules: {
        name: [
          { required: true, message: '联系人不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' }
        ],
        place: [
          { required: true, message: '面试地点不能为空', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '面试时间不能为空', trigger: 'change' }
        ]
      },
      popItem: {}, // 选中的投递
      filter: 'a' // 投递记录筛选 小写字母 a代表所有  w代表待查看  h代表已查看 r代表拒绝 s代表已录用 c代表有意向根据此条件筛选信息
    };
  },
  methods: {
    goBack() {
      this.currentPage1 = 1;
      this.active = 1;
      this.getCompanyJobs(this.currentPage);
    },
    goCelebrity() {
      this.$emit('goCelebrity');
    },
    async upload(content) {
      this.ruleForm.image = content.file;
    },
    // 切换 发布职位与已发布tabber
    changePage(active) {
      if (active === 1) {
        this.active = 1;
        this.clearJob();
        this.getCompanyJobs(this.currentPage);
      } else {
        this.active = 0;
      }
    },
    handleCurrentChange(val) {
      if (this.active === 1) {
        this.getCompanyJobs(val);
      } else {
        findAllDeliver({
          jobid: this.jobid,
          filter: this.filter,
          num: '6',
          page: val
        }).then(res => {
          if (res.code === '0') {
            this.isHave = true;
            this.list = res.data;
          } else {
            this.isHave = false;
            this.$message.error(res.errMsg);
          }
        }).catch(err => {
          this.isHave = false;
          this.$message.error(err);
          return err;
        });
      }
    },
    // 获取公司所有已发布职位
    getCompanyJobs(page) {
      companyJob({
        page: page
      }).then(res => {
        if (res.code === '0') {
          this.isHave = true;
          this.list = res.data;
        } else {
          this.isHave = false;
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        this.isHave = false;
        this.$message.error(err);
        return err;
      });
    },
    // 发布 项目/职位
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.ruleForm.launch = this.companyInfo.name;
          this.flag = true;
          let arr = [];
          this.roleList.forEach(item => {
            arr.push(item.name);
          });
          this.ruleForm.job = arr.join(',');
          editJob(Object.assign({ id: this.ruleForm1.jobid }, this.ruleForm)).then(res => {
            if (res.code === '0') {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            } else {
              this.$message.error(res.errMsg);
            }
            this.flag = false;
          }).catch(err => {
            this.flag = false;
            this.$message.error(err);
            return err;
          });
        }
      });
    },
    // 发布 角色
    submitForm1() {
      this.$refs.ruleForm1.validate((valid) => {
        if (valid) {
          this.flag1 = true;
          addRole(this.ruleForm1).then(res => {
            if (res.code === '0') {
              this.$message({
                message: '发布成功',
                type: 'success'
              });
              this.getRole(this.ruleForm1.jobid);
              this.$refs.ruleForm1.resetFields();
            } else {
              this.$message.error(res.errMsg);
            }
            this.flag1 = false;
          }).catch(err => {
            this.flag1 = false;
            this.$message.error(err);
            return err;
          });
        }
      });
    },
    // 删除 角色
    detelerole(role) {
      if (this.roleList.length === 1) {
        return this.$message({
          message: '至少需要有一个职位',
          type: 'error'
        });
      }
      this.flag2 = true;
      deleteRole({
        id: role.id
      }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getRole(this.ruleForm1.jobid);
        } else {
          this.$message.error(res.errMsg);
        }
        this.flag2 = false;
      }).catch(err => {
        this.flag2 = false;
        this.$message.error(err);
        return err;
      });
    },
    changeUpload(file, fileList) {
      const isJPG = file.raw.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
        return false;
      }
      this.fileinfor = file;
      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.option.img = URL.createObjectURL(file.raw);
        this.dialogVisible = true;
      });
    },
    finish() {
      this.$refs.cropper.getCropBlob((data) => {
      // data为base64格式地址
        // let arr = data.split(','); let mime = arr[0].match(/:(.*?);/)[1];
        // let bstr = atob(arr[1]); let n = bstr.length; let u8arr = new Uint8Array(n);
        // while (n--) {
        //   u8arr[n] = bstr.charCodeAt(n);
        // }
        // let bdata = new Blob([u8arr], { type: mime });
        // blob 转 file
        let file = new window.File([data], this.fileinfor.name, { type: 'image/jpeg' });
        this.imageUrl = window.URL.createObjectURL(data);
        this.ruleForm.image = file;
//         let fs = require('fs');
//         const path = Date.now() + '.jpg';
//         const base64 = data.replace(/^data:image\/\w+;base64,/, ''); // 去掉图片base64码前面部分data:image/png;base64
// // new Buffer 操作权限太大，v6.0后使用Buffer.from()创建构造函数
//         // eslint-disable-next-line node/no-deprecated-api
//         const dataBuffer = new Buffer(base64, 'base64'); // 把base64码转成buffer对象，
//         console.log(dataBuffer);
//         fs.writeFile(path, dataBuffer, function(err) { // 用fs写入文件
//           if (err) {
//             console.log(err);
//           } else {
//             console.log('写入成功！');
//           }
//         });
        // this.ruleForm.image = fs;
        // console.log(fs);
        console.log(file);
      });
      this.dialogVisible = false;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log('1111111111111111111111111');
      const isJPG = file.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 20;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
      }
      return isJPG && isLt2M;
    },
    // 查看职位详情
    watchDetail(jobid, companyInfoId) {
      this.$router.push('/jobDetail/' + jobid + '/' + companyInfoId);
    },
    // 查看个人主页详情
    watchDetail1(userinfoId, userid) {
      this.$router.push('/talentDetail/' + userinfoId + '/' + userid);
    },
    // 查看投递
    watchDeliver(id) {
      this.active = 2;
      this.jobid = id;
      findAllDeliver({
        jobid: id,
        filter: this.filter,
        num: '6',
        page: this.currentPage1
      }).then(res => {
        if (res.code === '0') {
          this.isHave = true;
          this.list = res.data;
        } else {
          this.isHave = false;
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        this.isHave = false;
        this.$message.error(err);
        return err;
      });
    },
    // 获取所有角色
    getRole(id) {
      getAllRole({ jobid: id }).then(res => {
        if (res.code === '0') {
          this.roleList = res.data;
        } else {
          this.roleList = [];
        }
      }).catch(err => {
        this.$message.error(err);
        return err;
      });
    },
    // 修改项目
    editJob(item) {
      this.getRole(item.id);
      this.active = 0;
      this.ruleForm1.jobid = item.id;
      this.imageUrl = item.image;
      this.ruleForm.title = item.title;
      this.ruleForm.image = item.image;
      this.ruleForm.launch = item.launch;
      this.ruleForm.job = item.job;
      this.ruleForm.jobneed = item.jobneed;
      this.ruleForm.place = item.place;
      this.ruleForm.worktime = item.worktime;
      this.ruleForm.begintime = item.begintime;
      this.ruleForm.endtime = item.endtime;
      this.ruleForm.description = item.description;
    },
    // 删除项目
    cancel(id) {
      deleteJob({ id: id }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          if (this.list.jobs.length === 1 && this.currentPage !== 1) {
            this.handleCurrentChange(this.currentPage - 1);
          } else {
            this.handleCurrentChange(this.currentPage);
          }
        } else {
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        this.$message.error(err);
        return err;
      });
    },
    // 查看简历
    view(infoid, userinfoId, userid) {
      viewCv({ id: infoid }).then(res => {
        this.watchDetail1(userinfoId, userid);
      }).catch(err => {
        return err;
      });
    },
    // 拒绝录用
    refuse(id) {
      refuseUser({ id: id }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '拒绝成功',
            type: 'success'
          });
          this.watchDeliver(this.jobid);
        } else {
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        return err;
      });
    },
    // 录用
    intention(infoid) {
        offerUser({
          id: infoid
        }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '录用成功',
              type: 'success'
            });
            this.watchDeliver(this.jobid);
          } else {
            this.$message.error(res.errMsg);
          }
        }).catch(err => {
          return err;
        });
    },
    // 意向面试
    intentionUser() {
      this.$refs.popruleForm.validate((valid) => {
        if (valid) {
          this.formFlag = true;
          localStorage.setItem('popItem', JSON.stringify(this.popruleForm));
          console.log(this.popruleForm.time);
          intentionUser({
            id: this.popItem.infoid,
            name: this.popruleForm.name,
            place: this.popruleForm.place,
            time: this.popruleForm.time,
            phone: this.popruleForm.phone
          }).then(res => {
            if (res.code === '0') {
              this.$message({
              message: '意向成功',
              type: 'success'
            });
            this.ispop = false;
            this.watchDeliver(this.jobid);
            } else {
              this.$message.error(res.errMsg);
            }
            this.formFlag = false;
          }).catch(err => {
            this.formFlag = false;
            return err;
          });
        }
      });
    },
    // 条件筛选
    clickItem(item) {
      this.filter = item.code;
      this.currentPage = 1;
      this.watchDeliver(this.jobid);
    },
    // 意向面试弹窗内容重置
    resetPop() {
      // this.popruleForm = {
      //   name: '',
      //   phone: '',
      //   place: '',
      //   time: null
      // };
      this.$refs.popruleForm.resetFields();
    },
    openPop(item) {
      this.ispop = true;
      this.popItem = item;
      const is = JSON.parse(localStorage.getItem('popItem'));
      if (is) {
        this.popruleForm.name = JSON.parse(localStorage.getItem('popItem')).name;
        this.popruleForm.phone = JSON.parse(localStorage.getItem('popItem')).phone;
        this.popruleForm.place = JSON.parse(localStorage.getItem('popItem')).place;
        this.popruleForm.time = JSON.parse(localStorage.getItem('popItem')).time;
      }
    }
  },
  created() {
    getJobType().then(res => {
      if (res.code === '0') {
        this.jobType = res.data;
      }
    }).catch(err => {
      this.$message.error(err);
      return err;
    });
    // 获取公司所有已发布职位
    companyJob({
      page: this.currentPage
      }).then(res => {
        if (res.code === '0') {
          this.isHave = true;
          this.list = res.data;
          console.log(this.list);
          console.log(this.isHave);
        } else {
          this.isHave = false;
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        this.isHave = false;
        this.$message.error(err);
        return err;
      });
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  },
  computed: {
    tj() {
      let res = '';
      this.tiaojian.forEach(item => {
        if (item.code === this.filter) {
          res = item.value;
        }
      });
      return res;
    },
    ...mapState({
      userinfo: (state) => state.userinfo
    })
  }
};
</script>

<style lang="less" scoped>
.info-box {
  position: relative;
  height: 100%;
  .notAllow {
    .btn {
      margin-top: 25px;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
  .info {
    padding: 25px 50px;
    .flex-warp {
      display: flex;
      justify-content: space-between;
    }
    .tabber {
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      div {
        padding: 0 10px;
        height: 30px;
        cursor: pointer;
        line-height: 30px;
        text-align: center;
        margin: 0 5px;
      }
      .active {
        color: #409eff;
        &::after {
          content: "";
          display: block;
          height: 2px;
          background: #409eff;
        }
      }
    }
    .list {
      margin-top: 20px;
      .item {
        display: flex;
        align-items: center;
        .user-img {
          width: 90px;
          height: 90px;
          border-radius: 5px;
        }
        .user-info {
          flex: 1;
          height: 90px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 0 20px;
          overflow: hidden;
          word-wrap: break-word;
          .content {
            span {
              margin-right: 15px;
            }
          }
        }
        .user-name {
          display: flex;
          align-items: center;
          justify-content: space-between;
          span {
            transition: color 0.25s;
            cursor: pointer;
            &:hover {
              color: #409eff;
            }
          }
          .head {
            font-size: 15px;
            font-weight: 600;
            margin-right: 10px;
            cursor: pointer;
            transition: color 0.25s;
            &:hover {
              color: #409eff;
            }
          }
        }
        .user-btn {
          height: 90px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
    .footer-page {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 20px;
    }
  }
  .info1 {
    .list {
      .item {
        display: flex;
        align-items: center;
        .user-img {
          width: 80px;
          height: 80px;
          border-radius: 5px;
        }
        .user-info {
          flex: 1;
          height: 80px;
          margin: 0 20px;
          overflow: hidden;
          word-wrap: break-word;
          .head {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .head1 {
            display: flex;
            align-items: center;
            .user-img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              margin-right: 10px;
            }
            div {
              display: flex;
              align-items: center;
              transition: color 0.25s;
              cursor: pointer;
              &:hover {
                color: #409eff;
              }
            }
          }
        }
        .user-name {
          height: 20px;
          margin-right: 10px;
        }
        .user-btn {
          height: 90px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
  .demo-ruleForm {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 50%;
      .el-input,
      .el-select,
      .el-cascader,
      .el-date-editor,
      .el-textarea {
        width: 100%;
      }
      &:last-child {
        position: relative;
        /deep/.el-form-item__content{
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }
  }
  .demo-ruleForm1 {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 33.333%;
      &:nth-last-child(2) {
        width: 66.667%;
      }
      &:last-child {
        position: relative;
        /deep/.el-form-item__content{
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }
  }
  .demo-ruleForm2 {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .el-form-item {
      margin: 0;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
  .ruleForm2{
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 25%;
      margin-bottom: 0;
      .el-input,
      .el-select,
      .el-cascader,
      .el-date-editor,
      .el-textarea {
        width: 100%;
      }
      &:last-child {
        span{
          word-break: break-all;
        }
      }
      &:nth-last-child(4) {
        text-align: right;
      }
      &:last-child {
        width: 100%;
      }
    }
  }
  .title {
    font-size: 16px;
    padding: 0px 50px;
    background: #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
  }
  .popruleForm{
    .el-form-item {
      width: 100%;
      .el-input{
        width: 100%;
      }
    }
  }
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 342px;
    height: 138px;
    line-height: 138px;
    text-align: center;
  }
  .avatar {
    width: 342px;
    height: 138px;
    display: block;
    cursor: pointer;
  }
}
/deep/ .avatar-uploader,
.avatar-uploader1 {
  height: 140px;
}
/deep/.avatar-uploader1 .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 196px;
    height: 138px;
    line-height: 138px;
    text-align: center;
  }
  .avatar {
    width: 196px;
    height: 138px;
    display: block;
    cursor: pointer;
  }
}
.el-divider {
  margin: 15px 0;
}
// 截图
.cropper-content {
    .cropper {
        width: auto;
        height: 300px;
    }
}
.warn {
  margin-bottom: 15px;
  font-size: 14px;
  color: #606266;
}
</style>
