const ENABLE_ACTIVE = 'ENABLE_ACTIVE';
const DISABLE_ACTIVE = 'DISABLE_ACTIVE';
const ENABLE_DRAGGABLE = 'ENABLE_DRAGGABLE';
const DISABLE_DRAGGABLE = 'DISABLE_DRAGGABLE';
const ENABLE_RESIZABLE = 'ENABLE_RESIZABLE';
const DISABLE_RESIZABLE = 'DISABLE_RESIZABLE';
const ENABLE_PARENT_LIMITATION = 'ENABLE_PARENT_LIMITATION';
const DISABLE_PARENT_LIMITATION = 'DISABLE_PARENT_LIMITATION';
const ENABLE_SNAP_TO_GRID = 'ENABLE_SNAP_TO_GRID';
const DISABLE_SNAP_TO_GRID = 'DISABLE_SNAP_TO_GRID';
const ENABLE_ASPECT = 'ENABLE_ASPECT';
const DISABLE_ASPECT = 'DISABLE_ASPECT';
const ENABLE_X_AXIS = 'ENABLE_X_AXIS';
const ENABLE_Y_AXIS = 'ENABLE_Y_AXIS';
const ENABLE_BOTH_AXIS = 'ENABLE_BOTH_AXIS';
const ENABLE_NONE_AXIS = 'ENABLE_NONE_AXIS';
const CHANGE_ZINDEX = 'CHANGE_ZINDEX';
const CHANGE_MINW = 'CHANGE_MINW';
const CHANGE_MINH = 'CHANGE_MINH';
const CHANGE_WIDTH = 'CHANGE_WIDTH';
const CHANGE_HEIGHT = 'CHANGE_HEIGHT';
const CHANGE_TOP = 'CHANGE_TOP';
const CHANGE_LEFT = 'CHANGE_LEFT';

const state = {
    'rects': [
        {
            'width': 200,
            'height': 150,
            'top': 10,
            'left': 10,
            'draggable': true,
            'resizable': true,
            'minw': 10,
            'minh': 10,
            'axis': 'both',
            'parentLim': true,
            'snapToGrid': false,
            'aspectRatio': false,
            'zIndex': 1,
            'color': '#EF9A9A',
            'active': false,
            'class': 'red'
        },
        {
            'width': 200,
            'height': 150,
            'top': 170,
            'left': 220,
            'draggable': true,
            'resizable': true,
            'minw': 10,
            'minh': 10,
            'axis': 'both',
            'parentLim': true,
            'snapToGrid': false,
            'aspectRatio': false,
            'zIndex': 1,
            'color': '#E6C27A',
            'active': false,
            'class': 'box-shaddow'
        },
        {
            'width': 200,
            'height': 150,
            'top': 10,
            'left': 220,
            'draggable': true,
            'resizable': true,
            'minw': 10,
            'minh': 10,
            'axis': 'both',
            'parentLim': true,
            'snapToGrid': false,
            'aspectRatio': false,
            'zIndex': 2,
            'color': '#AED581',
            'active': false,
            'class':'yellow'
        },
        
    ]
}

const mutations = {
    [ENABLE_ACTIVE](state, id) {
        state.rects[id].active = true;
    },
    [DISABLE_ACTIVE](state, id) {
        state.rects[id].active = false;
    },

    [ENABLE_ASPECT](state, id) {
        state.rects[id].aspectRatio = true;
    },
    [DISABLE_ASPECT](state, id) {
        state.rects[id].aspectRatio = false;
    },

    [ENABLE_DRAGGABLE](state, id) {
        state.rects[id].draggable = true;
    },
    [DISABLE_DRAGGABLE](state, id) {
        state.rects[id].draggable = false;
    },

    [ENABLE_RESIZABLE](state, id) {
        state.rects[id].resizable = true;
    },
    [DISABLE_RESIZABLE](state, id) {
        state.rects[id].resizable = false;
    },

    [ENABLE_SNAP_TO_GRID](state, id) {
        state.rects[id].snapToGrid = true;
    },
    [DISABLE_SNAP_TO_GRID](state, id) {
        state.rects[id].snapToGrid = false;
    },

    [ENABLE_BOTH_AXIS](state, id) {
        state.rects[id].axis = 'both';
    },
    [ENABLE_NONE_AXIS](state, id) {
        state.rects[id].axis = 'none';
    },
    [ENABLE_X_AXIS](state, id) {
        state.rects[id].axis = 'x';
    },
    [ENABLE_Y_AXIS](state, id) {
        state.rects[id].axis = 'y';
    },

    [ENABLE_PARENT_LIMITATION](state, id) {
        state.rects[id].parentLim = true;
    },
    [DISABLE_PARENT_LIMITATION](state, id) {
        state.rects[id].parentLim = false;
    },

    [CHANGE_ZINDEX](state, payload) {
        state.rects[payload.id].zIndex = payload.zIndex;
    },

    [CHANGE_HEIGHT](state, payload) {
        state.rects[payload.id].height = payload.height;
    },

    [CHANGE_WIDTH](state, payload) {
        state.rects[payload.id].width = payload.width;
    },

    [CHANGE_TOP](state, payload) {
        state.rects[payload.id].top = payload.top;
    },

    [CHANGE_LEFT](state, payload) {
        state.rects[payload.id].left = payload.left;
    },

    [CHANGE_MINH](state, payload) {

        state.rects[payload.id].minh = payload.minh;
    },

    [CHANGE_MINW](state, payload) {
        state.rects[payload.id].minw = payload.minw;
    }
}

