import styles from './styles.css';
import React from 'react';
import {hashHistory} from 'react-router';

import {
    Env
} from 'utils/env.js';

import TopGapForIOS from 'components/common/TopGapForIOS';

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
        var barTopGapHtml = '';

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
        } else if (this.props['data-has-text-back'] == 'true') {
            backBtn = <div onClick={this.handleBack.bind(this)} data-hashover="true" className={styles.back}>
                取消
            </div>;
        }

        if (this.props['data-style']) {
            _style = this.props['data-style'];
        }

        // 增加头部空白,兼容ios
        if (_style && _style.backgroundColor) {
            barTopGapHtml = <TopGapForIOS style={{'backgroundColor': _style.backgroundColor}}/>
        } else {
            barTopGapHtml = <TopGapForIOS/>
        }

        return (
            <div className={styles.wrap}>
                {barTopGapHtml}
                <div className={`${styles.bar} ${styles.bar_ios}`} style={_style}>
                    {backBtn}
                    <div className={styles.title}>{this.title}</div>
                    <div className={styles.btns}>{this.btns}</div>
                </div>
            </div>

        );
    }
}

TopBar.propTypes = {};

export default TopBar;


