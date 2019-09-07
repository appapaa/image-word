import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import axios from 'axios';
import { prefixAjax } from 'assets/const';

const _stores = { store: {} };
const ajax = (name) => axios({
    method: 'get',
    url: prefixAjax + 'get.php?name=' + name,
    responseType: 'json',
}).then(({ request }) => request.response);

export default (reducers) => {

    const middleware = [thunk.withExtraArgument({ ajax })];
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    if (process.env.NODE_ENV !== 'production') middleware.push(createLogger());
    _stores.store = createStore(
        reducers,
        composeEnhancer(applyMiddleware(...middleware))
    );
    return _stores.store;
}