import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'assets/css/App.scss';
import Menu from 'screen/Menu';
import Learn from 'screen/Learn';
import Test from 'screen/Test';
import Exclude from 'screen/Exclude';
import { getWords } from 'redux/words';
import _ from 'lodash';
class App extends Component {
  renderPlugin() {
    const { path } = this.props;
    const plugin = _.last(path);
    switch (plugin.id) {
      case 'Menu':
        return <Menu
          {...plugin.params}
        />;
      case 'Learn':
        return <Learn
          {...plugin.params}
        />;
      case 'Test':
        return <Test
          {...plugin.params}
        />;
      case 'Exclude':
        return <Exclude
          {...plugin.params}
        />;
      default: return <div>Нет такого экрана</div>
    }
  }
  componentDidMount() {
    const { getWords } = this.props;
    getWords();
    window.addEventListener("hashchange", this.props.exit, false);
  }

  render() {
    return (
      <div className="app">
        {this.renderPlugin()}
      </div>
    );
  }
}

const mapState = ({ navigation }) => {
  return {
    path: navigation.path
  }

};
const mapDispatch = { getWords };

export default connect(mapState, mapDispatch)(App);
