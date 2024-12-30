<template>
  <div class="app">
    <div class="left">
      <div
        v-for="(comp, idx) in echartList"
        :key="idx"
        draggable="true"
        @dragstart="dragstart(comp)"
        @dragend="dragend(comp)"
      >
        <div>{{ comp.name }}</div>
      </div>
    </div>
    <div class="center">
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
        @getScale="getScale"
      >
        <div
          class="scale-box"
          @dragover.prevent
          @drop.capture="drop($event)"
          v-if="isShow"
        >
          <VueDragResize
            v-for="(item, index) in componentList"
            :key="index"
            :w="item.width"
            :h="item.height"
            :x="item.left"
            :y="item.top"
            :isActive="item.active"
            :parentScaleX="scale"
            :parentScaleY="scale"
            :parentLimitation="true"
            v-on:activated="activateEv(index)"
            v-on:deactivated="deactivateEv(index)"
            v-on:dragging="changePosition($event, index)"
            v-on:resizing="changeSize($event, index)"
          >
            <component :is="item.type" :options="item.options"></component>
          </VueDragResize>
        </div>
      </my-scale-screen>
    </div>
    <div class="right" @mousedown.stop>
      <el-scrollbar style="height: 100%" v-if="isShow">
        <div class="button">
          <div @click="save">保存</div>
          <div @click="clear">清除</div>
        </div>
        <el-tabs>
          <el-tab-pane label="样式">
            <div class="page-info" v-if="!active">
              <el-form label-position="left" label-width="100px" size="mini">
                <el-form-item label="标题">
                  <el-input
                    v-model="pageData.title"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item label="宽度">
                  <el-input-number v-model="pageData.width"></el-input-number>
                </el-form-item>
                <el-form-item label="高度">
                  <el-input-number v-model="pageData.height"></el-input-number>
                </el-form-item>
                <el-form-item label="背景图">
                  <el-input v-model="pageData.backgroundImage"></el-input>
                </el-form-item>
                <el-form-item label="背景色">
                  <el-input v-model="pageData.backgroundColor"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="component-info" v-if="active && componentData">
              <el-collapse>
                <el-collapse-item title="宽高设置">
                  <el-form
                    label-position="left"
                    label-width="100px"
                    size="mini"
                  >
                    <el-form-item label="宽度">
                      <el-input-number
                        v-model="componentData.width"
                      ></el-input-number>
                    </el-form-item>
                    <el-form-item label="高度">
                      <el-input-number
                        v-model="componentData.height"
                      ></el-input-number>
                    </el-form-item>
                    <el-form-item label="x">
                      <el-input-number
                        v-model="componentData.left"
                      ></el-input-number>
                    </el-form-item>
                    <el-form-item label="y">
                      <el-input-number
                        v-model="componentData.top"
                      ></el-input-number>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
                <el-collapse-item title="标题设置">
                  <el-form
                    label-position="left"
                    label-width="100px"
                    size="mini"
                  >
                    <el-form-item label="是否显示">
                      <el-switch
                        v-model="componentData.options.title.show"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                      >
                      </el-switch>
                    </el-form-item>
                    <el-form-item label="标题名">
                      <el-input
                        v-model="componentData.options.title.text"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="字体颜色">
                      <!--  <el-color-picker
                    v-model="componentData.title.textStyle.color"
                  ></el-color-picker> -->
                      <input type="color" />
                    </el-form-item>
                    <el-form-item label="字体大小">
                      <el-input-number
                        v-model="componentData.options.title.textStyle.fontSize"
                      ></el-input-number>
                    </el-form-item>
                    <el-form-item label="左右位置">
                      <el-select
                        :popper-append-to-body="false"
                        v-model="componentData.options.title.left"
                        placeholder="请选择"
                      >
                        <el-option label="左侧" value="left"> </el-option>
                        <el-option label="居中" value="center"> </el-option>
                        <el-option label="右侧" value="right"> </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
                <el-collapse-item
                  title="x轴设置"
                  v-if="componentData.options.xAxis"
                >
                  <el-form
                    label-position="left"
                    label-width="100px"
                    size="mini"
                  >
                    <el-form-item label="是否显示">
                      <el-switch
                        v-model="componentData.options.xAxis.show"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                      >
                      </el-switch>
                    </el-form-item>
                    <el-form-item label="数值显示">
                      <el-switch
                        v-model="componentData.options.xAxis.axisLabel.show"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                      >
                      </el-switch>
                    </el-form-item>
                    <el-form-item label="字体颜色">
                      <el-color-picker
                        v-model="componentData.options.xAxis.axisLabel.color"
                      ></el-color-picker>
                    </el-form-item>
                    <el-form-item label="字体大小">
                      <el-input-number
                        v-model="componentData.options.xAxis.axisLabel.fontSize"
                      ></el-input-number>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
                <el-collapse-item
                  title="y轴设置"
                  v-if="componentData.options.yAxis"
                >
                  <el-form
                    label-position="left"
                    label-width="100px"
                    size="mini"
                  >
                    <el-form-item label="是否显示">
                      <el-switch
                        v-model="componentData.options.yAxis.show"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                      >
                      </el-switch>
                    </el-form-item>
                    <el-form-item label="数值显示">
                      <el-switch
                        v-model="componentData.options.yAxis.axisLabel.show"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                      >
                      </el-switch>
                    </el-form-item>
                    <el-form-item label="字体颜色">
                      <el-color-picker
                        v-model="componentData.options.yAxis.axisLabel.color"
                      ></el-color-picker>
                    </el-form-item>
                    <el-form-item label="字体大小">
                      <el-input-number
                        v-model="componentData.options.yAxis.axisLabel.fontSize"
                      ></el-input-number>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
                <el-collapse-item
                  title="坐标轴间距"
                  v-if="componentData.options.grid"
                >
                  <el-form
                    label-position="left"
                    label-width="100px"
                    size="mini"
                  >
                    <el-form-item label="左边距(像素)">
                      <el-slider
                        v-model="componentData.options.grid.left"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="右边距(像素)">
                      <el-slider
                        v-model="componentData.options.grid.right"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="顶边距(像素)">
                      <el-slider
                        v-model="componentData.options.grid.top"
                      ></el-slider>
                    </el-form-item>
                    <el-form-item label="底边距(像素)">
                      <el-slider
                        v-model="componentData.options.grid.bottom"
                      ></el-slider>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>

                <el-collapse-item title="图形设置">
                  <div></div>
                  <div
                    v-for="(item, index) in componentData.options.series"
                    :key="index"
                  >
                    <div v-if="componentData.options.series.length > 1">
                      图形{{ index + 1 }}
                    </div>
                    <el-form
                      label-position="left"
                      label-width="100px"
                      size="mini"
                    >
                      <el-form-item
                        label="折线类型"
                        v-if="
                          componentData.options.series[index].hasOwnProperty(
                            'smooth'
                          )
                        "
                      >
                        <el-switch
                          v-model="componentData.options.series[index].smooth"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                        >
                        </el-switch>
                      </el-form-item>
                      <el-form-item
                        label="图形颜色"
                        v-if="
                          componentData.options.series[index].hasOwnProperty(
                            'itemStyle'
                          )
                        "
                      >
                        <el-color-picker
                          show-alpha
                          color-format="rgb"
                          v-model="
                            componentData.options.series[index].itemStyle.color
                          "
                        ></el-color-picker>
                      </el-form-item>
                      <el-form-item
                        label="文字颜色"
                        v-if="componentData.options.series[index].label"
                      >
                        <el-color-picker
                          v-model="
                            componentData.options.series[index].label.color
                          "
                        ></el-color-picker>
                      </el-form-item>
                      <el-form-item
                        label="字体大小"
                        v-if="componentData.options.series[index].label"
                      >
                        <el-input-number
                          v-model="
                            componentData.options.series[index].label.fontSize
                          "
                        ></el-input-number>
                      </el-form-item>
                      <el-form-item
                        label="内半径"
                        v-if="componentData.options.series[index].radius"
                      >
                        <el-slider
                          :min="0"
                          :max="100"
                          v-model="componentData.options.series[index].radiusX"
                          @change="changeRadius($event, index, 0)"
                        ></el-slider>
                      </el-form-item>
                      <el-form-item
                        label="外半径"
                        v-if="componentData.options.series[index].radiusY"
                      >
                        <el-slider
                          :min="1"
                          :max="100"
                          v-model="componentData.options.series[index].radiusY"
                          @change="changeRadius($event, index, 1)"
                        ></el-slider>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>
          <el-tab-pane label="数据">
            <div class="data-info" v-if="active && componentData">
              <el-form label-position="left" label-width="100px" size="mini">
                <el-form-item label="数据源">
                  <el-select
                    :popper-append-to-body="false"
                    v-model="componentData.dataSource"
                    @change="changeDataSource($event, componentData.type)"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option label="单数据" value="single"> </el-option>
                    <el-option label="多数据" value="multiple"> </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import echartsData from "./echartsData";
