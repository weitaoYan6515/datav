<template>
  <div class="nav">
    <div @click="goto('edit')">编辑</div>
    <div @click="goto('preview')">预览</div>
    <div @click="goto('test')">测试</div>
    <div @click="goto('dataConfig')">数据</div>
  </div>
</template>

<script>
export default {
  components: {},
  // 参数属性
  props: {},
  // 定义属性
  data() {
    return {};
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    goto(path) {
      if (path == "preview") {
        const routeData = this.$router.resolve({
          name: "preview", // 目标路由的名称
          params: {
            /* 参数 */
          },
          query: {
            /* 查询字符串 */
          },
        });
        window.open(routeData.href, "_blank");
      } else {
        this.$router.push(path);
      }
    },
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='scss' scoped>
.nav {
  display: flex;
  > div {
    margin: 10px;
    cursor: pointer;
  }
}
</style>