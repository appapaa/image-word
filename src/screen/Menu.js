import React, { Component } from 'react';
import { Screen, Btn, Image } from 'components/Base';
import { connect } from "react-redux";
import { navigationPush } from 'redux/navigation';
import _ from 'lodash';
import Help from 'components/Help';

class Plugin extends Component {
  _helpBottom = null;
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
  componentDidMount() {
    this._helpBottom = `calc(${Math.ceil(this._help.offsetHeight)}px + 5vw + 2vh)`;
  }
  _getRefHelp = (div) => {
    this._help = div;
  }
  render() {
    const { isShowhelp } = this.state;
    const { cnt } = this.props;
    return (
      <Screen className="app-menu">
        <div className='app-cnt'>слов к обучению: {cnt}</div>
        <Image className='app-menu-img' src='/menu.png' />
        <div className='app-menu-btngroup'>
          {_.map(BTNS, this.renderBtn)}
          <Btn
            getRef={this._getRefHelp}
            active={isShowhelp}
            className='app-menu-btn'
            onClick={this._showHelp}
          >help</Btn>
        </div>
        {isShowhelp ? <Help bottom={this._helpBottom} /> : ''}
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

const mapState = ({ words: { listByWord, studyByWord } }) => ({
  studyByWord,
  cnt: _.size(listByWord) - _.size(studyByWord) || 'нет'
});
const mapDispatch = { navigationPush };

export default connect(mapState, mapDispatch)(Plugin);
