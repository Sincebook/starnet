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
                {{isExpend? comInfor.content : capitalize(comInfor.content)}}
                <span @click="expendClick" class="expend">
                    {{isExpend? '收起': '展开'}}
                <i :class="isExpend ? 'up-arrow-isactive': ''" class="down-arrow"  ></i>
                </span>
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
            isExpend: false
        };
    },
    methods: {
        expendClick() {
            this.isExpand = !this.isExpand;
        },
        capitalize: function(value) {
            if (!value) return '';
            value = value.toString();
            if (value.length > 100) {
                return value.substr(0, 100);
            } else {
                return value;
            }
        }
    }
};
</script>

<style lang="less" >
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
    font-weight: 400 ;
    line-height: 60px ;
    color: rgba(6, 15, 38, 1);
    word-wrap:break-word;
    word-break:normal;
}
.up-arrow-isactive{
    display: inline-block; width: 0px; height: 0px; border: 10px solid transparent; overflow: hidden;
    border-top: none; border-bottom-color: red;
}
.down-arrow{
    display: inline-block; width: 0px; height: 0px; border: 10px solid transparent; overflow: hidden;
    border-bottom: none; border-top-color: orange;;
}
</style>
