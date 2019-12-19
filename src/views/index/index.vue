<template>
  <el-container class="index-container">
    <el-header class="my-header">
      <div class="left">
        <i class="el-icon-s-fold icon" @click="isCollapse=!isCollapse"></i>
        <img class="logo" src="../../assets/logindex.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="user-icon" :src="$store.state.userInfo.avatar" alt />
        <span class="user-name">{{$store.state.userInfo.username}},您好</span>
        <el-button type="primary" size="small" @click="exitIndex">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto" class="my-aside">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          router
        >
          <!-- touter 属性可以让index变成path 切换路由地址 -->

          <el-menu-item index="/index/chart">
            <i class="el-icon-menu"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-menu"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-menu"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-menu"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-menu"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <!-- 出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { logout } from '../../api/user'
// import {getToken} from '../../utils/toke'
// import store from '../../store/store'
import {remove} from '../../utils/toke'
export default {
  data() {
    return {
      isCollapse:false,
    }
  },
  methods: {
    exitIndex(){
      this.$confirm('你真的要离开我这个网站吗 o(╥﹏╥)o！', '你真狠', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          logout().then(res=>{
            if (res.data.code==200) {
               remove();
               this.$router.push('/login');
               this.$store.state.userInfo={};
            }
          })
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出'
          });          
        });
    }
  },
  // beforeCreate(){
  //   if (!getToken()) {
  //     this.$message.error('小样想伪造token');
  //     this.$router.push('/login');
  //   }
  // },
  //  created() {
  //    userInfo().then(res=>{
  //      window.console.log(res);
  //     //  if (res.data==200) {
  //     //    this.active = res.data.data.avatar;
  //     //    this.name = res.data.data.username;
  //     //  }
  //    })
  // }
};
</script>

<style lang="less">
.my-header {
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    .icon {
      font-size: 24px;
      margin-right: 22px;
    }
    img {
      margin-right: 11px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .user-icon {
      margin-right: 4px;
      height: 43px;
      width: 43px;
      border-radius: 50%;
    }
    .user-name {
      margin-right: 38px;
    }
  }
}
.el-container {
  height: 100%;
  .my-aside {
    // 左侧导航样式
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .my-main {
    background-color: #e8e9ec;
  }
}
</style>