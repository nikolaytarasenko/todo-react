import React from 'react';
import './Modal.css';

const Modal = props => {
    const activeClass = props.display ? 'modal modal__show' : 'modal modal__hide';

    return (
        <div className={activeClass}>
            <div className="modal__body">
                <h3 className="modal__title">New task name:</h3>
                <input type="text" className="modal__input" onChange={props.onModalTextChange} value={props.editedText}/>
                <input type="time" className="modal__input" onChange={props.onModalTimeChange} value={props.editedTime}/>
                <button onClick={props.edit} className="modal__button">edit</button>
            </div>
        </div>
    )
};

export default Modal;