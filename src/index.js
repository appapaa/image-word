import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/index.scss';
import { Provider } from 'react-redux';
import reducers from 'redux/reducers';
import App from 'App';
import configureStore from 'lib/configureStore';

const store = configureStore(reducers)
const startApp = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
        , document.getElementById('root'));
};
if (window.cordova) {
    document.addEventListener('deviceready', startApp, false);
} else {
    startApp();
}