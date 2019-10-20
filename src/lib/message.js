import React from 'react';
import ReactDOM from 'react-dom';
const close = () => {
    ReactDOM.render(
        ''
        , document.getElementById('alert_window'));
}
const message = (title, description) => {

    ReactDOM.render(
        <div onClick={close} className='app-message_container'>
            <div onClick={close} className='app-message'>
                <div className='app-message-header'>Oops!</div>
                <div className='app-message-body'>
                    <div className='app-message-title'>{title}</div>
                    <div className='app-message-description'>{description}</div>
                </div>
            </div>
        </div>
        , document.getElementById('alert_window'));
};
export default message;