import React, { Component } from 'react';
import { Btn } from 'components/Base';
import { connect } from "react-redux";
import { changeStudy } from 'redux/words';
class Plugin extends Component {
    render() {
        const { data: { word }, studied, changeStudy } = this.props;
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

const mapState = ({ words: { listByWord, studyByWord } }, { word }) => ({
    data: listByWord[word],
    studied: !!studyByWord[word]
});
const mapDispatch = { changeStudy };

export default connect(mapState, mapDispatch)(Plugin);
