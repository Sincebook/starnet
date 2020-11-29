<template>
  <div class="talent-resume">
    <p style="text-align: center; font-weight: 600; font-size: 18px">
      个人简历
    </p>
    <div class="grid">
      <div>
        <p>国<span style="padding-left: 28px"></span>籍：</p>
        <p>性<span style="padding-left: 28px"></span>别：</p>
        <p>民<span style="padding-left: 28px"></span>族：</p>
        <p>居住城市：</p>
        <p>出生日期：</p>
        <p>职<span style="padding-left: 28px"></span>业：</p>
        <p>经纪公司：</p>
        <p>
          代<span style="padding-left: 14px"></span>表<span
            style="padding-left: 14px"
          ></span
          >作：
        </p>
      </div>
      <div style="color: rgb(45, 100, 150)">
        <p>中国</p>
        <p>女</p>
        <p>汉族</p>
        <p>江西省南昌市</p>
        <p>1978年7月12日</p>
        <p>演员、歌手</p>
        <p>骏起菲阳文化传媒有限公司</p>
        <p>《天龙八部》</p>
      </div>
      <div>
        <p>身<span style="margin-left: 28px"></span>高：</p>
        <p>体<span style="margin-left: 28px"></span>重：</p>
        <p>胸<span style="margin-left: 28px"></span>围：</p>
        <p>腰<span style="margin-left: 28px"></span>围：</p>
        <p>眼睛颜色：</p>
        <p>肤<span style="margin-left: 28px"></span>色：</p>
        <p>发<span style="margin-left: 28px"></span>色：</p>
        <!-- <p>头发长度：</p> -->
        <p>头发类型：</p>
      </div>
      <div style="color: rgb(45, 100, 150)">
        <p>168cm<span style="opacity: 0">哈</span></p>
        <p>59.3kg<span style="opacity: 0">哈</span></p>
        <p>77<span style="opacity: 0">哈</span></p>
        <p>64<span style="opacity: 0">哈</span></p>
        <p>棕色</p>
        <p>白色</p>
        <p>黑色</p>
        <!-- <p>
          长</p> -->
        <p>直</p>
      </div>
      <div class="header">
        <img
          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=624234275,205532134&fm=26&gp=0.jpg"
          alt=""
        />
        <div class="info">
          <p>
            <!-- <span
              style="
                color: #868c8c;
                font-size: 14px;
                margin-right: 10px;
                padding-bottom: 3px;
              "
              >分享</span
            > -->
            <span>
              <svg class="icon icon-qq2" aria-hidden="true">
                <use xlink:href="#icon-weixin1"></use>
              </svg>
            </span>
            <span>
              <svg class="icon icon-qq2" aria-hidden="true">
                <use xlink:href="#icon-qq2"></use>
              </svg>
            </span>
            <span>
              <svg class="icon icon-qq2" aria-hidden="true">
                <use xlink:href="#icon-weibo"></use>
              </svg>
            </span>
          </p>
          <p>
            刘涛 <span style="font-size: 14px; color: #868c8c">涛涛、涛姐</span>
          </p>
          <p>
            <span>私&nbsp;&nbsp;信</span>
            <span>关&nbsp;&nbsp;注</span>
            <span>粉丝&nbsp;&nbsp;{{ 4236 }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="introduce">
      <p class="my-info" ref="myInfo" style="margin: 20px">
        我是一名角色演员，居住在汉普郡的莱明顿，年龄在50 –
        65岁之间。我有15年以上的经验,以前是一名专业演员，在剧院音乐剧剧目夏季和哑剧中工作。拥有企业商业电视和小型演讲和角色扮演配音经验。我在意大利孔蒂舞台学校学习表演艺术课程。对表演充满热情。到目前为止，我已经出演了50部短片、商业广告和音乐。
        我是一名角色演员，居住在汉普郡的莱明顿，年龄在50 –
        65岁之间。我有15年以上的经验,以前是一名专业演员，在剧院音乐剧剧目夏季和哑剧中工作。拥有企业商业电视和小型演讲和角色扮演配音经验。我在意大利孔蒂舞台学校学习表演艺术课程。对表演充满热情。到目前为止，我已经出演了50部短片、商业广告和音乐...
      </p>
      <p class="show-all" @click="showAll">{{ tag }}</p>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'talentResume',
  data() {
    return {
      tag: '展开'
    };
  },
  components: {

  },
  methods: {
    showAll() {
      this.tag = this.tag === '展开' ? '收起' : '展开';
      this.$refs.myInfo.className = this.$refs.myInfo.className === 'my-info' ? '' : 'my-info';
    }
  }
};
</script>
<style lang='less' scoped>
.talent-resume {
  background-color: #fff;
  width: 960px;
  margin: 40px auto 0 auto;
  padding: 40px 20px 80px 20px;
  position: relative;
  .grid {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    div {
      margin: 30px;
    }
    p {
      margin-bottom: 8px;
    }
    .header {
      width: 250px;
      margin: 0;
      margin-top: 30px;
      img {
        width: 240px;
        height: 240px;
      }
      .info {
        // background-color: rgba(200, 200, 200, 0.7);
        // margin: 40px auto 40px auto;
        // padding-left: 50px;
        // vertical-align: top;
        position: relative;
        display: inline-block;
        margin: 0;
        p:first-child {
          position: absolute;
          right: 0;
          top: 25px;
          .icon {
            cursor: pointer;
            font-size: 18px;
            margin-right: 5px;
          }
        }
        p:nth-child(2) {
          display: inline-block;
          font-size: 18px;
          color: #2d6496;
          margin: 20px 0;
          border-bottom: 1px solid rgba(134, 140, 140, 0.5);
        }
        p:nth-child(3) {
          span {
            display: inline-block;
            width: 75px;
            height: 30px;
            border: 1px solid rgb(180, 115, 115);
            margin-right: 5px;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
          }
          span:first-child {
            border: 1px solid rgba(3, 158, 3, 0.705);
          }
          span:hover {
            color: #fff;
            background-color: rgb(180, 115, 115);
          }
          span:first-child:hover {
            color: #fff;
            background-color: rgba(20, 136, 20, 0.623);
          }
        }
      }
    }
  }
  .my-info {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .show-all {
    position: absolute;
    bottom: -2px;
    right: 20px;
    cursor: pointer;
  }
  .introduce{
    position: absolute;
    overflow: hidden;
    width: 580px;
    top: 300px;
    left: 55px;
  }
}
</style>
