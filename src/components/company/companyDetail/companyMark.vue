<template>
    <div class="com-mark">
         <p class="leave">留言</p>
         <div class="leavemessages">
            <span class="mg">留言</span>
            <span class="recent" >最近留言</span>
            <span class="sort">排序
                <svg class="icon icon-zhankai" aria-hidden="true">
                        <use xlink:href="#icon-zhankai"></use>
                </svg>
            </span>
         </div>
            <div class="critism" id="criticism" style>
                <criticism v-for="item in 2" :key="item.id"></criticism>
                <criticism-input></criticism-input>
            </div>
    </div>
</template>
<script>
import Criticism from '../../common/criticism.vue';
import CriticismInput from '../../common/criticismInput.vue';
export default {
    components: { Criticism, CriticismInput }

};
</script>
<style lang="less" scoped>
.com-mark{
    margin: auto;
    width:960px;
    background-color : white;
}
.leave{
    font-weight: bold;
    font-size: 18px;
    padding:40px 0;
    text-align:center;

}
.leavemessages{
    background-color: #C8C8C8;
    padding-left: 30px;
    font-size: 16px;
    height:30px;
    padding-top: 5px;
    font-weight: bold;
    color: #2D6496;
    position:relative;
    .mg{
        position: absolute;
        left: 30px;

    }
    .recent{
        position: absolute;
        right: 250px;

    }
    .sort{
        display: inline-block;
        width:100px;
        position: absolute;
        right: 30px;

    }
}

</style>
