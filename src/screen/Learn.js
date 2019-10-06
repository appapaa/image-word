import React, { Component } from 'react';
import { Screen, Panel, Content, Btn, Image, Footer } from 'components/Base';
import { connect } from "react-redux";
import { navigationGoHome } from 'redux/navigation';
import { next } from 'redux/words';
import _ from 'lodash';
import Learn from 'components/Learn';
import Watch from 'components/Watch';

class Plugin extends Component {
  state = {
    words: []
  }
  _changeWords = () => {
    const { words } = this.state;
    const { word } = this.props;
    this.setState({
      words: words.concat(word).slice(-2)
    })
  }
  render() {
    const { words } = this.state;
    const { word } = this.props;
    return (
      <React.Fragment>

        <Watch word={word} onChange={this._changeWords} />
        {_.map(words, w =>
          <Learn key={w} word={w} animated={_.size(words) > 1} />)}
      </React.Fragment>
    );
  }
}
Plugin.defaultName = 'LearnScreen';

const mapState = ({ words: { nextWord } }) => ({
  word: nextWord
});
const mapDispatch = { navigationGoHome, next };

export default connect(mapState, mapDispatch)(Plugin);
