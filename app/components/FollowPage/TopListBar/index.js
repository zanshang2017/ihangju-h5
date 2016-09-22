import styles from './styles.css';
import React from 'react';

import FollowList from 'components/FollowPage/FollowList';

/* eslint-disable react/prefer-stateless-function */
export default class TopListBar extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    toggleMyFollowListHandler() {
        let nArrow = this.refs.nTopListBarTitleArrow;
        let nArrowClass = nArrow.classList;

        nArrowClass.toggle('icon-down');
        nArrowClass.toggle('icon-up');

        if (nArrowClass.contains('icon-down')) {
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

        if(!nArrowClass.contains('icon-down')){
            nArrowClass.add('icon-down');
        }

        if(nArrowClass.contains('icon-up')){
            nArrowClass.remove('icon-up');
        }
    }

    render() {
        let title = this.props.currentFollow ? this.props.currentFollow.name : '全部关注';
        let followList = '';

        if (this.props.myFollowListData) {
            followList = <FollowList ref="J_FollowList" items={this.props.myFollowListData}
                                     changeCurrentFollowHandler={this.changeCurrentFollowHandler.bind(this)}
                                     {...this.props} />
        } else {
            //todo loading
        }

        return (
            <div className={`r1bb`}>
                <div id="J_followPageTopListBar" ref="nTopListBar" className={`${styles.bar}`}>
                    <div className={styles.title} onClick={this.toggleMyFollowListHandler.bind(this)}>{title}<i
                        ref="nTopListBarTitleArrow" className="icon-down iconfont"></i></div>
                </div>

                {followList}
            </div>
        );
    }
}

TopListBar.propTypes = {};

export default TopListBar;


