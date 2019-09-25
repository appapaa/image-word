import getReducer from 'lib/getReducer'
import _ from 'lodash'
export const PREFIX_ = 'NAVIGATION_'

const initialState = {
    path: [{ id: 'Menu' }]
    // path: [{ id: 'Exclude', params: { word: 'burst' } }]
};
export const reducer = getReducer(PREFIX_, initialState);


export const onHashChange = () => (dispatch, getState) => {
    // navigationGoBack
}
export const navigationGoBack = () => (dispatch, getState) => {
    window.history.back();
    const { navigation: { path } } = getState();
    dispatch({
        type: PREFIX_ + 'GOBACK',
        payload: {
            path: path.slice(0, -1)
        }
    })
};

export const navigationGoHome = () => (dispatch) => {
    dispatch(navigationSet('Menu'))
}


export const navigationSet = (id, params) => (dispatch, getState) => {
    dispatch({
        type: PREFIX_ + 'SET',
        payload: {
            path: [{ id, params }]
        }
    })
}

export const navigationPush = (id, params) => (dispatch, getState) => {
    window.location.hash = id;
    const { navigation: { path } } = getState();
    dispatch({
        type: PREFIX_ + 'PUSH',
        payload: {
            path: _.union(path, [{ id, params }])
        }
    })
};