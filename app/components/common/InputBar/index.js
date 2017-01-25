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
        this.preventHandlerBind = this.preventHandler.bind(this);
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

        this.refs.J_Wrap.addEventListener('touchmove', this.preventHandlerBind);
    }

    componentWillUnmount() {
        this.refs.J_Wrap.removeEventListener('touchmove', this.preventHandlerBind);
        clearInterval(this.keyboardFixTimer);
    }

    componentWillUpdate(props) {
        if (props.placeholder && this.refs.J_Input.value.length == 0) {
            this.refs.J_Input.value = '';
        }
    }

    submitHandler(e) {
        e.preventDefault();

        // alert('clicked')
        let input = this.refs.J_Input;
        let v = input.value || '';

        input.blur();

        if (v.trim()) {
            this.props.submitHandler(v);
        } else {
            Toast.fail('请输入文字', 1.5);
        }

        return false;
    }

    onFocusHandler() {
        this.props.onInputFocus && this.props.onInputFocus();

        if (this.keyboardFixTimer) {
            clearInterval(this.keyboardFixTimer);
        }

        //bugfix: ios键盘弹出偶尔会遮挡输入栏
        this.keyboardFixTimer = setInterval(()=> {
            if (this.refs.J_Input) {
                this.refs.J_Input.scrollIntoView(true);
            } else {
                clearInterval(this.keyboardFixTimer);
            }
        }, 350);
    }

    onBlurHandler() {
        if (this.keyboardFixTimer) {
            clearInterval(this.keyboardFixTimer);
        }
        this.props.onInputBlur && this.props.onInputBlur();
    }

    clear() {
        this.refs.J_Input.value = '';
    }

    preventHandler (e) {
        e.preventDefault();
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
                        <form action="" onSubmit={this.submitHandler.bind(this)}>
                            <input ref="J_Input" type="text" onFocus={this.onFocusHandler.bind(this)}
                                   onBlur={this.onBlurHandler.bind(this)}
                                   placeholder={placeholder} maxLength="500" className={styles.input}/>
                            <button className={styles.btn}></button>
                        </form>
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


