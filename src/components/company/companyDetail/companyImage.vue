<template>
    <div class="company-image">
        <p class="photo">图&nbsp;片</p>
        <div class="imgList">
            <img v-for="src in imgs" :key="src.id" :src="src" >
        </div>
        <pagination allPages="20" ></pagination>
    </div>
</template>

<script>
import Pagination from '../../common/pagination.vue';

export default {
    data() {
        return {
             imgs: [require('@/assets/images/dswcb3.jpg'), require('@/assets/images/dswcb3.jpg'), require('@/assets/images/dswcb3.jpg'), require('@/assets/images/dswcb3.jpg'), require('@/assets/images/dswcb3.jpg'), require('@/assets/images/dswcb3.jpg'), require('@/assets/images/dswcb3.jpg'), require('@/assets/images/dswcb3.jpg'), require('@/assets/images/dswcb3.jpg')]
        };
    },
    components: {
        Pagination
    }
};

</script>
<style lang="less" scoped>
.company-image{
    padding-top:30px;
    width:960px;
    height:630px;
    margin: 0 auto;
    text-align: center;
    background-color: white;
    margin-bottom: 60px;
}
.photo{
    font-weight: 800;
    font-size: 18px;
    margin-top: 20px;
}
.imgList{
    margin-bottom:20px;

}
.imgList img{
    width : 280px;
    height: 120px;
    margin: 20px 10px;

}
</style>
