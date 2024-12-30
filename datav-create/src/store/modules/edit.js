
let componentList = JSON.parse(localStorage.getItem("componentList"));
let pageData = JSON.parse(localStorage.getItem("pageData"));
const state = {
    /* 'pageData': {
        'width': 1920,
        'height': 1080,
        'backgroundImage': 'https://admin.mtruning.club/static/file_upload/97c87bc99db06df1a7c0d589936671eb.png?time=1731633932023',
        'backgroundColor': '#000'
    },
    'componentList': [], */
    pageData: pageData?pageData:{
        'width': 1920,
        'height': 1080,
        'backgroundImage': '',
        'backgroundColor': '#000'
    },
    componentList: componentList?componentList:[],

}

const mutations = {
    
    ADD_COMPONENT(state, component) {
        state.componentList.push(component);
    },
    REMOVE_COMPONENT(state, index) {
        state.componentList.splice(index, 1);
    },
    CLEAR_COMPONENT(state) {
        state.componentList = []
    },
    ENABLE_ACTIVE(state, index) {
        state.componentList[index].active = true;
    },
    DISABLE_ACTIVE(state, index) {
        state.componentList[index].active = false;
    },

    ENABLE_ASPECT(state, index) {
        state.componentList[index].aspectRatio = true;
    },
    DISABLE_ASPECT(state, index) {
        state.componentList[index].aspectRatio = false;
    },

    ENABLE_DRAGGABLE(state, index) {
        state.componentList[index].draggable = true;
    },
    DISABLE_DRAGGABLE(state, index) {
        state.componentList[index].draggable = false;
    },

    ENABLE_RESIZABLE(state, index) {
        state.componentList[index].resizable = true;
    },
    DISABLE_RESIZABLE(state, index) {
        state.componentList[index].resizable = false;
    },

    ENABLE_SNAP_TO_GRID(state, index) {
        state.componentList[index].snapToGrid = true;
    },
    DISABLE_SNAP_TO_GRID(state, index) {
        state.componentList[index].snapToGrid = false;
    },

    ENABLE_BOTH_AXIS(state, index) {
        state.componentList[index].axis = 'both';
    },
    ENABLE_NONE_AXIS(state, index) {
        state.componentList[index].axis = 'none';
    },
    ENABLE_X_AXIS(state, index) {
        state.componentList[index].axis = 'x';
    },
    ENABLE_Y_AXIS(state, index) {
        state.componentList[index].axis = 'y';
    },

    ENABLE_PARENT_LIMITATION(state, index) {
        state.componentList[index].parentLim = true;
    },
    DISABLE_PARENT_LIMITATION(state, index) {
        state.componentList[index].parentLim = false;
    },

    CHANGE_ZINDEX(state, payload) {
        state.componentList[payload.index].zIndex = payload.zIndex;
    },

    CHANGE_HEIGHT(state, payload) {
        state.componentList[payload.index].height = payload.height;
    },

    CHANGE_WIDTH(state, payload) {
        state.componentList[payload.index].width = payload.width;
    },

    CHANGE_TOP(state, payload) {
        state.componentList[payload.index].top = payload.top;
    },

    CHANGE_LEFT(state, payload) {
        state.componentList[payload.index].left = payload.left;
    },

    CHANGE_MINH(state, payload) {

        state.componentList[payload.index].minh = payload.minh;
    },

    CHANGE_MINW(state, payload) {
        state.componentList[payload.index].minw = payload.minw;
    }
}

