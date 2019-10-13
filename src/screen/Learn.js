import React, { Component } from 'react';
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
    this._check();
  }
  _check = () => {
    const { word, navigationGoHome } = this.props;
    if (!word) {
      navigationGoHome();
      alert('нет слов');
    }
  }
  render() {
    const { words } = this.state;
    const { word } = this.props;
    return (
      <React.Fragment>

        <Watch word={word} onChange={this._changeWords} />
        {word
          ? _.map(words, w =>
            <Learn key={w} word={w} animated={_.size(words) > 1} />)
          : ''}
      </React.Fragment>
    );
  }
}
Plugin.defaultName = 'LearnScreen';

const mapState = ({ words: { turn } }) => ({
  word: turn[0]
});
const mapDispatch = { navigationGoHome, next };

export default connect(mapState, mapDispatch)(Plugin);
