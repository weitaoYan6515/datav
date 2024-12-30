<template>
  <my-echarts :options="option"></my-echarts>
</template>

<script>
import { deepClone } from "@/utils";
import { getSingleData, getMultipleData, formatDataLineBar } from "./getData";
export default {
  name: "cline",
  components: {},
  // 参数属性
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    dataSource: {
      type: String,
      default: "",
    },
    dataRefresh: {
      type: Number,
      default: 0,
    },
  },
  // 定义属性
  data() {
    return {
      option: {},
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {
    dataSource: {
      handler(val) {
        this.getOption();
      },
      immediate: true,
    },
    dataRefresh: {
      handler(val) {
        this.timmer && clearInterval(this.timmer);
        if (val && this.dataSource) {
          this.timmer = setInterval(this.getData, 1000 * this.dataRefresh);
        }
      },
      immediate: true,
    },
  },
  // 方法集合
  methods: {
    async getData() {
      switch (this.dataSource) {
        case "single":
          var data = await getSingleData();
          break;
        case "multiple":
          var data = await getMultipleData();
          break;
        default:
      }
      this.option = formatDataLineBar(data, deepClone(this.options));
    },
    async getOption() {
      if (this.dataSource) {
        this.getData();
      } else {
        this.option = deepClone(this.options);
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
  beforeDestroy() {
    this.timmer && clearInterval(this.timmer);
  }, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='scss' scoped>
</style>