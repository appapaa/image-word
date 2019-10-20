import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'assets/css/App.scss';
import 'assets/css/animate.css';
import Menu from 'screen/Menu';
import Learn from 'screen/Learn';
import Test from 'screen/Test';
import Exclude from 'screen/Exclude';
import { getWords } from 'redux/words';
import { onHashChange } from 'redux/navigation';
import _ from 'lodash';
import Alert from 'components/Alert';
class App extends Component {
  renderPlugin() {
    const { path } = this.props;
    const plugin = _.last(path) || 'Menu';
    switch (plugin) {
      case 'Menu':
        return <Menu />;
      case 'Learn':
        return <Learn />;
      case 'Test':
        return <Test />;
      case 'Exclude':
        return <Exclude />;
      default: return <div>Нет такого экрана</div>
    }
  }
  componentDidMount() {
    const { getWords, onHashChange } = this.props;
    getWords();
    onHashChange();
    window.addEventListener("hashchange", onHashChange, false);
  }

  render() {
    return (
      <div className="app">
        {this.renderPlugin()}
        <Alert />
      </div>
    );
  }
}

const mapState = ({ navigation }) => {
  return {
    path: navigation.path
  }

};
const mapDispatch = { getWords, onHashChange };

export default connect(mapState, mapDispatch)(App);
