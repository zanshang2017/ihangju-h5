import styles from './styles.css';
import React from 'react';
import {Link} from 'react-router';


/* eslint-disable react/prefer-stateless-function */
export default class TopBar extends React.Component {

    constructor(props) {
        super(props);
        this.title = '';
        this.btns = null;
    }

    handleBack() {
        this.props.backHandler ? this.props.backHandler() : window.history.back();
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

        if (Array.isArray(this.props.children)) {
            this.props.children.map(function (child) {
                that.getChild(child);
            });
        } else {
            that.getChild(this.props.children);
        }

        return (
            <div className={styles.bar}>
                <div onClick={this.handleBack.bind(this)} className={styles.back}><i className="icon-left iconfont"></i></div>
                <div className={styles.title}>{this.title}</div>
                <div className={styles.btns}>{this.btns}</div>
            </div>
        );
    }
}

TopBar.propTypes = {};

export default TopBar;


