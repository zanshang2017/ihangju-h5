import styles from './styles.css';
import React from 'react';

import FollowList from 'components/FollowPage/FollowList';

/* eslint-disable react/prefer-stateless-function */
export default class TopListBar extends React.Component {

    constructor(props) {
        super(props);
        this.myFollowListPage = 0;
    }

    componentDidMount() {
    }

    toggleMyFollowListHandler(e) {
        let nArrow = this.refs.nTopListBarTitleArrow;
        let nArrowClass = nArrow.classList;

        nArrowClass.toggle('icon-down');
        nArrowClass.toggle('icon-up');

        if (nArrowClass.contains('icon-down')) {
            this.hideFollowList();
        } else {
            this.showFollowList();
        }

        e.preventDefault();
    }

    showFollowList() {
        let nFollowListWrap = this.refs.nFollowListWrap;
        if (!nFollowListWrap.style.height) {
            nFollowListWrap.style.height = document.documentElement.clientHeight - this.refs.nTopListBar.clientHeight - document.getElementById('nav').clientHeight + 'px';
        }
        nFollowListWrap.classList.remove('hide');
        this.myFollowListPage = 0;
        this.props.loadMyFollowList(this.myFollowListPage);
    }

    hideFollowList() {
        let nFollowListWrap = this.refs.nFollowListWrap;
        nFollowListWrap.classList.add('hide');
    }

    loadNextFollowList() {
        this.props.loadMyFollowList(++this.myFollowListPage);
    }

    changeCurrentFollow(data) {
        this.props.changeCurrentFollow(data);
    }

    render() {

        if (this.props.currentFollow) {
            this.props.loadMyFollow(0, this.props.currentFollow);
        }

        let title = this.props.currentFollow ? this.props.currentFollow.name : '全部关注';
        let followList = '';

        if (this.props.myFollowListData) {
            followList = <FollowList items={this.props.myFollowListData}
                                     loadNextFollowListHandler={this.loadNextFollowList.bind(this)}
                                     changeCurrentFollow={this.changeCurrentFollow.bind(this)}
                                     hideFollowList={this.hideFollowList.bind(this)}/>
        } else {
            //todo loading
        }

        return (
            <div className={styles.wrap}>
                <div id="J_followPageTopListBar" ref="nTopListBar" className={styles.bar}>
                    <div className={styles.title} onClick={this.toggleMyFollowListHandler.bind(this)}>{title}<i
                        ref="nTopListBarTitleArrow" className="icon-down iconfont"></i></div>
                </div>

                <div ref="nFollowListWrap" className={`${styles.listWrap} hide`}>
                    {followList}
                </div>
            </div>
        );
    }
}

TopListBar.propTypes = {};

export default TopListBar;


