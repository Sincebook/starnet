<template>
  <div class="citicism">
    <div class="citicism_header">
      <img :src="item.head" alt="" />
      <span>{{ item.name }}</span>
      <!-- <span class="diamonds">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-diamonds"></use>
        </svg>
      </span> -->
    </div>
    <div class="citicism_container">
      <p class="my-info" ref="myInfo">
        {{ item.word }}
      </p>
      <p class="show-all" @click="showAll">{{ tag }}</p>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'Criticism',
  props: ['item'],
  data() {
    return {
      // headerImg: '//ftp.qnets.cn/img/bg3.jpg',
      // name: '小枝丫',
      // content: '非常不错的公司，愿意给新人锻炼的机会，以后会更加努力提升自己的专业技能，来完成更好的角色。非常不错的公司，愿意给新人锻炼的机会，以后会更加努力提升自己的专业技能，来完成更好的角色。非常不错的公司，愿意给新人锻炼的机会，以后会更加努力提升自己的专业技能，来完成更好的角色。非常不错的公司，愿意给新人锻炼的机会，以后会更加努力提升自己的专业技能，来完成更好的角色。非常不错的公司，愿意给新人锻炼的机会，以后会更加努力提升自己的专业技能，来完成更好的角色。非常不错的公司，愿意给新人锻炼的机会，以后会更加努力提升自己的专业技能，来完成更好的角色。非常不错的公司，愿意给新人锻炼的机会，以后会更加努力提升自己的专业技能，来完成更好的角色。',
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
.citicism {
  width: 960px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  padding-bottom: 35px;
  position: relative;
  .citicism_header {
    font-size: 18px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }
    span {
      margin: 0 0 0 10px;
    }
    .diamonds {
      position: relative;
    }
    // .diamonds::after {
    //   width: 30px;
    //   position: absolute;
    //   top: -0.5px;
    //   left: 18px;
    //   color: var(--bgColor);
    //   padding: 0px 2px 2px 0;
    //   font-size: 13px;
    //   content: "钻粉";
    //   background-image: linear-gradient(to right, rgb(247, 230, 181), #f09732);
    //   background-color: #d6872d;
    //   border-bottom-left-radius: 3px;
    //   border-top-left-radius: 3px;
    //   border-top-right-radius: 10px;
    //   border-bottom-right-radius: 10px;
    // }
    .icon {
      font-size: 20px;
      border: 1px solid var(--bgColor);
      border-bottom-left-radius: 10px;
      border-top-left-radius: 10px;
      background-image: linear-gradient(to right, #fff, rgb(247, 230, 181));
      color: #d87b12;
    }
  }
  .citicism_container {
    padding-left: 50px;
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
      bottom: 5px;
      right: 20px;
      cursor: pointer;
    }
  }
}
</style>
