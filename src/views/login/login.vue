<template>
  <div class="login-box">
    <div class="login-from">
      <div class="login-log">
        <img src="../../assets/log.png" alt />
        <span class="heimian">黑马面面</span>
        <i></i>
        <span class="yonghu">用户登录</span>
      </div>
      <el-form :rules="rules" ref="form" :model="form">
        <!-- 输入手机号 -->
        <el-form-item class="my-input" prop="phone">
          <el-input
            class="inpu"
            placeholder="请输入手机号"
            v-model="form.phone"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 输入密码 -->
        <el-form-item class="my-input" prop="password">
          <el-input
            class="inpu"
            v-model="form.password"
            show-password
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item class="my-input" prop="captcha">
          <el-row>
            <el-col :span="18">
              <el-input
                class="inpu"
                v-model="form.captcha"
                placeholder="请输入验证码"
                prefix-icon="el-icon-key"
              ></el-input>
            </el-col>
            <el-col :span="6" id="yan-img">
              <img :src="captchaURL" @click="changeCaptcha" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 用户协议 -->
        <el-form-item>
          <el-checkbox v-model="form.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button @click="dialogFormVisible = true" class="register-button" type="success">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-img">
      <img src="../../assets/login_banner.png" alt />
    </div>
    <!-- 用户注册 -->
    <el-dialog title="注册信息" :visible.sync="dialogFormVisible">
      <el-form :model="regForm" :rules="zhucerules" ref="zhuce">
        <el-form-item label="图像" :label-width="formLabelWidth" prop="avatar">
          <!-- 头像上传 -->
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 用户昵称 -->
        <el-form-item class="my-input" prop="username" label="昵称" :label-width="formLabelWidth">
          <el-input class="inpu" placeholder="请输入昵称" v-model="regForm.username"></el-input>
        </el-form-item>
        <!-- 用户邮箱 -->
        <el-form-item class="my-input" prop="email" label="邮箱" :label-width="formLabelWidth">
          <el-input class="inpu" placeholder="请输入邮箱" v-model="regForm.email"></el-input>
        </el-form-item>
        <!-- 用户手机号 -->
        <el-form-item class="my-input" prop="phone" label="手机号" :label-width="formLabelWidth">
          <el-input class="inpu" placeholder="请输入手机号" v-model="regForm.phone"></el-input>
        </el-form-item>
        <!-- 用户密码 -->
        <el-form-item class="my-input" prop="password" label="密码" :label-width="formLabelWidth">
          <el-input class="inpu" placeholder="请输入密码" v-model="regForm.password"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item class="my-input" prop="code" label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input class="inpu" v-model="regForm.code" placeholder="请输入图形码"></el-input>
            </el-col>
            <el-col :span="7" :offset="1" id="yan-img">
              <img :src="sendsms" @click="changesendsms" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="regForm.rcode" placeholder="请输入短信验证" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button
                :disabled="time!=0"
                @click="getMessageCode"
              >{{time == 0 ? "获取用户验证码" : `还有(${time}s)继续获取`}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRegForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import axios from "axios";
import { login, sendsms, register } from "../../api/login";
import { setToken } from "../../utils/toke.js";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        // 判断手机号的格式
        // 正则
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        // 判断是否符合
        // .test(验证的字符串) 返回的是 true 或者false
        if (reg.test(value) == true) {
          callback();
        } else {
          // 不满足 手机号的格式
          callback(new Error("老铁，你的手机号写错了噢"));
        }
      }
    };
    var checkeml = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else {
        // 判断手机号的格式
        // 正则
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // 判断是否符合
        // .test(验证的字符串) 返回的是 true 或者false
        if (reg.test(value) == true) {
          callback();
        } else {
          // 不满足 手机号的格式
          callback(new Error("老铁，你的邮箱写错了噢"));
        }
      }
    };
    return {
      //登录的数据
      form: {
        phone: "",
        password: "",
        captcha: "",
        checked: false
      },
      //登录的数据判断
      rules: {
        // 手机号
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        // 密码
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "change"
          },
          {
            min: 6,
            max: 18,
            message: "密码长度为 6 到 18",
            trigger: "change"
          }
        ],
        // 验证码
        captcha: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "change"
          },
          {
            min: 4,
            max: 4,
            message: "验证码长度为4",
            trigger: "change"
          }
        ]
      },
      //注册是数据
      regForm: {
        phone: "",
        // 图片验证码
        code: "",
        // 头像
        avatar: "",
        // 邮箱
        email: "",
        // 密码
        password: "",
        // 短信验证
        rcode: "",
        //用户姓名
        username: ""
      },
      //注册的数据输入框判断
      zhucerules: {
        // 手机号
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        //邮箱
        email: [{ required: true, validator: checkeml, trigger: "blur" }],
        // 密码
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "change"
          },
          {
            min: 6,
            max: 18,
            message: "密码长度为 6 到 18",
            trigger: "change"
          }
        ],
        // 短信验证码
        rcode: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          },
          {
            min: 4,
            max: 4,
            message: "验证码长度为4",
            trigger: "blur"
          }
        ],
        //昵称
        name: [
          {
            required: true,
            message: "昵称不能为空",
            trigger: "blur"
          },
          {
            min: 4,
            message: "昵称长度为4-8",
            trigger: "blur"
          }
        ]
      },
      //登录的图像验证码
      captchaURL: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      //注册的图像验证码
      sendsms: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      //关闭注册框
      dialogFormVisible: false,
      //注册输入框的比例
      formLabelWidth: "70px",
      //头像的地址
      imageUrl: "",
      //倒计时
      time: 0,
      // 图片上传地址
      uploadUrl: process.env.VUE_APP_BASEURL + "/uploads"
    };
  },
  methods: {
    //登录验证
    submitForm() {
      // 是否勾选
      if (this.form.checked === false) {
        // 没勾，提示
        this.$message.warning("老铁，没勾哦，先勾一下呗！");
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            login({
              phone: this.form.phone,
              password: this.form.password,
              code: this.form.captcha
            }).then(res => {
              window.console.log(res);
              // 错误提示
              if (res.data.code === 202) {
                this.$message.error(res.data.message);
              } else if (res.data.code === 200) {
                this.$message.success("你可算回来啦！");
                // 这种不建议用 key可能会写错
                // localStorage.setItem("token", res.data.data.token);
                setToken(res.data.data.token);
                this.$router.push("/index/subject");
              }
            });
          } else {
            this.$message.error("很遗憾，内容没有写对！");
            return false;
          }
        });
      }
    },
    //登录图像验证
    changeCaptcha() {
      this.captchaURL =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Date.now(); // 时间戳
    },
    //注册图像验证
    changesendsms() {
      this.sendsms =
        process.env.VUE_APP_BASEURL + "/captcha?type=sendsms&" + Date.now(); // 时间戳
    },
    //添加图像
    handleAvatarSuccess(res, file) {
      //生成的本地临时地址
      this.imageUrl = URL.createObjectURL(file.raw);
      //保存图像地址
      this.regForm.avatar = res.data.file_path;
    },
    //上传图像大小和类型
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //短信验证
    getMessageCode() {
      if (this.time == 0) {
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!reg.test(this.regForm.phone)) {
          return this.$message.error("老弟，你的手机号不太对哦，检查一下呗！");
        }
        if (this.regForm.code.length != 4 || this.regForm.code == "") {
          return this.$message.error("老弟，你的验证码不太对哦，检查一下呗！");
        }
        this.time = 60;
        let timeID = setInterval(() => {
          this.time--;
          if (this.time == 0) {
            clearInterval(timeID);
          }
        }, 1000);
        // axios({
        //   url: process.env.VUE_APP_BASEURL + "/sendsms",
        //   method: "post",
        //   data: {
        //     phone: this.regForm.phone,
        //     code: this.regForm.code
        //   },
        //   //跨域携带cookie
        //   withCredentials: true
        // })
        sendsms({
          phone: this.regForm.phone,
          code: this.regForm.code
        }).then(res => {
          window.console.log(res);
          if (res.data.code === 200) {
            this.$message.success("短信验证码是:" + res.data.data.captcha);
          }
        });
      }
    },
    //注册验证
    submitRegForm() {
      this.$refs.zhuce.validate(valid => {
        if (valid) {
          // axios({
          //   url: process.env.VUE_APP_BASEURL + "/register",
          //   method: "post",
          //   data: {
          //     username: this.regForm.username,
          //     phone: this.regForm.phone,
          //     email: this.regForm.email,
          //     avatar: this.regForm.avatar,
          //     password: this.regForm.password,
          //     rcode: this.regForm.rcode
          //   }
          // })
          register({
            username: this.regForm.username,
            phone: this.regForm.phone,
            email: this.regForm.email,
            avatar: this.regForm.avatar,
            password: this.regForm.password,
            rcode: this.regForm.rcode
          }).then(res => {
            window.console.log(res);
            if (res.data.code === 200) {
              this.$message.success("注册成功");
              this.dialogFormVisible = false;
            } else {
              this.$message.error("注册失败，请重新注册");
            }
          });
        } else {
          // 验证失败
          this.$message.error("很遗憾，内容没有写对！");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.login-box {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );

  .login-from {
    width: 478px;
    height: 550px;
    background-color: #ffffff;
    padding: 44px;
    box-sizing: border-box;
    .login-log {
      display: flex;
      align-items: center;
      font-size: 24px;
      img {
        margin-right: 14px;
      }
      i {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
        margin: 0 14px;
      }
      .heimian {
        font-size: 24px;
      }
      .yonghu {
        font-size: 22px;
      }
    }
    .my-input .inpu {
      margin-top: 25px;
    }
    #yan-img {
      display: flex;
      img {
        width: 100%;
        margin-top: 23px;
        height: 44px;
      }
    }
    .el-button {
      width: 100%;
      margin: 0;
      margin-bottom: 24px;
    }
    .el-checkbox {
      display: flex;
      align-items: center;
      .el-checkbox__label {
        display: flex;
        align-items: center;
      }
    }
  }
  .login-img img {
    width: 100%;
    // margin-left: 694px;
  }
  .el-dialog {
    width: 603px;
    .el-dialog__header {
      text-align: center;
      background: linear-gradient(to right, #01c4fa, #1294fa);
      padding-bottom: 20px;
      .el-dialog__title {
        color: white;
      }
    }
    .el-form-item__content {
      margin-bottom: 20px;
    }
    .el-row {
      display: flex;
      #yan-img {
        img {
          height: 39px;
          width: 100%;
        }
      }
    }
    .el-dialog__footer {
      text-align: center;
    }
  }
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
