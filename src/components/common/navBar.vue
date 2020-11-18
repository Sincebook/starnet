<template>
  <div class="nav">
    <div class="left">
      <span><img src="../../assets/images/huixingIcon.png" alt="绘星" class="nav-icon"></span>
      <router-link to="/home"><span>首页</span></router-link>
      <router-link to="/talent"><span>人才目录</span></router-link>
      <router-link to="/company"><span>公司目录</span></router-link>
      <router-link to="/job"><span>工作职位</span></router-link>
      <router-link to="/"><span>学院</span></router-link>
      <router-link to="/"><span>活动</span></router-link>
      <router-link to="/vip"><span>VIP会员</span></router-link>
      <router-link to="/"><span>更多</span></router-link>
    </div>
    <div class="right">
        <span  class="search bar1"> <form><input type="search" name="search" placeholder="请输入您要搜索的内容"></form></span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-search"></use>
      </svg>
      <router-link to="/sign"><span class="login">登录</span></router-link>
      <router-link to="/sign"><span class="register">注册</span></router-link>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'NavBar',
  data () {
    return {};
  },
  components: {}
};
</script>
<style lang='less'>
a {
  color:#dcc;
  text-decoration: none;
}
.router-link-active {
    text-decoration: none;
}
.nav{
    min-height: 64px;
    display: flex;
    font-size: 16px;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: rgb(51,51,51);
    color:#dcc;
    align-items: center;
    justify-content: space-between;
    span:hover{
        color: #fff;
        cursor: pointer;
    }
    span:active{
        // background-color: #eee;
    }
    .left{
      flex: 3 0 auto;
        justify-self: start;
        span{
            padding: 0 25px;
        }
    }
    .right{
      flex: 2 0 auto;
      min-width: 550px;
      justify-self: flex-end;
      display: flex;
      align-items: center;
      justify-content: space-around;
        .icon{
          line-height: 64px;
          font-size: 30px;
          // margin-left: -10px;
        }
        .icon:hover{
          color: #fff;
          cursor: pointer;
        }
        span{
            padding:0 20px;
        }
        .search{
          padding-right: 0;
          display: inline-block;
        }
        // .bar1 {background: #A3D0C3;}
        .bar1 input {
            height: 30px;
            border: 2px solid rgb(51,51,51);
            border-radius: 30px;
            background: #F9F0DA;
            color: #9E9C9C;
        }
         form {
            position: relative;
            width: 200px;
            margin: 0 auto;
        }
        input {
          border: none;
            outline: none;
            width: 100%;
            height: 42px;
            padding-left: 13px;
        }
        .login{
          margin-left: 5vw;
        }
        .register{
          margin-right: 2vw;
        }
    }

}
.nav-icon{
    height:31px;
}
</style>
