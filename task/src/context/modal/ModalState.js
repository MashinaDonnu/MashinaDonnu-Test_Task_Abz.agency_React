import React, {useReducer} from 'react'
import {ModalContext} from "./ModalContext";
import {modalReducer} from "./modalReducer";
import {HIDE_MODAL, SHOW_MODAL} from "./actionTypes";

export const ModalState = ({children}) => {
    const initialState = {
        visible: false,
        text: '',
    }
    const [state, dispatch] = useReducer(modalReducer, initialState)
    const show = text => {
        return dispatch({type: SHOW_MODAL, payload: text})
    }
    const hide = () => {
        return dispatch({type: HIDE_MODAL})
    }
    return (
        <ModalContext.Provider value={{state, show, hide}}>
            {children}
        </ModalContext.Provider>
    )
}