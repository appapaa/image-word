import React, { Component } from 'react';
import { Screen, Btn, Image } from 'components/Base';
import { connect } from "react-redux";
import { navigationPush } from 'redux/navigation';
import _ from 'lodash';
import Help from 'components/Help';

class Plugin extends Component {
  state = {
    isShowhelp: false
  }
  _onClick = ({ id, text }) => {
    const { navigationPush } = this.props;
    navigationPush(id);
  }
  _showHelp = () => {
    const { isShowhelp } = this.state;
    this.setState({ isShowhelp: !isShowhelp })
  }
  renderBtn = ({ id, text }) => {
    return <Btn
      className='app-menu-btn'
      key={id}
      onClick={() => this._onClick({ id, text })}
    >{text}</Btn>
  };

  render() {
    const { isShowhelp } = this.state;
    return (
      <Screen className="app-menu">
        <Image className='app-menu-img' src='/menu.png' />
        <div className='app-menu-btngroup'>
          {_.map(BTNS, this.renderBtn)}
          <Btn
            active={isShowhelp}
            className='app-menu-btn'
            onClick={this._showHelp}
          >help</Btn>
        </div>
        {isShowhelp ? <Help /> : ''}
      </Screen>
    );
  }
}
const BTNS = [
  { id: 'Test', text: 'test' },
  { id: 'Learn', text: 'learn' },
  { id: 'Exclude', text: 'exclude' }
];
Plugin.defaultName = 'MenuScreen';

const mapState = ({ words: { studyByWord } }) => ({
  studyByWord
});
const mapDispatch = { navigationPush };

export default connect(mapState, mapDispatch)(Plugin);
