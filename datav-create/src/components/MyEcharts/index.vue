<template>
  <div ref="echartsBox" class="echarts-box-container">
    <div
      
      :id="id"
      :class="className"
      :style="{ height: height, width: width }"
    />
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  components: {},
  name: "MyEcharts",
  props: {
    className: {
      type: String,
      default: "chart",
    },
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  // 定义属性
  data() {
    return {
      chart: null,
      observer: null,
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {
    options: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  // 方法集合
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el);
      this.setOptions(this.options);

      this.observer = new ResizeObserver(() => {
        this.chart && this.chart.resize();
      });
      this.observer.observe(this.$refs.echartsBox);
    },
    setOptions(options) {
      if (options) {
        if (this.clear) {
          this.chart.clear();
        }
        this.chart.setOption(options, true);
      } else {
        this.chart.clear();
      }
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initChart();
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.observer.disconnect()
    this.chart.dispose();
    this.chart = null;
  }, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='scss' scoped>
.echarts-box-container {
  width: 100%;
  height: 100%;
}
</style>