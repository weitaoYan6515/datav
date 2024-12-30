<template>
  <div class="my-head">
    <div class="title-box">
      <dv-decoration-5 />
      <div class="title">{{ title }}</div>
    </div>
    <div class="menu-box">
      <my-menu :menuList="menuList">
        <div class="aaa" @click="console">
          <span>12312</span>
        </div>
      </my-menu>
    </div>
  </div>
</template>

<script>
import MyMenu from "./MyMenu";
import { asyncRoutesL, asyncRoutesR } from "@/router";
export default {
  components: {
    MyMenu,
  },
  // 参数属性
  props: {},
  // 定义属性
  data() {
    return {
      title: "数据可视化",
      menuList: asyncRoutesL
        .concat([
          {
            isCenter: true,
          },
        ])
        .concat(asyncRoutesR),
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    console(){
      console.log(111)
    }
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
$centerW: 800px;
$centerH: 80px;
.my-head {
  width: 100%;
  display: flex;
  position: relative;
  .title-box {
    width: $centerW;
    height: $centerH;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .title {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      font-size: 30px;
    }
  }
  .menu-box {
    width: 100%;
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ::v-deep .menu-center {
      width: $centerW;
      height: $centerH;
      position: relative;
      .aaa{
        position: absolute;
        bottom: 0;
        right: 0;
        cursor: pointer;
      }
    }
  }
}
</style>