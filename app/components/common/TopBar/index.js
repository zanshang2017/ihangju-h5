import styles from './styles.css';
import React from 'react';
import {hashHistory} from 'react-router';

/* eslint-disable react/prefer-stateless-function */
class TopBar extends React.Component {

    constructor(props) {
        super(props);
        this.title = '';
        this.btns = null;
    }

    handleBack() {
        if (this.props.backHandler) {
            this.props.backHandler()
        } else {
            hashHistory.goBack();
        }
    }

    getChild(child) {
        if (child.props["data-title"]) {
            this.title = child.props.children;
        }

        if (child.props["data-btns"]) {
            this.btns = child.props.children;
        }
    }

    render() {

        var that = this;
        var _style = {};

        if (Array.isArray(this.props.children)) {
            this.props.children.map(function (child) {
                that.getChild(child);
            });
        } else {
            that.getChild(this.props.children);
        }

        var backBtn = '';

        if (this.props['data-has-back'] == 'true') {
            backBtn = <div onClick={this.handleBack.bind(this)} data-hashover="true" className={styles.back}><i
                className="iconBack"></i>
            </div>;
        }

        if (this.props['data-style']) {
            _style = this.props['data-style'];
        }

        return (
            <div className={`${styles.bar}`} style={_style}>
                {backBtn}
                <div className={styles.title}>{this.title}</div>
                <div className={styles.btns}>{this.btns}</div>
            </div>
        );
    }
}

TopBar
    .propTypes = {};

export
default
TopBar;


