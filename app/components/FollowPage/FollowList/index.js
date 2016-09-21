import styles from './styles.scss';
import React from 'react';

import _ from 'underscore';

/* eslint-disable react/prefer-stateless-function */
export default class FollowList extends React.Component {

    constructor(props) {
        super(props);
        this.scrollHanderBinded = null;
        this.myFollowListPage = 0;
    }

    componentDidMount() {
        var that = this;

        //滑动底部加载下一页
        that.scrollHanderBinded = _.throttle(that.scrollHandler.bind(that), 300, {leading: false});
        this.refs.nFollowListWrap.addEventListener('scroll', that.scrollHanderBinded);
    }

    scrollHandler(e) {
        // console.log('this.myFollowListLoading:' , this.props.myFollowListLoading,
        //     'this.page:', this.page,
        //     'this.isLast:', this.isLast);

        var nWrap = this.refs.nFollowListWrap;
        var nList = this.refs.nFollowList;

        var nWrapH = nWrap.getBoundingClientRect().height;
        var nListH = nList.getBoundingClientRect().height;
        // console.log(nWrap.scrollTop + nWrapH + '>' + nListH);

        if (nWrap.scrollTop + nWrapH >= nListH && !this.isLast && !this.props.myFollowListLoading) {
            this.props.loadMyFollowList(this.page + 1);
        }
    }

    changeCurrentHandler(e) {
        if (e.target.nodeName.toLowerCase() === 'li') {
            var target = e.target;
            var obj = {
                id: target.getAttribute('id'),
                name: target.innerText,
                type: target.getAttribute('type') || null
            };

            this.hideFollowList();
            this.props.changeCurrentFollowHandler(obj);

            e.stopPropagation();
            e.preventDefault();
        }
    }

    showFollowList() {
        let nFollowListWrap = this.refs.nFollowListWrap;
        if (!nFollowListWrap.style.height) {
            nFollowListWrap.style.height = document.getElementById("J_Container").getBoundingClientRect().height + 'px';
        }
        nFollowListWrap.classList.remove('hide');

        this.myFollowListPage = 0;
        this.props.loadMyFollowList(this.myFollowListPage);
    }

    hideFollowList() {
        let nFollowListWrap = this.refs.nFollowListWrap;
        nFollowListWrap.classList.add('hide');
    }

    render() {
        this.page = this.props.selectMyFollowListDataStatus.get('page');
        this.isLast = this.props.selectMyFollowListDataStatus.get('isLast');

        let followTags = this.props.items['followTags'] || [];
        let followUsers = this.props.items['followUsers'] || [];

        let tagTitle = '';
        let userTitle = '';

        if (followTags) {
            tagTitle = <div className={styles.type}>标签</div>;
        }

        if (followUsers) {
            userTitle = <div className={styles.type}>用户</div>
        }

        return (
            <div ref="nFollowListWrap" className={`${styles.listWrap} hide`}>
                <div ref="nFollowList" className={`${styles.list}`}
                     onClick={this.changeCurrentHandler.bind(this)}
                     onScroll={this.scrollHanderBinded}>
                    <ul>
                        <li key="-1" id="-1">全部关注</li>
                    </ul>

                    {tagTitle}
                    <ul>
                        {
                            followTags.map(function (item) {
                                return <li key={item.id} id={item.id} type="tag">{item.name}</li>
                            })
                        }
                    </ul>

                    {userTitle}
                    <ul>
                        {
                            followUsers.map(function (item) {
                                return <li key={item.id} id={item.id} type="user">{item.name}</li>
                            })
                        }
                    </ul>

                </div>
            </div>
        );
    }
}

FollowList.propTypes = {};

export default FollowList;


