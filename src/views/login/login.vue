<template>
  <div class="login-box">
      <div class="login-from">

      </div>
      <div class="login-img">
          <img src="../../assets/login_banner.png" alt="">
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.login-box {
    display: flex;
     height: 100%;
    align-items: center;
    justify-content: space-around;
    background:linear-gradient(225deg,rgba(20,147,250,1),rgba(1,198,250,1));
   
    .login-from{
        width: 478px;
        height: 550px;
        background-color: #E0E0E0;
         padding: 44px;
        box-sizing: border-box;   
    }
    .login-img img{
        width: 100%;
        // margin-left: 694px;
    }
}
</style>