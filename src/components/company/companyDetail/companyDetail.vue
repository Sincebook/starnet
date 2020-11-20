<template>
  <div>这是id为{{this.$route.params.id}}的公司详情</div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'XXX',
  data() {
    return {

    };
  },
  created() {
    console.log(this);
    console.log(this.$route.params.id);
  },
  mounted() {

  },
  components: {

  }
};
</script>
<style lang='less'>
</style>
