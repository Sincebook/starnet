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
                <div :class="['txt', { 'over-hidden': !unfold }]" ref="textBox">
                    <span ref="spanBox">{{comInfor.content}}</span>
                </div>
                <div class="btn" v-if="ifOver" @click="unfold = !unfold">{{unfold ? '收起' : '展开'}}
                    <svg class="icon icon-zhankai" aria-hidden="true">
                       <use xlink:href="#icon-zhankai"></use>
                    </svg>
               </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        content: {
                type: String,
                default: ''
            },
        com: {
                type: Array,
                default: () => []

        },
        comInfor: {
                type: Array,
                default: () => []
        }
    },
    computed: {

    },
    data() {
        return {
            ifOver: false, // 文本是否超出三行，默认否
            unfold: false // 文本是否是展开状态 默认为收起
        };
    }
    // mounted() {
    //     this.ifOver = this.$refs.spanBox.offsetHeight > this.$refs.textBox.offsetHeight
    // }
};
</script>
<style lang="less">
.companyIntro{
  margin-top:40px;
  width:1440px;
  height:1000px;
  background-color: pink;
}
.introHeader{
    margin:0 auto;
    width: 1200px;
    height:100px;
    text-align: center ;
    background-color: green;
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
    width: 1200px;
    height:270px;
    background-color: red;
}
.introMiddle .com{
    width:580px;
    height:270px;
    margin:0 auto;
    background-color: yellow;
}
.introMiddle .com p{
    display: inline-block;
    width:290px;
    height:30px;
    margin-top:10px;
}
.introMiddle .com p :first-child{
    margin-right:10px;
    display: inline-block;
    width:100px;
    height:30px;
    color:grey;
}
.introMiddle .com p :last-child{
    display: inline-block;
    width:170px;
    height:30px;
    color:steelblue;
}
.introFooter{
    margin:0 auto;
    width: 1200px;
    height:390px;
    background-color: green;
}
.words{
    font-weight: 400;
    line-height: 60px;
    color: rgba(6, 15, 38, 1);
    word-wrap:break-word;
    word-break:normal;
}
.txt {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
}
.over-hidden {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.btn {
  color: red;
}
</style>
