import styles from './styles.scss';
import React from 'react';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

import {convertDate} from '../../../utils/util.js';

/* eslint-disable react/prefer-stateless-function */
class List extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    shareClickHandler(e) {
        let projectId = e.currentTarget.dataset['id'];
        this.context.router.push(`/projectDetail/${projectId}`);
    }

    avatarClickHandler(e) {
        let id = e.currentTarget.dataset['id'];
        this.context.router.push(`/person/${id}`);
    }

    render() {
        let that = this;
        this.loading = this.props.loading;
        this.items = this.props.items ? this.props.items : [];
        this.myUserId = this.props.myUserId || 0;

        // {
        //     "sendUser": "571dab71e4b0d50d21e7a9fc",
        //     "sendUserName": "门神4",
        //     "id": "57de2c03e4b0c25c843d5323",
        //     "type": "im",
        //     "content": "hhhhhh ",
        //     "sendTime": 1474178051840,
        //     "sendUserAvatar": "/image/57d8c85ee4b073eceafe17e5.jpg"
        // }

        return (
            <div ref="nDialogueListWrap" className={`${styles.listWrap}`}>
                {
                    this.items.map(function (item) {
                        let imageSrc = IMG_CDN_PATH + item.sendUserAvatar;
                        let createTime = convertDate(item.sendTime, 'YYYY-MM-DD hh:mm:ss');
                        let itemStyleClass = (that.myUserId == item.sendUser) ? styles.itemMe : styles.itemTa;
                        let infoContent = '';

                        switch (item.type) {
                            case 'project_share':
                                infoContent = <div className={styles.innerShare} data-id={item.expand.projectId}
                                                   onClick={that.shareClickHandler.bind(that)}>
                                    <div className={styles.content}>
                                        <h3>《{item.expand.projectName}》</h3>
                                        <span>作者:{item.expand.authorName}</span>
                                    </div>
                                </div>;
                                break;

                            case 'im':
                                infoContent = <div className={styles.inner}>
                                    <div className={styles.content}>{item.content || ''}</div>
                                </div>;
                                break;

                            default:
                                break;
                        }

                        if (infoContent) {
                            return <div className={styles.listItem} key={item.id}>
                                <div className={styles.time}>{createTime}</div>
                                <div className={itemStyleClass}>
                                    <div className={styles.avatar} data-id={item.sendUser}
                                         onClick={that.avatarClickHandler.bind(that)}>
                                        <img src={imageSrc}/>
                                    </div>
                                    <div className={styles.info}>
                                        {infoContent}
                                    </div>
                                </div>
                            </div>
                        }
                    })
                }
            </div>
        );
    }
}

List.contextTypes = {
    router: React.PropTypes.object.isRequired
};

List.propTypes = {};

export default List;


