<template>
  <div class="talent">
    <sub-bar :nameArr="nameArr" :companyType="talentType" @typeSearch='searchType'></sub-bar>
    <select-type
      :type="'talent'"
      @nameSearch="nameSearch"
      @lasted="lasted"
      @hot="hot"
      @newType="newType"
    ></select-type>
    <div class="talent-list">
      <div v-if="!cards.length" style="margin: 50px auto">暂无数据...</div>
      <actor-card
        data-aos="fade-up"
        v-for="(item, index) in cards"
        :key="'talent' + item.id + index"
        :item="item"
      ></actor-card>
    </div>
    <pagination :allPages="allpages" @getProjects="changePage"></pagination>
  </div>
</template>

<script>
import subBar from '../components/common/subBar';
import SelectType from '../components/common/selectType';
import actorCard from '../components/common/actorCard';
import pagination from '../components/common/pagination';
import { findByTalentNew, findByName, findHotTalent, findByThree, findByVocation } from '@/ajax';
export default {
  data() {
    return {
      cards: [
        {
          id: 1,
          image: '//ftp.qnets.cn/since/white.png',
          name: '--/--',
          vocation: '--/--',
          workArea: '--/--'
        },
        {
          id: 2,
          image: '//ftp.qnets.cn/since/white.png',
          name: '--/--',
          vocation: '--/--',
          workArea: '--/--'
        },
        {
          id: 3,
          image: '//ftp.qnets.cn/since/white.png',
          name: '--/--',
          vocation: '--/--',
          workArea: '--/--'
        },
        {
          id: 4,
          image: '//ftp.qnets.cn/since/white.png',
          name: '--/--',
          vocation: '--/--',
          workArea: '--/--'
        },
        {
          id: 5,
          image: '//ftp.qnets.cn/since/white.png',
          name: '--/--',
          vocation: '--/--',
          workArea: '--/--'
        },
        {
          id: 6,
          image: '//ftp.qnets.cn/since/white.png',
          name: '--/--',
          vocation: '--/--',
          workArea: '--/--'
        }],
      allpages: 1,
      select: 'uptime',
      params: '',
      name: '', // 为单类型选择后存储的类型名
      nameArr: ['人才分类', 'Talent', 'classification'],
      talentType: ['演员', '主播', '模特', '童星', '曲艺', '舞蹈', '配音', '导演', '编剧', '剪辑师', '摄影师', '化妆师', '航拍师', '调色师', '合成师', '导演助理', '摄影助理', '摄影指导', '创意策划', '美术', '美术指导', '特效师', '分镜师', '制片助理', '录音师', '配乐师', '跟焦师', '2D动画师', '3D动画师', '服装', '道具', '替身', '造型师', '混音师', '武术指导', '其他']
    };
  },
  created() {
    this.changePage(1);
  },
  methods: {
    changePage(page) {
      if (this.select === 'uptime') {
        findByTalentNew({ page }).then(res => {
          // console.log(res);
          this.cards = res.data.datas;
          this.allpages = res.data.allpage;
        });
      }
      if (this.select === 'type') {
        this.newType(this.params, page);
      }
      // 分页为单个类型选择
      if (this.select === 'searchType') {
        this.searchType(this.name, page);
      }
    },
    newType(obj, page) {
      this.select = 'type';
      // console.log(obj);
      this.params = { workArea: obj.workArea, vocation: obj.vocation, sex: obj.sex.slice(0, 1), page: 1 };
      if (page) {
        this.params.page = page;
      }
      findByThree(this.params).then(res => {
        // console.log(res);
        this.cards = res.data.datas;
        this.allpages = res.data.allpage;
      });
    },
    // 根据单个类别搜索项目
    searchType(name) {
      findByVocation({ vocation: name, page: 1 }).then(res => {
        // console.log(res);
        if (res.code === '0') {
          this.name = name;
          this.select = 'searchType';
          this.cards = res.data.datas;
          this.allpages = res.data.allpage;
        } else {
          this.$message({
            message: res.errMsg,
            type: 'error'
          });
        }
      });
    },
    nameSearch(name) {
      // console.log(name);
      if (!name) { // 输入名字为空时，搜索最新的人才
        this.select = 'uptime';
        this.changePage(1);
        return;
      }
      // console.log(111);
      findByName({ name }).then(res => {
        console.log(res);
        this.cards = res.data.datas;
        this.allpages = res.data.allpage;
      });
    },
    lasted() {
      this.select = 'uptime';
      this.changePage(1);
    },
    hot() {
      findHotTalent().then(res => {
        // console.log(res);
        this.cards = res.data;
        // this.allpages = res.data.allpage;
      });
    }
  },
  components: {
    subBar,
    SelectType,
    actorCard,
    pagination
  }
};
</script>

<style lang="less" scoped>
.talent-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 1180px;
  margin: 10px auto;
  /deep/ .actor-card {
    width: 240px;
    height: 360px;
    margin: 20px 10px;
    .actor-head {
      height: 230px;
    }
    .info {
      padding-top: 230px;
    }
    .desc {
      margin: 10px 0 10px 0;
    }
    .btn-box {
      .btn {
        height: 33px;
      }
    }
  }
}
</style>
