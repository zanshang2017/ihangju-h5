/**
 * Created by Howard on 2016/11/9.
 */

import styles from './styles.scss';
import React from 'react';

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

    show() {
        this.refs.J_Wrap.classList.remove('hide');
    }

    hide() {
        this.refs.J_Wrap.classList.add('hide');
    }

    render() {
        return (
            <div ref="J_Wrap" className={`${styles.wrap} hide`}>
                {this.props.children}
            </div>
        );
    }
}

export default FullScreenDialog;


