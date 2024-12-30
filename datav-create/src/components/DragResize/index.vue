<template>
    <!-- :isActive="isActive" -->

  <VueDragResize
    @clicked="onActivated"
    :parentLimitation="parentLimitation"
    :preventActiveBehavior="preventActiveBehavior"
    v-on:resizing="resize"
    v-on:dragging="resize"
    :parentScaleX="scaleX"
    :parentScaleY="scaleY"
    :x="x"
    :y="y"
    :w="w"
    :h="h"
  >
    <component
      :is="type"
      :options="options"
      :img="img"
      :text="text"
    ></component>
  </VueDragResize>
</template>

<script>
export default {
  components: {},
  // 参数属性
  props: {
    scaleX: {
      type: Number,
      default: 0,
    },
    scaleY: {
      type: Number,
      default: 0,
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  // 定义属性
  data() {
    return {
      parentLimitation: true, //是否限制父容器范围
      preventActiveBehavior:false,//是否阻止拖拽时激活其他组件
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    x: {
      get() {
        return this.value.x;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    y: {
      get() {
        return this.value.y;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    w: {
      get() {
        return this.value.w;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    h: {
      get() {
        return this.value.h;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    type: {
      get() {
        return this.value.type;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    options: {
      get() {
        return this.value.options;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    img: {
      get() {
        return this.value.img;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    text: {
      get() {
        return this.value.text;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    isActive:{
      get() {
        return this.value.isActive;
      },
      set(val) {
        this.$emit("input", val);
      },
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    resize(data) {
      this.$emit("update:value", Object.assign({}, this.value, data));
    },
    onActivated() {
      this.$emit("setActive")
      this.$emit("update:value", Object.assign({}, this.value, {isActive:true}));
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
</style>