import _ from 'lodash';
const getReducer = (PREFIX_, initialState) => {
    return (state = initialState, action) => {
        if (!action.type.indexOf(PREFIX_)) {
            return _.extend({}, state, action.payload)
        }
        return state
    }
};
export default getReducer;