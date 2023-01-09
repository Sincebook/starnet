<template>
  <div class="talent-resume">
    <h4 class="headtitle">个人简历</h4>
    <div class="resume">
      <div class="item" v-for="item in list" :key="item.id + item.label">
        <div class="label">{{ item.label }}：</div>
        {{
          info[item.id]
            ? item.id === "birthTime"
              ? info[item.id].split(" ")[0]
              : info[item.id]
            : "无"
        }}
      </div>
      <div id="selfEvaluation" class="open" :class="openDesc ? 'info' : ''">
        {{ info.selfEvaluation }}
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
        label: '国籍', id: 'contry'
      }, {
        label: '身高(cm)', id: 'height'
      }, {
        label: '性别', id: 'sex'
      }, {
        label: '体重(kg)', id: 'weight'
      }, {
        label: '民族', id: 'nation'
      }, {
        label: '居住地', id: 'birthArea'
      }, {
        label: '出生日期', id: 'birthTime'
      }, {
        label: '职业', id: 'vocation'
      }, {
        label: '眼睛颜色', id: 'eyeColour'
      }, {
        label: '皮肤颜色', id: 'skinColour'
      }, {
        label: '头发颜色', id: 'hairColour'
      }, {
        label: '经济公司', id: 'company'
      }, {
        label: '头发类型', id: 'hairType'
      }, {
        label: '代表作', id: 'representativeWork'
      }],
      openDesc: false // 默认不展开
    };
  }
};
</script>
<style lang='less' scoped>
.talent-resume {
  background-color: #fff;
  width: 1110px;
  margin: 50px auto;
  padding: 30px 30px;
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
      width: 50%;
      font-size: 16px;
    }
    .label {
      color: #909399;
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
