import React from 'react';
import _ from 'lodash'
import { prefixImg } from 'assets/const';
export const Screen = ({ children, className }) =>
    <div className={'app-ui-screen' + (className ? ' ' + className : '')}>{children}</div>;

export const Panel = ({ children, className }) =>
    <div className={'app-ui-panel' + (className ? ' ' + className : '')}>{children}</div>;

export const Footer = ({ children, className }) =>
    <div className={'app-ui-footer' + (className ? ' ' + className : '')}>{children}</div>;

export const Content = ({ children, className }) =>
    <div className={'app-ui-content' + (className ? ' ' + className : '')}>{children}</div>;

export const Btn = React.memo((props) => {
    const { className, onClick, type = '', children, active, disabled, getRef } = props;
    const _props = _.omit(props, ['className', 'type', 'onClick', 'children', 'active', 'disabled']);
    return (
        <div
            ref={div => getRef && getRef(div)}
            {..._.omit(_props, 'getRef')}
            className={'app-ui-btn' + type
                + (className ? ' ' + className : '')
                + (active ? ' -active' : '')
                + (disabled ? ' -disabled' : '')}
            onClick={disabled ? undefined : onClick}>
            {children}
        </div>
    );
})

export const Image = (props) => {
    const { className, src } = props;
    const _props = _.omit(props, ['className', 'src', 'onClick']);
    return (
        <div
            style={{ backgroundImage: 'url(' + prefixImg + src + ')' }}
            {..._props}
            className={'app-ui-image' + (className ? ' ' + className : '')}
        />);
}