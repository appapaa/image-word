import React, { Component, PureComponent } from 'react';
import { Screen, Panel, Btn, Footer } from 'components/Base';
import { connect } from "react-redux";
import { navigationGoHome } from 'redux/navigation';
import { changeStudy } from 'redux/words';
import _ from 'lodash';
import ListItem from 'components/Exclude/ListItem';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
class Plugin extends Component {
  state = {
    char: 'A'
  }
  _goToChar = (char) => this.setState({ char });

  _goToPrevChar = (char) => this.setState({
    char: CHARS[CHARS.indexOf(char) - 1]
  });

  _goToNextChar = (char) => this.setState({
    char: CHARS[CHARS.indexOf(char) + 1]
  });

  render() {
    const { navigationGoHome, groups = {}, changeStudy } = this.props;
    const { char } = this.state;
    const list = groups[char];
    return (
      <Screen className="app-exclude">
        <Panel className="app-exclude-panel">
          <Btn
            className='app-nav-btn'
            onClick={navigationGoHome}>home</Btn>
        </Panel>
        <div className='app-exclude-content-left'>
          {_.map(CHARS, ch => <Btn
            onClick={() => this._goToChar(ch)}
            className='app-exclude-btn-char'
            active={char === ch}
            key={ch}
          >{ch}</Btn>)}
        </div>
        <div className='app-exclude-content'>
          <div className='app-exclude-content__list app-ui-scroll'>
            {char !== 'A' && <Btn
              className='app-exclude-list-item'
              onClick={() => this._goToPrevChar(char)}
            >previouse letter</Btn>}
            {/* {_.size(list) && _.map(_.range(100), i =>
              <ListItem key={i} word={list[0]} />)} */}
            {_.map(list, word =>
              <ListItem key={word} word={word} />)}
            {char !== 'Z' && <Btn
              className='app-exclude-list-item'
              onClick={() => this._goToNextChar(char)}
            >next letter</Btn>}
          </div>
          <div className='app-exclude-content__before' />
          <div className='app-exclude-content__after' />
        </div>
        <Footer className="app-exclude-footer">
          <Btn
            className='app-nav-btn'
            onClick={() => _.size(list) && changeStudy(list, false)}
          >deselect all</Btn>
        </Footer>
      </Screen>
    );
  }
}
Plugin.defaultName = 'Exclude';

const mapState = ({ words: { wordsByChar } }) => ({
  groups: wordsByChar
});
const mapDispatch = { navigationGoHome, changeStudy };

export default connect(mapState, mapDispatch)(Plugin);
