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
        <el-form-item class="my-input" prop="phone">
          <el-input
            class="inpu"
            placeholder="请输入手机号"
            v-model="form.phone"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>

        <el-form-item class="my-input" prop="password">
          <el-input
            class="inpu"
            v-model="form.password"
            show-password
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

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

        <el-form-item>
          <el-checkbox name="type" v-model="form.type">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button type="primary" @click="dialogFormVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-img">
      <img src="../../assets/login_banner.png" alt />
    </div>
    <!-- 用户注册 -->
    <el-dialog title="注册信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <!-- 头像上传 -->
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 用户昵称 -->
        <el-form-item class="my-input" prop="phone" label="昵称" :label-width="formLabelWidth">
          <el-input
            class="inpu"
            placeholder="请输入昵称"
            v-model="form.phone"
            
          ></el-input>
        </el-form-item>
        <!-- 用户邮箱 -->
        <el-form-item class="my-input" prop="phone" label="邮箱" :label-width="formLabelWidth">
          <el-input
            class="inpu"
            placeholder="请输入邮箱"
            v-model="form.phone"
          ></el-input>
        </el-form-item>
        <!-- 用户手机号 -->
        <el-form-item class="my-input" prop="phone" label="手机号" :label-width="formLabelWidth">
          <el-input
            class="inpu"
            placeholder="请输入手机号"
            v-model="form.phone"
           
          ></el-input>
        </el-form-item>
        <!-- 用户密码 -->
        <el-form-item class="my-input" prop="phone" label="密码" :label-width="formLabelWidth">
          <el-input
            class="inpu"
            placeholder="请输入密码"
            v-model="form.phone"
           
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item class="my-input" prop="captcha" label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input
                class="inpu"
                v-model="form.captcha"
                placeholder="请输入图形码"
                
              ></el-input>
            </el-col>
            <el-col :span="7" :offset="1" id="yan-img">
              <img :src="captchaURL" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button>获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
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
    return {
      form: {
        phone: "",
        password: "",
        captcha: ""
      },
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
      captchaURL: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      dialogFormVisible: false,
      formLabelWidth: "60px",
      imageUrl: ""
    };
  },
  methods: {
    submitForm() {
      // 是否勾选
      if (this.form.checked === false) {
        // 没勾，提示
        this.$message.warning("老铁，没勾哦，先勾一下呗！");
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            // 验证成功
            
            // 调用接口
            axios({
              url: process.env.VUE_APP_BASEURL + "/login",
              method: "post",
              // 设置跨域请求可以携带cookie
              withCredentials: true,
              data: {
                phone: this.form.phone,
                password: this.form.password,
                code: this.form.captcha
              }
            }).then(res => {
              window.console.log(res);
            });
          } else {
            // 验证失败
            this.$message.error("很遗憾，内容没有写对！");

            return false;
          }
        });
      }
    },
    changeCaptcha() {
      this.captchaURL =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Date.now(); // 时间戳
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
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
    .el-form-item__content{
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
    .el-dialog__footer{
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
