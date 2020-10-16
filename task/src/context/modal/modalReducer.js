import {HIDE_MODAL, SHOW_MODAL} from "./actionTypes";

export const modalReducer = (state, action) => {
    switch (action.type) {
        case SHOW_MODAL: return {...state, visible: true, text: action.payload}
        case HIDE_MODAL: return {...state, visible: false}
        default: return state
    }
}