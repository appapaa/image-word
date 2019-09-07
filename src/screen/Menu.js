import React, { Component } from 'react';
import { Screen, Btn, Image } from 'components/Base';
import { connect } from "react-redux";
import { navigationPush } from 'redux/navigation';
import _ from 'lodash';

class Plugin extends Component {
  renderBtn = ({ id, text }) => {
    const { navigationPush, nextWord } = this.props;
    return <Btn
      className='app-menu-btn'
      key={id}
      onClick={() => navigationPush(id, { word: nextWord })}
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

const mapState = ({ words: { nextWord } }) => ({
  nextWord
});
const mapDispatch = { navigationPush };

export default connect(mapState, mapDispatch)(Plugin);
