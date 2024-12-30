<template>
  <div class="app-container">
    <div class="box">
      <VueDragResize
        v-for="(rect, index) in rects"
        :key="index"
        :w="rect.width"
        :h="rect.height"
        :x="rect.left"
        :y="rect.top"
        :axis="rect.axis"
        :isActive="rect.active"
        :minw="rect.minw"
        :minh="rect.minh"
        :isDraggable="rect.draggable"
        :isResizable="rect.resizable"
        :parentLimitation="rect.parentLim"
        :snapToGrid="rect.snapToGrid"
        :aspectRatio="rect.aspectRatio"
        :z="rect.zIndex"
        :contentClass="rect.class"
        v-on:activated="activateEv(index)"
        v-on:deactivated="deactivateEv(index)"
        v-on:dragging="changePosition($event, index)"
        v-on:resizing="changeSize($event, index)"
      >
        <div
          class="filler"
          :style="{
            width: '100%',
            height: '100%',
            backgroundColor: rect.color,
          }"
        ></div>
      </VueDragResize>
    </div>
    <div class="tool"  @mousedown.stop>
      <button>1</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  // 参数属性
  props: {},
  // 定义属性
  data() {
    return {
      rects: [
        {
          width: 200,
          height: 150,
          top: 10,
          left: 10,
          draggable: true,
          resizable: true,
          minw: 10,
          minh: 10,
          axis: "both",
          parentLim: true,
          snapToGrid: false,
          aspectRatio: false,
          zIndex: 1,
          color: "#EF9A9A",
          active: false,
        },
        {
          width: 200,
          height: 150,
          top: 170,
          left: 220,
          draggable: true,
          resizable: true,
          minw: 10,
          minh: 10,
          axis: "both",
          parentLim: true,
          snapToGrid: false,
          aspectRatio: false,
          zIndex: 1,
          color: "#E6C27A",
          active: false,
          class: "box-shaddow",
        },
        {
          width: 200,
          height: 150,
          top: 10,
          left: 220,
          draggable: true,
          resizable: true,
          minw: 10,
          minh: 10,
          axis: "both",
          parentLim: true,
          snapToGrid: false,
          aspectRatio: false,
          zIndex: 2,
          color: "#AED581",
          active: false,
        },
        {
          width: 200,
          height: 150,
          top: 170,
          left: 10,
          draggable: true,
          resizable: true,
          minw: 10,
          minh: 10,
          axis: "both",
          parentLim: true,
          snapToGrid: false,
          aspectRatio: false,
          zIndex: 3,
          color: "#81D4FA",
          active: false,
        },
      ],
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    activateEv(inx) {
      this.rects.map((item, index) => {
        if (index == inx) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
      console.log(this.rects);
    },
    deactivateEv(inx) {
      this.rects[inx].active = false;
    },
    changePosition(e, index) {},
    changeSize(e, index) {},
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
.app-container {
  height: 100%;
  display: flex;
  .box {
    flex: 1;
    position: relative;
  }
  .tool {
    width: 300px;
    height: 100%;
  }
}
</style>