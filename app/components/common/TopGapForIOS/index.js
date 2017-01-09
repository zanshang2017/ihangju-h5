/**
 * Created by Howard on 2016/11/9.
 */

import React from 'react';

import {
    Env
} from 'utils/env.js';

/* eslint-disable react/prefer-stateless-function */
export default class TopGapForIOS extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (Env.isIOSShell) {
            return <div className={`barTopGapIos`} style={this.props.style || {}}></div>;
        } else {
            return <div></div>;
        }
    }
}

