<template>
    <div class="com-perform">
        <p class="achieve">公司业绩</p>
        <div class="coorperation">
            <p >战略合作</p>
            <div>
                2018年7月，华谊兄弟与阿里巴巴影业集团旗下阿里鱼达成战略合作。此次华谊和阿里鱼的合作，是以华谊兄弟品牌管理公司入驻阿里鱼平台开店为切入点，共同探索针对优质原创华语电影|P的衍生开发，推动正版授权业务在国内的健康发展。
           </div>
        </div>
        <div class="glory">
            <p>荣誉记录</p>
            <div class="glory-record more" ref="gloryRecord">
                2017年5月11日，在中宣部召开的深化文化体制改革座谈会上，光明日报社和经济日报社联合发布了第九届“文化企业30强”名单，华谊兄弟传媒集团获奖。<br />
                2017年9月9日,2017亚洲品牌500强榜单发布，华谊兄弟传媒集团排名第280位。<br />
                2018年4月8日，华谊兄弟获得第23届华鼎奖中国最佳制作机构奖。<br />
                2020年5月，“2020中国品牌500强”排行榜发布，华谊兄弟排名第494位。<br />
                2020年8月14日，胡润研究院发布《2020胡润中国10强民营影视企业》，华谊兄弟位列第6位。<br />
            </div>
             <p @click="showAll" class="show-all">{{tag}}</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tag: '展开'
        };
    },
    methods: {
        showAll() {
            this.tag = this.tag === '展开' ? '收起' : '展开';
            this.$refs.gloryRecord.className = this.$refs.gloryRecord.className.includes('more') ? 'glory-record' : 'glory-record more';
        }
    }
};
</script>

<style lang="less" scoped>
.com-perform{
    width: 960px;
    margin: 60px auto;
    background-color:white ;

}
.achieve{
    font-weight: bold;
    font-size: 18px;
    padding:40px 0;
    text-align:center;

}
.coorperation :first-child{
    background-color: #C8C8C8;
    padding-left: 30px;
    font-size: 16px;
    height:30px;
    padding-top: 5px;
    font-weight: bold;
    color: #2D6496;
}
.glory :first-child{
    background-color: #C8C8C8;
    padding-left: 30px;
    font-size: 16px;
    height:30px;
    padding-top: 5px;
    font-weight: bold;
    color: #2D6496;
}
.coorperation :last-child{
    margin: 20px 0;
    padding:0 30px;
    line-height: 40px;
    height:60px;
    font-size: 16px;

}
.glory{
    position: relative;
    overflow: hidden;
    margin:0 auto;
}
.glory-record{
    margin: 20px 0;
    padding:0 30px;
    line-height: 40px;
    font-size: 16px;
}
.more {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .show-all {
    cursor: pointer;
    bottom: 0px;
    right: 70px;
  }
</style>
