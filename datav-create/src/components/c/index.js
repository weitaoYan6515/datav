import Vue from 'vue'
const requireComponent = require.context('./', true, /.vue$/)
requireComponent.keys().forEach(moduleName => {
  const module = requireComponent(moduleName);
  if (module.default.name) {
    Vue.component(module.default.name, module.default);
  }
});