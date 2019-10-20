import React, { Component } from 'react';
import { Screen, Panel, Btn, Image } from 'components/Base';
import { connect } from "react-redux";
import { navigationGoHome } from 'redux/navigation';
import { next } from 'redux/words';
import _ from 'lodash';

class Plugin extends Component {
  render() {
    const { navigationGoHome, data = {}, next, animated } = this.props;
    const { word, examples, similar, link, translation } = data;
    return (
      <Screen className={"app-learn" + (animated ? ' fadeInRight faster' : '')}>
        <Panel className="app-learn-panel">
          <Btn
            className='app-nav-btn'
            onClick={navigationGoHome}>home</Btn>
        </Panel>
        <div className='app-learn-word'>
          {word}
          {_.size(similar) ? ' / ' + similar.join(', ') : ''}
        </div>
        <div className='app-learn-content'>
          <Image src={link} />
          <div className='app-learn-translation'>
            {_.map(translation, (l) =>
              l.word + (l.comment ? ' (' + l.comment + ')' : ''))
              .join(', ')}
          </div>
          <div className='app-learn-examples'>
            {examples ? examples.join('\n') : ''}
          </div>
        </div>
        <div className='app-learn-footer' >
          <Btn
            className='app-learn-btn'
            onClick={() => next()}>show later</Btn>
          <Btn
            className='app-learn-btn'
            active
            onClick={() => next(true)}>got it</Btn>
        </div>
      </Screen>
    );
  }
}
Plugin.defaultName = 'Learn';

const mapState = ({ words: { listByWord } }, { word }) => ({
  data: listByWord[word]
});
const mapDispatch = { navigationGoHome, next };

export default connect(mapState, mapDispatch)(Plugin);
