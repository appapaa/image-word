import getReducer from 'lib/getReducer'
export const PREFIX_ = 'NAVIGATION_'

const initialState = {
    path: []
    // path: [{ id: 'Exclude', params: { word: 'burst' } }]
};
export const reducer = getReducer(PREFIX_, initialState);


export const onHashChange = () => (dispatch, getState) => {
    const { navigation: { path } } = getState();
    const id = (window.location.hash || '').replace('#', '');
    dispatch({
        type: PREFIX_ + 'ON_HASH_CHANGE',
        payload: {
            path: path.concat(id)
        }
    })
}
export const navigationGoBack = () => (dispatch, getState) => {
    window.history.back();
};

export const navigationGoHome = () => (dispatch) => {
    window.location.hash = 'Menu';
}


export const navigationSet = (id) => (dispatch, getState) => {
    window.location.hash = id
}

export const navigationPush = (id) => (dispatch, getState) => {
    window.location.hash = id;

};
