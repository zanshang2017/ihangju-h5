import styles from './styles.scss';
import React from 'react';

/* eslint-disable react/prefer-stateless-function */
export default class FollowList extends React.Component {

    componentDidMount() {
        var that = this;

        // setTimeout(function () {
        //     that.props.loadNextFollowListHandler();
        // }, 3000);
    }

    changeCurrentHandler(e) {
        if (e.target.nodeName.toLowerCase() === 'li') {
            var target = e.target;
            var obj = {
                id: target.getAttribute('id'),
                name: target.innerText,
                type: target.getAttribute('type') || null
            };

            this.props.hideFollowList();

            this.props.changeCurrentFollow(obj);

            e.stopPropagation();
            e.preventDefault();
        }
    }

    render() {
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
            <div ref="nFollowListWrap" className={`${styles.wrap}`} onClick={this.changeCurrentHandler.bind(this)}>
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
        );
    }
}

FollowList.propTypes = {};

export default FollowList;


