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
    wordsByChar: _.groupBy(_.keys(__listByWord), (word) => word[0].toUpperCase()),
    studyByWord: getLocalStore('words:stydy') || {},
    testByWord: getLocalStore('words:test') || {},
    turn: getLocalStore('words:turn') || [],
    turnTest: getLocalStore('words:turnTest') || [],
    inverse: getLocalStore('words:inverse') || false,
    step: +(getLocalStore('words:step') || 0)
};
export const reducer = getReducer(PREFIX_, initialState);

export const getWords = () => (dispatch, getState, { ajax }) => {
    ajax('words').then(({ data }) => {
        const words = _.keyBy(data, 'word');
        const keys = _.keys(words);
        if (_.size(words)) {
            setLocalStore('words:list', words);
            dispatch({
                type: PREFIX_ + 'GET',
                payload: {
                    listByWord: words,
                    wordsByChar: _.groupBy(keys, (word) => word[0].toUpperCase())
                }
            });
            dispatch(getTurn());
        }
    })
}
export const getTurn = () => (dispatch, getState) => {
    const { words: { turn, listByWord, studyByWord } } = getState();
    let k = 0;
    const list = [];
    const nextWord = turn[0];
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
    const _turn = _.map(_.sortBy(list, 'index'), 'word');

    setLocalStore('words:turn', _turn);

    dispatch({
        type: PREFIX_ + 'TURN',
        payload: {
            turn: _turn
        }
    });
    dispatch(getTurnTest());

}
export const getTurnTest = () => (dispatch, getState) => {
    const { words: { turnTest, testByWord, studyByWord } } = getState();
    const list = [];
    const nextWord = turnTest[0];
    _.forEach(studyByWord, (v, word) => {
        if (word === nextWord) {
            return
        }
        !testByWord[word]
            && list.push({
                word,
                index: Math.round(Math.random() * 3000) / 100
            });
    })
    let _turnTest = _.map(_.sortBy(list, 'index'), 'word');

    if (nextWord && testByWord[nextWord]) {
        _turnTest = _.union([nextWord], _turnTest);
    }

    setLocalStore('words:turnTest', _turnTest);

    dispatch({
        type: PREFIX_ + 'TURN_TEST',
        payload: {
            turnTest: _turnTest
        }
    });

}
export const changeTest = (word, studied = false) => (dispatch, getState) => {
    const { words: { studyByWord, testByWord } } = getState();
    let _testByWord = _.clone(testByWord);
    if (studied) {
        _testByWord[word] = 1;
        if (_.size(_testByWord) === _.size(studyByWord)) {
            _testByWord = {};
        }
        setLocalStore('words:test', _testByWord);
        dispatch({
            type: PREFIX_ + 'TURN_TEST',
            payload: {
                testByWord: _testByWord
            }
        });
        dispatch(getTurnTest());
    }
    else {
        dispatch(changeStudy([word]));
    }

}
export const changeStudy = (words, studied = false) => (dispatch, getState) => {
    const { words: { studyByWord, testByWord } } = getState();
    const _studyByWord = _.clone(studyByWord);
    let _testByWord = _.clone(testByWord);
    _.map(words, (word) => {
        if (!_studyByWord[word] !== !studied) {
            if (studied) {
                _studyByWord[word] = 1;
            }
            else {
                delete _studyByWord[word];
                delete _testByWord[word];
            }
        }
    });
    if (_.size(_testByWord) === _.size(_studyByWord)) {
        _testByWord = {};
    }
    setLocalStore('words:stydy', _studyByWord);
    setLocalStore('words:test', _testByWord);

    dispatch({
        type: PREFIX_ + 'CHANGE_STUDY',
        payload: {
            studyByWord: _studyByWord,
            testByWord: _testByWord,
        }
    })
    dispatch(getTurn());
}
export const onInverse = () => (dispatch, getState) => {
    const { words: { inverse } } = getState();
    setLocalStore('words:inverse', !inverse);
    dispatch({
        type: PREFIX_ + 'INVERSE',
        payload: {
            inverse: !inverse,
        }
    })
}
export const next = (studied = false) => (dispatch, getState) => {
    const { words: { turn, step } } = getState();
    const nextWord = turn[0];
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
            step: step + 1
        }
    })
    dispatch(getTurn());
    dispatch(navigationPush('Learn', { word: _.first(turn) }));
}
