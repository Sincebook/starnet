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
        <p>头发长度：</p>
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
        <p>长</p>
        <p>直</p>
      </div>
    </div>
    <p class="my-info" ref="myInfo">
      我是一名角色演员，居住在汉普郡的莱明顿，年龄在50 –
      65岁之间。我有15年以上的经验,以前是一名专业演员，在剧院音乐剧剧目夏季和哑剧中工作。拥有企业商业电视和小型演讲和角色扮演配音经验。我在意大利孔蒂舞台学校学习表演艺术课程。对表演充满热情。到目前为止，我已经出演了50部短片、商业广告和音乐。
      我是一名角色演员，居住在汉普郡的莱明顿，年龄在50 –
      65岁之间。我有15年以上的经验,以前是一名专业演员，在剧院音乐剧剧目夏季和哑剧中工作。拥有企业商业电视和小型演讲和角色扮演配音经验。我在意大利孔蒂舞台学校学习表演艺术课程。对表演充满热情。到目前为止，我已经出演了50部短片、商业广告和音乐...
    </p>
    <p class="show-all" @click="showAll">{{ tag }}</p>
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
  width: 1280px;
  margin: 40px auto 0 auto;
  padding: 40px 200px 80px 200px;
  position: relative;
  .grid {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    div {
      margin: 30px;
    }
    p {
      margin-bottom: 20px;
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
    bottom: 56px;
    right: 200px;
    cursor: pointer;
  }
}
</style>
