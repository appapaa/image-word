import { combineReducers } from 'redux';
import { reducer as words } from './words';
import { reducer as navigation } from './navigation';

export default combineReducers({
    navigation,
    words
});