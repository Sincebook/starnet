<template>
  <div class="comapny-resume">
    <h4 class="headtitle">公司简介</h4>
    <div class="resume">
      <div class="item" v-for="item in list" :key="item.id + item.label">
        <div class="label">{{ item.label }}：</div>
        {{
          info[item.id]
            ? item.id === "createTime"
              ? info[item.id].split(" ")[0]
              : info[item.id]
            : "无"
        }}
      </div>
      <div id="selfEvaluation" class="open" :class="openDesc ? 'info' : ''">
        {{ info.description }}
      </div>
    </div>
    <span class="openDesc" v-if="offheight > 110" @click="openDesc = !openDesc">
      {{ openDesc ? "展开更多" : "收起" }}
    </span>
  </div>
</template>
<script>
export default {
  props: ['info', 'offheight'],
  data() {
    return {
      list: [{
        label: '成立时间', id: 'createTime'
      }, {
        label: '法人代表', id: 'legalPerson'
      }, {
        label: '企业地点', id: 'area'
      }, {
        label: '企业性质', id: 'type'
      }, {
        label: '公司类型', id: 'category'
      }, {
        label: '组织机构码', id: 'organizationCode'
      }, {
        label: '经营范围', id: 'managementRange'
      }, {
        label: '代表作', id: 'opus'
      }],
      openDesc: false // 默认不展开
    };
  }
};
</script>
<style lang='less' scoped>
.comapny-resume {
  background-color: #fff;
  width: 1110px;
  margin: 50px auto;
  padding: 30px 0px;
  position: relative;
  .headtitle {
    text-align: center;
    font-size: 26px;
    color: #333;
  }
  .resume {
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .item {
      display: flex;
      color: #0097d0;
      align-items: center;
      padding: 10px 0 10px 80px;
      width: 475px;
      font-size: 16px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .label {
      color: #909399;
      width: 120px;
      min-width: 120px;
    }
    .open {
      font-size: 16px;
      margin: 30px 80px 15px;
      width: 100%;
      color: #909399;
      overflow: hidden;
      height: auto;
    }
    .info {
      height: 60px;
    }
  }
  .openDesc {
    position: absolute;
    right: 160px;
    cursor: pointer;
    color: #909399;
    transition: color 0.25s;
    &:hover {
      color: #333;
    }
  }
}
</style>
