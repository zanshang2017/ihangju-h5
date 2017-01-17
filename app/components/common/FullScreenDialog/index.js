/**
 * Created by Howard on 2016/11/9.
 */

import styles from './styles.scss';
import React from 'react';

import _ from 'underscore';

import LoadingBar from 'components/common/LoadingBar';

/* eslint-disable react/prefer-stateless-function */
class FullScreenDialog extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.refs.J_Wrap.addEventListener('touchmove', function(e){
            e.stopPropagation();
        });
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div ref="J_Wrap" className={styles.wrap}>
                {this.props.children}
            </div>
        );
    }
}

export default FullScreenDialog;


