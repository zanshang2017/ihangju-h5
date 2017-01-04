import styles from './styles.scss';
import React from 'react';

import {
    DEFAULT_PLACEHOLDER
} from './constants';

import Toast from 'antd-mobile/lib/toast';

/* eslint-disable react/prefer-stateless-function */
class InputBar extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.defaultPlaceholder = DEFAULT_PLACEHOLDER;
        if (this.props.placeholder) {
            this.defaultPlaceholder = this.props.placeholder;
        }
    }

    componentDidMount() {
        let that = this;

        //将内部方法暴露给外部(一般是父级)对象
        if (that.props.bindingMethod) {
            let names = that.props.bindingMethod.methodName;

            names.forEach(function (name) {
                if (typeof that[name] === 'function') {
                    that.props.bindingMethod.context[name] = that[name].bind(that);
                }
            });
        }

    }

    componentWillUnmount() {
    }

    componentWillUpdate(props) {
        if (props.placeholder && this.refs.J_Input.value.length == 0) {
            this.refs.J_Input.value = '';
        }
    }

    submitHandler() {
        // alert('clicked')
        let v = this.refs.J_Input.value || '';

        if (v.trim()) {
            this.props.submitHandler(v);
        } else {
            Toast.fail('请输入文字', 1.5);
        }
    }

    onFocusHandler() {
        //bugfix: ios键盘弹出偶尔会遮挡输入栏
        setTimeout(()=> {
            this.refs.J_Input.scrollIntoView(true);
        }, 100);
    }

    clear() {
        this.refs.J_Input.value = '';
    }

    render() {
        let placeholder = this.defaultPlaceholder;

        if (this.props.placeholder && this.props.placeholder !== this.defaultPlaceholder) {
            placeholder = '回复' + this.props.placeholder + ':';
        }

        return (
            <div ref="J_Wrap" className={styles.wrap}>
                <div className={styles.outer}>
                    <div className={styles.inner}>
                        <input ref="J_Input" type="text" onFocus={this.onFocusHandler.bind(this)}
                               placeholder={placeholder} maxLength="500"/>
                        <button className={styles.btn} onClick={this.submitHandler.bind(this)}></button>
                    </div>
                </div>
                <div ref="J_Mask" className={styles.mask} style={{display: 'none'}}></div>
            </div>
        );
    }
}

InputBar.contextTypes = {
    router: React.PropTypes.object.isRequired
};

InputBar.propTypes = {};

export default InputBar;


