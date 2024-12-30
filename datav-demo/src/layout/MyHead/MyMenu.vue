<template>
  <div class="menu">
    <div
      :class="{
        'menu-center': item.isCenter,
        'menu-item': !item.isCenter,
        active:
          item.name == activeMenuName ||
          (item.children &&
            item.children.some((item) => item.name == activeMenuName)),
      }"
      v-for="(item, index) in menuList"
      :key="index"
    >
      <div @click="goto(item.path)" v-if="item.meta" class="title">
        {{ item.meta.title }}
      </div>
      <div class="menu-children" v-if="item.children">
        <my-menu :menuList="item.children" :basePath="item.path"></my-menu>
      </div>
      <slot v-if="item.isCenter"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyMenu",
  components: {},
  // 参数属性
  props: {
    basePath: {
      type: String,
      default: "",
    },
    menuList: [
      /* 
      {
        title: "page1",
        path: "/",
      },
      {
        title: "page2",
        path: "/",
        children: [
          {
            title: "page21",
            path: "/",
          },
          {
            title: "page22",
            path: "/",
          },
          {
            title: "page23",
            path: "/",
          },
        ],
      },
      {
        title: "page3",
        path: "/",
      },
      {
        title: "",
        path: "/",
      },
      {
        title: "page4",
        path: "/",
      },
      {
        title: "page5",
        path: "/",
      },
      {
        title: "page6",
        path: "/",
      },
     */
    ],
  },
  // 定义属性
  data() {
    return {};
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    activeMenuName() {
      const route = this.$route;
      const { name } = route;
      return name;
    },
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    goto(path) {
      if (this.basePath) {
        this.$router.push(this.basePath + "/" + path);
      } else {
        this.$router.push(path);
      }
    },
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  /**
   * MyMenu 组件的生命周期钩子，在组件挂载后执行。
   * 目前该钩子内为空，可根据实际需求添加初始化逻辑。
   */
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
$centerW: 800px;
$centerH: 80px;
$activeColor: #f00;
$activeBgColor: #fff;
.menu {
  width: 100%;
  display: flex;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .menu-center {
    width: $centerW;
    height: $centerH;
  }
  .menu-item {
    position: relative;
    cursor: pointer;
    .title {
      font-size: 24px;
      line-height: 40px;
    }
    .menu-children {
      position: absolute;
      display: none;
      top: 100%;
      left: 0;
      z-index: 999;
      .menu {
        padding: 0;
        display: flex;
        flex-direction: column;
      }
    }
    &:hover {
      > .title {
        color: $activeColor;
        background: $activeBgColor;
      }
      > .menu-children {
        display: block;
      }
    }
  }
  .active > .title {
    color: $activeColor;
    background: $activeBgColor;
  }
}
</style>