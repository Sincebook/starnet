<template>
  <div class="audio">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :disabled="dis">
      <el-form-item prop="id">
        <el-select
          v-model="ruleForm.id"
          placeholder="请选择要删除的音频"
          clearable
        >
          <el-option
            v-for="(res, index) in item"
            :key="res.id"
            :label="index + 1 + ' ' + res.title"
            :value="res.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="danger"
          @click="submitForm()"
          size="mini"
          >删除</el-button
        >
      </el-form-item>
    </el-form>
    <aplayer
      v-if="flag"
      :music="item[0]"
      :list="item"
      :autoplay="false"
      :listFolded="false"
    />
  </div>
</template>

<script>
import aplayer from 'vue-aplayer';
export default {
  props: ['item', 'flag'],
  data() {
    return {
      ruleForm: {
        id: ''
      },
      rules: {
        id: [
          { required: true, message: '请选择要删除的音频', trigger: 'change' }
        ]
      },
      dis: false
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('deleteWorks', this.ruleForm.id);
           this.$refs.ruleForm.resetFields();
        }
      });
    }
  },
  components: {
    aplayer
  }
};
</script>

<style lang="less" scoped>
.el-form {
  position: absolute;
  top: -75px;
  right: 0;
  display: flex;
  justify-content: center;
  .el-button {
    margin-left: 15px;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
}
</style>
