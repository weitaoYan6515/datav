
<template>
  <div id="layout">
    <div class="data-view">
      <div class="head">
        <my-head></my-head>
      </div>
      <div class="body">
        <router-view />
        <!-- <dv-border-box-1>
            <router-view />
          </dv-border-box-1> -->
      </div>
    </div>
  </div>
</template>


<script>
import MyHead from "./MyHead";
export default {
  components: {
    MyHead,
  },
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
  methods: {},
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

<style lang="scss">
#app,
body,
html {
  width: 100%;
  height: 100%;
  margin: 0;
}
#layout {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;
  .data-view {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .body {
      flex: 1;
        overflow: hidden;
      .app-container {
        width: 100%;
        height: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        overflow: hidden;
      }
    }
  }
}
</style>