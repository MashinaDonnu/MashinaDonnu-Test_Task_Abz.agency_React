import React, {useContext} from 'react';
import './Modal.scss'
import {ModalContext} from "../../context/modal/ModalContext";

export const Modal = () => {
    const {state, hide} = useContext(ModalContext)
    if (!state.visible) {
        return null
    }
    return (
        <div className="window-modal" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="close" onClick={hide} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{state.text}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn" onClick={hide}>Great</button>
                    </div>
                </div>
            </div>
         </div>
    )
}
