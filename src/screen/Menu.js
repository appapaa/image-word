import React, { Component } from 'react';
import { Screen, Btn, Image } from 'components/Base';
import { connect } from "react-redux";
import { navigationPush } from 'redux/navigation';
import _ from 'lodash';

class Plugin extends Component {
  _onClick = ({ id, text }) => {
    const { navigationPush, nextWord, studyByWord } = this.props;
    if (id === 'Test') {
      if (_.size(studyByWord)) {
        const list = _.sortBy(_.keys(studyByWord), () => Math.random());
        navigationPush(id, { word: list[0] });
      }
      else {
        alert('Нет слов');
      }

    }
    else {
      navigationPush(id, { word: nextWord });
    }
  }
  renderBtn = ({ id, text }) => {
    const { navigationPush, nextWord } = this.props;
    return <Btn
      className='app-menu-btn'
      key={id}
      onClick={() => this._onClick({ id, text })}
    >{text}</Btn>
  };

  render() {
    return (
      <Screen className="app-menu">
        <Image className='app-menu-img' src='/menu.png' />
        <div className='app-menu-btngroup'>
          {_.map(BTNS, this.renderBtn)}
        </div>
      </Screen>
    );
  }
}
const BTNS = [
  { id: 'Test', text: 'test' },
  { id: 'Learn', text: 'learn' },
  { id: 'Exclude', text: 'exclude' },
  { id: '__', text: 'text' },
];
Plugin.defaultName = 'MenuScreen';

const mapState = ({ words: { nextWord, studyByWord } }) => ({
  nextWord, studyByWord
});
const mapDispatch = { navigationPush };

export default connect(mapState, mapDispatch)(Plugin);