const actions = {
    setActive({ commit, state }, { id }) {
        for (let i = 0, l = state.rects.length; i < l; i++) {
            if (i === id) {
                commit(ENABLE_ACTIVE, i);
                continue;
            }

            commit(DISABLE_ACTIVE, i);
        }
    },
    unsetActive({ commit }, { id }) {
        commit(DISABLE_ACTIVE, id);
    },

    toggleDraggable({ commit, state }, { id }) {
        if (!state.rects[id].draggable) {
            commit(ENABLE_DRAGGABLE, id);
        } else {
            commit(DISABLE_DRAGGABLE, id);
        }
    },

    toggleResizable({ commit, state }, { id }) {
        if (!state.rects[id].resizable) {
            commit(ENABLE_RESIZABLE, id);
        } else {
            commit(DISABLE_RESIZABLE, id);
        }
    },

    toggleParentLimitation({ commit, state }, { id }) {
        if (!state.rects[id].parentLim) {
            commit(ENABLE_PARENT_LIMITATION, id);
        } else {
            commit(DISABLE_PARENT_LIMITATION, id);
        }
    },

    toggleSnapToGrid({ commit, state }, { id }) {
        if (!state.rects[id].snapToGrid) {
            commit(ENABLE_SNAP_TO_GRID, id);
        } else {
            commit(DISABLE_SNAP_TO_GRID, id);
        }
    },

    setAspect({ commit }, { id }) {
        commit(ENABLE_ASPECT, id);
    },
    unsetAspect({ commit }, { id }) {
        commit(DISABLE_ASPECT, id);
    },

    setWidth({ commit }, { id, width }) {
        commit(CHANGE_WIDTH, { id, width });
    },

    setHeight({ commit }, { id, height }) {
        commit(CHANGE_HEIGHT, { id, height });
    },

    setTop({ commit }, { id, top }) {
        commit(CHANGE_TOP, { id, top });
    },

    setLeft({ commit }, { id, left }) {
        commit(CHANGE_LEFT, { id, left });
    },

    changeXLock({ commit, state }, { id }) {
        switch (state.rects[id].axis) {
            case 'both':
                commit(ENABLE_Y_AXIS, id);
                break;
            case 'x':
                commit(ENABLE_NONE_AXIS, id);
                break;
            case 'y':
                commit(ENABLE_BOTH_AXIS, id);
                break;
            case 'none':
                commit(ENABLE_X_AXIS, id);
                break;
        }
    },

    changeYLock({ commit, state }, { id }) {
        switch (state.rects[id].axis) {
            case 'both':
                commit(ENABLE_X_AXIS, id);
                break;
            case 'x':
                commit(ENABLE_BOTH_AXIS, id);
                break;
            case 'y':
                commit(ENABLE_NONE_AXIS, id);
                break;
            case 'none':
                commit(ENABLE_Y_AXIS, id);
                break;
        }
    },

    changeZToBottom({ commit, state }, { id }) {
        if (state.rects[id].zIndex === 1) {
            return
        }

        commit(CHANGE_ZINDEX, { id, zIndex: 1 });

        for (let i = 0, l = state.rects.length; i < l; i++) {
            if (i !== id) {
                if (state.rects[i].zIndex === state.rects.length) {
                    continue
                }
                commit(CHANGE_ZINDEX, { id: i, zIndex: state.rects[i].zIndex + 1 });
            }
        }
    },

    changeZToTop({ commit, state }, { id }) {
        if (state.rects[id].zIndex === state.rects.length) {
            return
        }

        commit(CHANGE_ZINDEX, { id, zIndex: state.rects.length });

        for (let i = 0, l = state.rects.length; i < l; i++) {
            if (i !== id) {
                if (state.rects[i].zIndex === 1) {
                    continue
                }
                commit(CHANGE_ZINDEX, { id: i, zIndex: state.rects[i].zIndex - 1 });
            }
        }
    },

    setMinWidth({ commit }, { id, width }) {
        commit(CHANGE_MINW, { id, minw: width });
    },

    setMinHeight({ commit }, { id, height }) {
        commit(CHANGE_MINH, { id, minh: height });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
