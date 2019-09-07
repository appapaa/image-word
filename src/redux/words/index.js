import getReducer from 'lib/getReducer';
import _ from 'lodash';
import { navigationPush } from 'redux/navigation';
import { navigationGoHome } from 'redux/navigation/index';
import getLocalStore from 'lib/getLocalStore';
export const PREFIX_ = 'WORDS_'

const initialState = {
    listByWord: [],
    wordsByChar: {},
    nextWord: '',
    turn: []
};
export const reducer = getReducer(PREFIX_, initialState);

export const getWords = () => (dispatch, getState, { ajax }) => {
    ajax('words').then(({ data }) => {
        const words = _.keyBy(data, 'word');
        const keys = _.keys(words);
        dispatch({
            type: PREFIX_ + 'GET',
            payload: {
                listByWord: words,
                wordsByChar: _.groupBy(keys, (word) => word[0].toUpperCase()),
                turn: keys,
                nextWord: data[0].word
            }
        });
    })
}
export const changeStudy = (words, studied = false) => (dispatch, getState) => {
    const { words: { listByWord } } = getState();
    const _listByWord = _.clone(listByWord);
    _.map(words, (word) => {
        if (_listByWord[word].studied !== studied) {
            _listByWord[word] = _.extend({}, _listByWord[word], { studied });
        }
    });
    dispatch({
        type: PREFIX_ + 'CHANGE_STUDY',
        payload: {
            listByWord: _listByWord,
        }
    })
}
export const next = (studied = false) => (dispatch, getState) => {
    const { words: { nextWord, listByWord, turn } } = getState();
    const _listByWord = _.clone(listByWord);
    _listByWord[nextWord] = _.extend({}, _listByWord[nextWord], { studied });
    if (!_.size(turn) && studied) {
        dispatch({
            type: PREFIX_ + 'NEXT',
            payload: {
                listByWord: _listByWord,
            }
        })
        dispatch(navigationGoHome());
        return alert('Слова закончились, уходи');
    }
    dispatch({
        type: PREFIX_ + 'NEXT',
        payload: {
            listByWord: _listByWord,
            nextWord: _.first(turn),
            turn: turn.slice(1)
        }
    })
    dispatch(navigationPush('Learn', { word: _.first(turn) }));
}
