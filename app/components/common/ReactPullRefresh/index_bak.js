/**
 * Created by Howard on 2016/11/9.
 */

import React from 'react';

/* eslint-disable react/prefer-stateless-function */
export default class PullRefresh extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div>{this.props.children}</div>;
    }
}