const actions = {
    addComponent({ commit }, {component}) {
        commit('ADD_COMPONENT', component);
    },
    removeComponent({ commit }, {index}) {
        commit('REMOVE_COMPONENT', index);
    },
    clearComponent({ commit }) {
        commit('CLEAR_COMPONENT');
    },
    setActive({ commit, state }, { index }) {
        for (let i = 0, l = state.componentList.length; i < l; i++) {
            if (i === index) {
                commit('ENABLE_ACTIVE', i);
                continue;
            }

            commit('DISABLE_ACTIVE', i);
        }
    },
    unsetActive({ commit }, { index }) {
        commit('DISABLE_ACTIVE', index);
    },

    toggleDraggable({ commit, state }, { index }) {
        if (!state.componentList[index].draggable) {
            commit('ENABLE_DRAGGABLE', index);
        } else {
            commit('DISABLE_DRAGGABLE', index);
        }
    },

    toggleResizable({ commit, state }, { index }) {
        if (!state.componentList[index].resizable) {
            commit('ENABLE_RESIZABLE', index);
        } else {
            commit('DISABLE_RESIZABLE', index);
        }
    },

    toggleParentLimitation({ commit, state }, { index }) {
        if (!state.componentList[index].parentLim) {
            commit('ENABLE_PARENT_LIMITATION', index);
        } else {
            commit('DISABLE_PARENT_LIMITATION', index);
        }
    },

    toggleSnapToGrid({ commit, state }, { index }) {
        if (!state.componentList[index].snapToGrid) {
            commit('ENABLE_SNAP_TO_GRID', index);
        } else {
            commit('DISABLE_SNAP_TO_GRID', index);
        }
    },

    setAspect({ commit }, { index }) {
        commit('ENABLE_ASPECT', index);
    },
    unsetAspect({ commit }, { index }) {
        commit('DISABLE_ASPECT', index);
    },

    setWidth({ commit }, { index, width }) {
        commit('CHANGE_WIDTH', { index, width });
    },

    setHeight({ commit }, { index, height }) {
        commit('CHANGE_HEIGHT', { index, height });
    },

    setTop({ commit }, { index, top }) {
        commit('CHANGE_TOP', { index, top });
    },

    setLeft({ commit }, { index, left }) {
        commit('CHANGE_LEFT', { index, left });
    },

    changeXLock({ commit, state }, { index }) {
        switch (state.componentList[index].axis) {
            case 'both':
                commit('ENABLE_Y_AXIS', index);
                break;
            case 'x':
                commit('ENABLE_NONE_AXIS', index);
                break;
            case 'y':
                commit('ENABLE_BOTH_AXIS', index);
                break;
            case 'none':
                commit('ENABLE_X_AXIS', index);
                break;
        }
    },

    changeYLock({ commit, state }, { index }) {
        switch (state.componentList[index].axis) {
            case 'both':
                commit('ENABLE_X_AXIS', index);
                break;
            case 'x':
                commit('ENABLE_BOTH_AXIS', index);
                break;
            case 'y':
                commit('ENABLE_NONE_AXIS', index);
                break;
            case 'none':
                commit('ENABLE_Y_AXIS', index);
                break;
        }
    },

    changeZToBottom({ commit, state }, { index }) {
        if (state.componentList[index].zIndex === 1) {
            return
        }

        commit('CHANGE_ZINDEX', { index, zIndex: 1 });

        for (let i = 0, l = state.componentList.length; i < l; i++) {
            if (i !== index) {
                if (state.componentList[i].zIndex === state.componentList.length) {
                    continue
                }
                commit('CHANGE_ZINDEX', { index: i, zIndex: state.componentList[i].zIndex + 1 });
            }
        }
    },

    changeZToTop({ commit, state }, { index }) {
        if (state.componentList[index].zIndex === state.componentList.length) {
            return
        }
        commit('CHANGE_ZINDEX', { index, zIndex: state.componentList.length });

        for (let i = 0, l = state.componentList.length; i < l; i++) {
            if (i !== index) {
                if (state.componentList[i].zIndex === 1) {
                    continue
                }
                commit('CHANGE_ZINDEX', { index: i, zIndex: state.componentList[i].zIndex - 1 });
            }
        }
    },

    setMinWidth({ commit }, { index, width }) {
        commit('CHANGE_MINW', { index, minw: width });
    },

    setMinHeight({ commit }, { index, height }) {
        commit('CHANGE_MINH', { index, minh: height });
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