import { formatDataLineBar, formatDataPie } from "./echartsData";
export default {
  name: "app",
  components: {},
  data() {
    return {
      scale: 1,
      isShow: false,
      componentData: null,
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(["pageData", "componentList", "active"]),
    echartList() {
      let arr = [];
      for (const key in echartsData) {
        if (Object.prototype.hasOwnProperty.call(echartsData, key)) {
          const element = echartsData[key];
          arr.push({ name: element.name, type: key });
        }
      }
      return arr;
    },
  },
  watch: {},
  methods: {
    getScale(val) {
      this.scale = val;
      this.isShow = true;
    },
    dragstart(params) {
      let data = echartsData[params.type];
      this.componentWidth = data.width;
      this.componentHeight = data.height;
    },
    dragend(params) {
      if (!this.isAdd) {
        return;
      }
      let data = echartsData[params.type];
      this.$store.dispatch("edit/addComponent", {
        width: data.width,
        height: data.height,
        left: this.x,
        top: this.y,
        active: true,
        type: "cline",
        options: data.options,
        dataSource: "",
      });
      this.isAdd = false;
    },
    drop(e) {
      this.isAdd = true;
      //计算初始位置
      if (e.target == e.currentTarget) {
        if (e.offsetX < this.componentWidth / 2) {
          this.x = 0;
        } else if (e.offsetX > this.pageData.width - this.componentWidth / 2) {
          this.x = this.pageData.width - this.componentWidth;
        } else {
          this.x = e.offsetX - this.componentWidth / 2;
        }
        if (e.offsetY < this.componentHeight / 2) {
          this.y = 0;
        } else if (
          e.offsetY >
          this.pageData.height - this.componentHeight / 2
        ) {
          this.y = this.pageData.height - this.componentHeight;
        } else {
          this.y = e.offsetY - this.componentHeight / 2;
        }
      } else {
        let scaleBox = document.getElementsByClassName("scale-box")[0];
        let x =
          (e.clientX - scaleBox.getBoundingClientRect().left) / this.scale;
        let y = (e.clientY - scaleBox.getBoundingClientRect().top) / this.scale;
        if (x < this.componentWidth / 2) {
          this.x = 0;
        } else if (x > this.pageData.width - this.componentWidth / 2) {
          this.x = this.pageData.width - this.componentWidth;
        } else {
          this.x = x - this.componentWidth / 2;
        }
        if (y < this.componentHeight / 2) {
          this.y = 0;
        } else if (y > this.pageData.height - this.componentHeight / 2) {
          this.y = this.pageData.height - this.componentHeight;
        } else {
          this.y = y - this.componentHeight / 2;
        }
      }
    },
    activateEv(index) {
      this.componentData = this.componentList[index];
      this.$store.dispatch("edit/setActive", { index: index });
    },

    deactivateEv(index) {
      this.$store.dispatch("edit/unsetActive", { index: index });
    },

    changePosition(newRect, index) {
      this.$store.dispatch("edit/setTop", { index: index, top: newRect.top });
      this.$store.dispatch("edit/setLeft", {
        index: index,
        left: newRect.left,
      });
      this.$store.dispatch("edit/setWidth", {
        index: index,
        width: newRect.width,
      });
      this.$store.dispatch("edit/setHeight", {
        index: index,
        height: newRect.height,
      });
    },

    changeSize(newRect, index) {
      this.$store.dispatch("edit/setTop", { index: index, top: newRect.top });
      this.$store.dispatch("edit/setLeft", {
        index: index,
        left: newRect.left,
      });
      this.$store.dispatch("edit/setWidth", {
        index: index,
        width: newRect.width,
      });
      this.$store.dispatch("edit/setHeight", {
        index: index,
        height: newRect.height,
      });
    },

    changeRadius(val, index, idx) {
      this.$set(
        this.componentData.options.series[index].radius,
        idx,
        val + "%"
      );
    },
    changeDataSource(val, type) {
      // 单
      var data1 = {
        x: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月",
        ],
        data: [
          {
            name: "北京",
            list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          },
        ],
      };
      // 多
      var data2 = {
        x: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月",
        ],
        data: [
          {
            name: "上海",
            list: [12, 23, 13, 44, 52, 63, 27, 48, 69, 10, 121, 42],
          },
          {
            name: "北京",
            list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          },
          
        ],
      };

      switch (type) {
        case "cline":
        case "cbar":
          switch (val) {
            case "single":
              formatDataLineBar(data1, this.componentData.options);
              break;
            case "multiple":
              formatDataLineBar(data2, this.componentData.options);
              break;
            default:
              break;
          }
          break;
        case "cpie":
          switch (val) {
            case "single":
              formatDataPie(data1, this.componentData.options);
              break;
            case "multiple":
              formatDataPie(data2, this.componentData.options);
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    },
    save() {
      localStorage.setItem("componentList", JSON.stringify(this.componentList));
      localStorage.setItem("pageData", JSON.stringify(this.pageData));
    },
    clear() {
      this.$store.dispatch("edit/clearComponent");
    },
  },
};
</script>

<style lang='scss' scoped>
.app {
  height: 100%;
  display: flex;
  .left {
    width: 300px;
    height: 100%;
    padding: 0 10px;
  }
  .center {
    flex: 1;
    overflow: hidden;
    .scale-box {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }
  .right {
    width: 300px;
    height: 100%;
    padding: 0 10px;
  }
}
</style>
<style lang="scss">
.el-slider {
  margin-right: 20px;
}
.el-tabs__content,
.el-collapse-item__wrap {
  overflow: visible;
}
</style>