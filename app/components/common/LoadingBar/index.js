/**
 * Created by Howard on 2016/11/9.
 */

import React from 'react';

/* eslint-disable react/prefer-stateless-function */
export default class LoadingBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let loadingBar = {
            width: '100%',
            padding: this.props.padding || '30px 0',
            color: '#666',
            fontSize: '12px',
            textAlign: 'center'
        };

        let loading = {
            marginRight: '10px',
            marginTop: '-3px'
        };

        return <div style={loadingBar}><i style={loading} className={`iconLoading`}></i>加载中</div>;
    }
}

