const getters = {
  pageData: state => state.edit.pageData,
  componentList: state => state.edit.componentList,
  active: state => {
    return state.edit.componentList.some(item => item.active == true)
  },
  activeIndex: state => {
    for (let i = 0, l = state.edit.componentList.length; i < l; i++) {
      let item = state.edit.componentList[i];
      if (item.active) {
        return i;
      }
    }
    return null;
  },
  activeComponent: state => {
    for (let i = 0, l = state.edit.componentList.length; i < l; i++) {
      let item = state.edit.componentList[i];
      if (item.active) {
        return item;
      }
    }
    return null;
  },
  getActive: state => {
    for (let i = 0, l = state.rect.rects.length; i < l; i++) {
      let rect = state.rect.rects[i];

      if (rect.active) {
        return i;
      }
    }
    return null;
  }
}
export default getters
