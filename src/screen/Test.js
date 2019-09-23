import React, { Component } from 'react';
import { Screen, Panel, Content, Btn, Image, Footer } from 'components/Base';
import { connect } from "react-redux";
import { navigationGoHome } from 'redux/navigation';
import { next } from 'redux/words';
import _ from 'lodash';

class Plugin extends Component {
  state = {
    list: {
    }
  }
  componentDidMount() {
    const { listByWord, word } = this.props;
    let list = [];
    _.forEach(listByWord, (l, key) => {
      if (word === key) {
        return;
      }
      list = _.union(list, _.map(l.translation, 'word'));
    });
    list = _.uniq(_.union(
      _.map(word.translation, 'word'),
      _.sortBy(list, () => Math.random())
    )).slice(0, 8);
    list = _.sortBy(list, () => Math.random());
    // const list 
    this.setState({ list });
  }
  render() {
    const { list } = this.state;
    const { navigationGoHome, data = {}, next } = this.props;
    const { word, examples, similar, link, translation } = data;
    return (
      <Screen className="app-test">
        <Panel className="app-test-panel">
          <Btn
            className='app-nav-btn'
            onClick={navigationGoHome}>home</Btn>
        </Panel>
        <div className='app-test-content'>
          <div className='app-test-list'>
            {
              _.map(list, (text) =>
                <Btn
                  key={text}
                  className='app-test-text_btn'
                >{text}</Btn>)
            }
          </div>
          <div className='app-test-word'>
            {word}
            {_.size(similar) ? ' / ' + similar.join(', ') : ''}
          </div>
        </div>
        <div className='app-test-footer' >
          <Btn
            className='app-test-btn'>answer</Btn>
          <Btn
            className='app-test-btn'
            active>next</Btn>
        </div>
      </Screen>
    );
  }
}
Plugin.defaultName = 'TestScreen';

const mapState = ({ words: { listByWord } }, { word }) => ({
  data: listByWord[word],
  listByWord: listByWord
});
const mapDispatch = { navigationGoHome, next };

export default connect(mapState, mapDispatch)(Plugin);
