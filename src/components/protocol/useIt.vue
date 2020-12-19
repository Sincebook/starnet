<template>
  <div>
    <!-- 小导航栏start -->
    <div class="tab_little">
      <ul class="xuanzhe">
        <li class="register" @click="changeHash('zhanghao')">
          <h5 class="change" data-index="0">账号注册</h5>
        </li>
        <li class="search" @click="changeHash('talent')">
          <h5 class="change" data-index="1">人才查找</h5>
        </li>
        <li class="jobmatch" @click="changeHash('job')">
          <h5 class="change" data-index="2">工作匹配</h5>
        </li>
        <li class="questions" @click="changeHash('problem')">
          <h5 class="change" data-index="3">常见问题</h5>
        </li>
      </ul>
    </div>
    <!-- 小导航栏end -->

    <!-- 账号注册内容start -->
    <div class="show" id="zhanghao">
      <h3 class="title">账号注册</h3>

      <div class="regiser_questions">
        <p class="problem">1、如何在绘星注册？</p>
        <p class="content">
          未登录状态下，在绘星网站首页可以看见右上角“注册”的按钮，点击它并填写相关信息就能完成注册。
        </p>
      </div>
      <div class="regiser_questions">
        <p class="problem">2、注册过程中一直没有收到短信验证码怎么办？</p>
        <p class="content">
          （1） 检查手机的安全设置是否屏蔽了陌生的电话号码。 <br />
          （2）
          稍等几分钟，若发送验证码倒计时结束后依旧没收到验证码，请点击重新发送。
          <br />
          （3） 如果一直收不到短信验证码，请发邮件至huixing@126.com。
          邮件标题格式为：短信验证码 + 你的电话 号码（例 &nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 如：短信验证码 +
          18888888888）
        </p>
      </div>

      <h4 class="title_little">登录</h4>
      <div class="regiser_questions">
        <p class="problem">1、登录密码忘记了，如何找回？</p>
        <p class="content">
          请在登录页面点击“忘记密码”，系统会提示你重设密码的下一步操作。
        </p>
      </div>
      <div class="regiser_questions">
        <p class="problem">2、注册手机号忘记了，如何找回账号？</p>
        <p class="content">
          请将能证明你是该账号持有人的相关信息（包括你的当前联系方式、最后一次登录密码、最后一次登录时间、最后一次登录
          IP，以及其他可证明你拥有该账号的资料信息），发邮件至huixing@126.com，邮件的标题格式为：找回账号，我们来帮你解决。
        </p>
      </div>
      <h4 class="title_little">账号设置</h4>
      <div class="regiser_questions">
        <p class="problem">1、什么是昵称？可以修改吗？</p>
        <p class="content">
          昵称是你出现在绘星网络平台的用户名称，可以修改。认证用户修改昵称需要经过审核，审核通过后方可生效。
        </p>
      </div>
      <div class="regiser_questions">
        <p class="problem">2、一直没有收到修改绑定邮箱的确认信怎么办？</p>
        <p class="content">
          （1） 有时激活邮件可能被列为了垃圾邮件 ，请检查一下“垃圾箱”。<br />
          （2）
          稍等几分钟再检查下邮箱。若10分钟后没收到确认信，回到修改页面，点击重新发送。
        </p>
      </div>
      <div class="regiser_questions">
        <p class="problem">3、如何注销绘星账号？</p>
        <p class="content">
          注销账号不可恢复，请谨慎选择。注销申请请提交至邮箱huixing@126.com，并证明你是该账号持有人以及注销原因，证明
          信息包括但不限于身份证件照、机构营业执照、工作名片、绑定手机号及邮箱等。邮件的标题格式为：注销账号。
        </p>
      </div>
      <h4 class="title_little">账号信息找回</h4>
      <div class="regiser_questions">
        <p class="problem">1、我的账户信息丢失了，该怎么找回？</p>
        <p class="content">
          （1）
          若您拥有其他关联的绘星账户，可尝试进入账号设置-账号安全，绑定原有账号的社交账号、邮箱，将原账户的信息
          &nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合并，合并过程可能需要一些时间，请耐心等待。
          <br />
          （2）
          如果上述方法没有作用，请发邮件至huixing@126.com，邮件的标题格式为：账户信息丢失，并在邮件正文中注明
          &nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;你遇到的情况，以及丢失的账户的信息，例如：昵称，作品以及能够证明你拥有该账号的信息，我们会于3-5个工作
          &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日内联系您处理。
        </p>
      </div>
    </div>
    <!-- 账号注册内容end -->

    <!-- 人才查找start -->
    <div class="show" id="talent">
      <h3 class="title">人才查找</h3>

      <div class="regiser_questions">
        <p class="problem">1、如何在绘星查找人才？</p>
        <p class="content">
          请在首页导航栏点击“人才目录”，然后搜寻你需要的人才。
        </p>
      </div>
    </div>
    <!-- 人才查找end -->

    <!-- 工作匹配start -->
    <div class="show" id="job">
      <h3 class="title">工作匹配</h3>

      <div class="regiser_questions">
        <p class="problem">1、如何在绘星找到匹配的工作？</p>
        <p class="content">
          请在首页导航栏点击“工作职位”，然后根据页面提示筛选你心仪的工作。
        </p>
      </div>
      <div class="regiser_questions">
        <p class="problem">2、如何在绘星查找公司？</p>
        <p class="content">
          请在首页导航栏点击“公司目录”，然后根据页面提示搜索公司。
        </p>
      </div>
    </div>
    <!-- 工作匹配end -->

    <!-- 常见问题start -->
    <div class="show" id="problem">
      <h3 class="title">常见问题</h3>
      <div class="regiser_questions">
        <p class="problem">1、成为会员有什么好处？</p>
        <p class="content">
          成为会员可享受更多的服务。具体信息请在首页导航栏点击“VIP会员”查看。
        </p>
      </div>
      <div class="regiser_questions">
        <p class="problem">2、如何成为会员？</p>
        <p class="content">请在首页导航栏点击“VIP会员”，然后选择会员种类。</p>
      </div>
    </div>
    <!-- 常见问题end -->
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'useIt',
  data() {
    return {

    };
  },
  methods: {
    changeHash(id) {
      // console.log(id);
      if (document.querySelector('#' + id)) {
        document.querySelector('#' + id).scrollIntoView(true);
      }
    }
  }
};
</script>
<style lang='less' scoped>
a {
  text-decoration: none;
  color: #333333;
}

