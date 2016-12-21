import styles from './styles.css';
import React from 'react';

import {
    Env
} from 'utils/env.js';

import TopGapForIOS from 'components/common/TopGapForIOS';
import FollowList from 'components/FollowPage/FollowList';

/* eslint-disable react/prefer-stateless-function */
class TopListBar extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    toggleMyFollowListHandler() {
        let nArrow = this.refs.nTopListBarTitleArrow;
        let nArrowClass = nArrow.classList;

        nArrowClass.toggle('rotateZ180');

        if (!nArrowClass.contains('rotateZ180')) {
            this.refs.J_FollowList.hideFollowList();
        } else {
            this.refs.J_FollowList.showFollowList();
        }
    }

    changeCurrentFollowHandler(data) {
        this.toggleMyFollowListHandler();
        this.props.changeCurrentFollow(data);

        let nArrow = this.refs.nTopListBarTitleArrow;
        let nArrowClass = nArrow.classList;

        nArrowClass.remove('rotateZ180');
    }

    render() {
        let title = this.props.currentFollow ? this.props.currentFollow.name : '全部关注';
        let followList = '';
        let barTopGapHtml = '';

        if (this.props.myFollowListData) {
            followList = <FollowList ref="J_FollowList" items={this.props.myFollowListData}
                                     changeCurrentFollowHandler={this.changeCurrentFollowHandler.bind(this)}
                                     {...this.props} />
        } else {
            //todo loading
        }

        return (
            <div>
                <TopGapForIOS/>
                <div id="J_followPageTopListBar" ref="nTopListBar" className={`${styles.bar}`}>
                    <div className={styles.title} onClick={this.toggleMyFollowListHandler.bind(this)}>{title}
                        <i ref="nTopListBarTitleArrow"  className="iconDown hasTransition"></i>
                    </div>
                </div>
                {followList}
            </div>
        );
    }
}

TopListBar.propTypes = {};

export default TopListBar;


