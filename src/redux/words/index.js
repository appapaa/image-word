import getReducer from 'lib/getReducer';
import _ from 'lodash';
import { navigationPush } from 'redux/navigation';
import { navigationGoHome } from 'redux/navigation/index';
import getLocalStore from 'lib/getLocalStore';
import setLocalStore from 'lib/setLocalStore';
export const PREFIX_ = 'WORDS_'

const __listByWord = getLocalStore('words:list') || {};
const initialState = {
    listByWord: __listByWord,
    studyByWord: getLocalStore('words:stydy') || {},
    wordsByChar: _.groupBy(_.keys(__listByWord), (word) => word[0].toUpperCase()),
    nextWord: getLocalStore('words:next'),
    turn: getLocalStore('words:turn'),
    step: +(getLocalStore('words:step') || 0)
};
export const reducer = getReducer(PREFIX_, initialState);

export const getWords = () => (dispatch, getState, { ajax }) => {
    const { words: { nextWord } } = getState();
    ajax('words').then(({ data }) => {
        const words = _.keyBy(data, 'word');
        const keys = _.keys(words);
        if (_.size(words)) {
            setLocalStore('words:list', words);
            dispatch({
                type: PREFIX_ + 'GET',
                payload: {
                    listByWord: words,
                    wordsByChar: _.groupBy(keys, (word) => word[0].toUpperCase()),
                    nextWord: nextWord || data[0].word
                }
            });
            dispatch(getTurn());
        }
    })
}
export const getTurn = () => (dispatch, getState) => {
    const { words: { nextWord, listByWord, studyByWord } } = getState();
    let k = 0;
    const list = [];
    _.forEach(listByWord, (l, word) => {
        if (word === nextWord) {
            return k = 1;
        }
        !studyByWord[word]
            && list.push({
                word,
                index: k || Math.round(Math.random() * 3000) / 100
            });
        if (k) {
            k++;
        }
    })
    const turn = _.map(_.sortBy(list, 'index'), 'word');

    setLocalStore('words:turn', turn);

    dispatch({
        type: PREFIX_ + 'TURN',
        payload: {
            turn
        }
    });

}
export const changeStudy = (words, studied = false) => (dispatch, getState) => {
    const { words: { studyByWord } } = getState();
    const _studyByWord = _.clone(studyByWord);
    _.map(words, (word) => {
        if (!_studyByWord[word] !== !studied) {
            if (studied) {
                _studyByWord[word] = 1;
            }
            else {
                delete _studyByWord[word];
            }
        }
    });

    setLocalStore('words:stydy', _studyByWord);

    dispatch({
        type: PREFIX_ + 'CHANGE_STUDY',
        payload: {
            studyByWord: _studyByWord,
        }
    })
    dispatch(getTurn());
}
export const next = (studied = false) => (dispatch, getState) => {
    const { words: { nextWord, listByWord, turn, step } } = getState();

    dispatch(changeStudy([nextWord], studied));

    if (!_.size(turn) && studied) {
        dispatch(navigationGoHome());
        return alert('Слова закончились, уходи');
    };
    setLocalStore('words:next', _.first(turn));
    setLocalStore('words:step', step + 1);
    dispatch({
        type: PREFIX_ + 'NEXT',
        payload: {
            nextWord: _.first(turn),
            step: step + 1
        }
    })
    dispatch(getTurn());
    dispatch(navigationPush('Learn', { word: _.first(turn) }));
}