.w {
  width: 960px;
  margin: 0 auto;
  background-color: #ffffff;
  /* height: 500px; */
}

li {
  list-style: none;
}

.tab {
  width: 100%;
  height: 50px;
  background-color: #777777;
}

.tab ul {
  width: 860px;
  margin: 0 50px;
}

.tab ul li {
  float: left;
  width: 143.33px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  /* border: 1px solid #000; */
  list-style: none;
}

.tab ul li a {
  font-size: 1.2em;
}

.tab ul li:hover {
  background-color: #ffffff;
  cursor: pointer;
}

/* 导航栏结束 */

/* 小导航栏开始 */

.tab_little {
  display: inline-block;
  width: 800px;
  height: 30px;
  margin: 20px 50px;
}

.tab_little ul {
  width: 800px;
}

.tab_little ul li {
  float: left;
  width: 100px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}

.tab_little ul li h5 {
  display: inline-block;
  width: 55px;
  height: 26px;
  line-height: 30px;
  font-size: 0.8em;
  color: #555555;
}

.title {
  font-size: 1.2em;
  color: #333333;
  margin: 0 50px 40px 50px;
  font-style: normal;
}

.regiser_questions {
  display: inline-block;
  margin: 0 50px;
  margin-bottom: 30px;
}

.regiser_questions .problem {
  font-size: 1em;
  color: #333333;
  font-weight: 700;
  margin-bottom: 8px;
}

.regiser_questions .content {
  font-size: 1em;
  line-height: 25px;
  color: #555555;
}

.title_little {
  font-size: 1em;
  margin: 20px 50px 40px 50px;
}

.show {
  //   display: none;
}
</style>
