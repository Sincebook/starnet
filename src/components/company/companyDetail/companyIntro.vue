<template>
    <div class="companyIntro">
        <div class="introHeader">
            <span class="introction">公 司 简 介</span>
        </div>
        <div class="introMiddle">
            <div class="com">
                <p>
                <span>成立时间:</span>
                <span>{{com.time}}</span>
                </p>
                <p>
                <span>法定代表:</span>
                <span>{{com.person}}</span>
                </p>
                <p>
                <span>注册资本:</span>
                <span>{{com.money}}</span>
                </p>
                <p>
                <span>所在城市:</span>
                <span>{{com.city}}</span>
                </p>
                <p>
                <span>企业类型:</span>
                <span>{{com.form}}</span>
                </p><p>
                <span>董事长:</span>
                <span>{{com.chairman}}</span>
                </p>
                <p>
                <span>公司性质:</span>
                <span>{{com.property}}</span>
                </p>
                <p>
                <span>董事:</span>
                <span>{{com.director}}</span>
                </p><p>
                <span>公司口号:</span>
                <span>{{com.slogan}}</span>
                </p>
                <p>
                <span>组织机构代码:</span>
                <span>{{com.code}}</span>
                </p>
                <p>
                <span>公司类别:</span>
                <span>{{com.type}}</span>
                </p>
                <p>
                <span>经营范围:</span>
                <span>{{com.range}}</span>
                </p>
                <p>
                <span>合作电视台:</span>
                <span>{{com.tv}}</span>
                </p>
                <p>
                <span>股票代码:</span>
                <span>{{com.stock}}</span>
                </p>
            </div>
        </div>
        <div class="introFooter">
                   <p class="container my-info" ref="myInfo">
                    {{comInfor.content}}
                    </p>
                    <p @click="tagChange" class="show-all">{{ tag }}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        content: {
                type: Object,
                default () {
                     return {};
                 }
            },
        com: {
                type: Object,
                default () {
                    return {};
                 }
        },
        comInfor: {
                type: Object,
                default () {
                    return {};
                 }
        }
    },
    computed: {

    },
    data() {
        return {
             tag: '展开'
        };
    },
    methods: {
        tagChange() {
        this.tag = this.tag === '展开' ? '收起' : '展开';
        this.$refs.myInfo.className = this.$refs.myInfo.className.includes('my-info') ? 'container' : 'container my-info';
      }
    }
};
</script>

<style lang="less" scoped>
.companyIntro{
  padding-bottom:25px;
  width:960px;
  margin:0 auto;
  background-color: white;
  margin-bottom: 60px;
}
.introHeader{
    margin:0 auto;
    width: 960px;
    height:100px;
    text-align: center ;
}
.introction{
    display: inline-block;
    margin-top:40px;
    color: black;
    font-size:20px;
    font-weight: 800;
}
.introMiddle{
    margin:0 auto;
    width: 960px;
    height:270px;
}
.introMiddle .com{
    width:700px;
    height:270px;
    margin:0 auto;
}
.introMiddle .com p{
    display: inline-block;
    width:350px;
    height:30px;
    margin-top:10px;
    padding-left: 50px;
}
.introMiddle .com p :first-child{
    margin-right:10px;
    display: inline-block;
    width:120px;
    height:30px;
    color:grey;
}
.introMiddle .com p :last-child{
    display: inline-block;
    width:170px;
    height:30px;
    color:#2D6496;
}
.introFooter{
    margin:0 auto;
    width: 960px;
    position: relative;
}
.container {
    padding-top:30px;
    margin:0 auto;
    width: 760px;
    color: #868c8c;
    line-height: 40px;
  }
  .my-info {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
    .show-all {
    position: absolute;
    bottom: -15px;
    right: 70px;
    cursor: pointer;
  }
</style>
