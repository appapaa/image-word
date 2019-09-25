import React, { Component } from 'react';
import { Screen, Panel, Content, Btn, Image, Footer } from 'components/Base';
import { connect } from "react-redux";
import { navigationGoHome } from 'redux/navigation';
import { next } from 'redux/words';
import _ from 'lodash';

class Plugin extends Component {
  state = {
    list: [],
    answers: [],
    answersInverse: [],
    selects: [],
    firstTranslation: null,
    listInvers: [],
    cnt: null,
    inverse: false,
    answered: false
  }
  componentDidMount() {
    const { listByWord, word, data } = this.props;
    let list = [];
    let listInvers = [];
    let firstTranslation = data.translation[0].word;
    _.forEach(_.sortBy(listByWord, () => Math.random()).slice(0, 20), (l) => {
      if (l.word === word) {
        return;
      }
      list = list.concat(_.map(l.translation, 'word'));
      listInvers = listInvers.concat([l.word]);
    });
    list = _.sortBy(_.union(
      _.map(data.translation, 'word'),
      list
    ).slice(0, 8), () => Math.random());

    listInvers = _.sortBy(_.union(
      [word],
      listInvers
    ).slice(0, 8), () => Math.random());

    const answersInverse = _.filter(listInvers, (key) =>
      !!_.find(listByWord[key].translation, l => l.word === firstTranslation));
    debugger
    this.setState({
      list,
      listInvers,
      firstTranslation,
      answers: _.intersection(_.map(data.translation, 'word'), list),
      answersInverse
    });
  }
  _onInverse = () => {
    const { inverse, answered } = this.state;

    !answered && this.setState({
      inverse: !inverse,
      selects: []
    });
  }
  _changeSelects = (text) => {
    const { selects, answered } = this.state;

    !answered && this.setState({
      selects: _.includes(selects, text)
        ? _.without(selects, text)
        : _.union(selects, [text])
    });
  }
  _onAnswer = () => {
    const { answered,
      answersInverse, answers, inverse, selects } = this.state;
    if (answered) {
      return;
    }
    const _answers = inverse ? answersInverse : answers;

    this.setState({
      answered: true,
      cnt: _.size(selects) > _.size(_answers)
        ? _.size(_.difference(selects, _answers))
        : _.size(_.difference(_answers, selects))
    });
  }
  _next = () => {
    const { navigationGoHome } = this.props;
    navigationGoHome();
  }
  render() {
    const { list, listInvers, firstTranslation, answered, cnt,
      answersInverse, answers, inverse, selects } = this.state;
    const { navigationGoHome, data = {}, next } = this.props;
    const { word, examples, similar, link, translation } = data;
    const _list = inverse ? listInvers : list;
    const _answers = inverse ? answersInverse : answers;
    const _listL = _list.slice(0, 4);
    const _listR = _list.slice(4);

    return (
      <Screen className="app-test">
        <Panel className="app-test-panel">
          <Btn
            className='app-nav-btn'
            onClick={navigationGoHome}>home</Btn>
          <div className='app-line-black' />
          <Btn
            active={inverse}
            className='app-nav-btn'
            onClick={this._onInverse}>inverse</Btn>
        </Panel>
        <div className='app-test-content'>
          <div className='app-test-list'>
            {_.map([0, 1], (i) => <div
              key={'list-' + i}
              className={'app-test-list-' + (i ? 'right' : 'left')}
            >
              {_.map(i ? _listR : _listL, (text) =>
                <Btn
                  active={_.includes(answered ? _answers : selects, text)}
                  onClick={() => this._changeSelects(text)}
                  key={text}
                  className='app-test-text_btn'
                >{text}</Btn>)}
            </div>)}
          </div>
          <div className='app-test-word'>
            {inverse
              ? firstTranslation
              : word + ' ' + (_.size(similar) ? ' / ' + similar.join(', ') : '')}
          </div>
          <div className='app-test-info'>
            {answered
              ? cnt === 0
                ? 'correct'
                : (
                  _.size(_.difference(_answers, selects)) === _.size(_answers)
                    ? 'all'
                    : cnt
                ) + ' incorrect'
              : _.size(_answers) > 1
                ? 'Several options'
                : 'One option'
            }
          </div>
        </div>
        <div className='app-test-footer' >
          <Btn
            active={answered}
            onClick={this._onAnswer}
            className='app-test-btn'>answer</Btn>
          <div className='app-line-black' />
          <Btn
            onClick={this._next}
            className='app-test-btn'>next</Btn>
        </div>
      </Screen>
    );
  }
}
Plugin.defaultName = 'TestScreen';

const styles = {
  btnLeft: {
    borderRight: '2px solid #000'
  },
}

const mapState = ({ words: { listByWord, studyByWord } }, { word }) => ({
  data: listByWord[word],
  listByWord, studyByWord
});
const mapDispatch = { navigationGoHome, next };

export default connect(mapState, mapDispatch)(Plugin);
