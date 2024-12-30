<template>
  <div class="app-container">
    <my-scale-screen
      :width="pageData.width"
      :height="pageData.height"
      :wrapperStyle="{
        backgroundImage: pageData.backgroundImage
          ? `url(${pageData.backgroundImage})`
          : '',
        backgroundColor: pageData.backgroundColor,
      }"
      ref="scaleScreen"
    >
      <div class="scale-box">
        <div
          class="scale-item"
          v-for="item in componentList"
          :key="item.id"
          :style="`left:${item.left}px;top:${item.top}px;width:${item.width}px;height:${item.height}px`"
        >
          <component
            :ref="item.id"
            :is="item.type"
            :options.sync="item.options"
            :dataSource="item.dataSource"
            :dataRefresh="item.dataRefresh"
          ></component>
        </div>
      </div>
    </my-scale-screen>
  </div>
</template>

<script>
import MyScaleScreen from "@/components/MyScaleScreen";
export default {
  components: {
    MyScaleScreen,
  },
  // 参数属性
  props: {},
  // 定义属性
  data() {
    return {
      isShow: false,
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    pageData() {
      return JSON.parse(localStorage.getItem("pageData"));
    },
    wrapperStyle() {
      return {
        backgroundImage: `url(${this.pageData.backgroundImage})`,
        backgroundColor: this.pageData.backgroundColor,
      };
    },
    componentList() {
      return JSON.parse(localStorage.getItem("componentList"));
    },
  },
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

<style lang='scss' scoped>
.app-container {
  width: 100%;
  height: 100%;
  .scale-box {
    width: 100%;
    height: 100%;
    position: relative;
    .scale-item {
      position: absolute;
    }
  }
}
</style>