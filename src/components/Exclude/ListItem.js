import React, { Component } from 'react';
import { Screen, Panel, Btn } from 'components/Base';
import { connect } from "react-redux";
import { changeStudy } from 'redux/words';
import _ from 'lodash';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
class Plugin extends Component {
    render() {
        const { data: { word, studied }, changeStudy } = this.props;
        return (
            <Btn
                className='app-exclude-list-item'
                active={studied}
                onClick={() => changeStudy([word], !studied)}
            >{word}
            </Btn>
        );
    }
}
Plugin.defaultName = 'ListItem';

const mapState = ({ words: { listByWord } }, { word }) => ({
    data: listByWord[word]
});
const mapDispatch = { changeStudy };

export default connect(mapState, mapDispatch)(Plugin);
