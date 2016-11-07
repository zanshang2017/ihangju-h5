import styles from './styles.scss';
import React from 'react';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

import {
    addImageParam,
    IMAGE_SIZE_TYPE
} from 'utils/util.js';

import {convertDate} from '../../../utils/util.js';

import Result from 'antd-mobile/lib/page-result';

/* eslint-disable react/prefer-stateless-function */
class List extends React.Component {

    constructor(props) {
        super(props);
        // 目前无分页
        this.loading = false;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    clickHandler(e) {
        let letterGroupId = e.currentTarget.dataset['id'];
        this.context.router.push(`/dialogue/${letterGroupId}`);
    }

    render() {
        let that = this;
        this.loading = this.props.loading;
        this.items = this.props.items ? this.props.items : [];

        let dialogHtml = <Result
            imgUrl="https://o82zr1kfu.qnssl.com/@/image/58131655e4b0edf1e7b90b19.png?imageMogr2/auto-orient/"
            title="还没有收到私信哦~"
        />;

        // {
        //     "letterGroupId": "571dab71e4b0d50d21e7a9fc:573747fee4b0afac484db029",
        //     "nickName": "易佐",
        //     "userAvatar": "/static/random0.png",
        //     "lastMessage": {
        //         "createTime": 1473306721550,
        //         "id": "57d0e061e4b0857f686c0415",
        //         "content": "u 国家恢复"
        //     },
        //     "userId": "573747fee4b0afac484db029"
        // }

        if (this.items.length > 0) {

            dialogHtml = this.items.map(function (item) {
                let imageSrc = addImageParam(IMG_CDN_PATH + item.userAvatar, IMAGE_SIZE_TYPE.AVATAR);
                let createTime = (item.lastMessage && item.lastMessage.createTime) ? (convertDate(item.lastMessage.createTime)) : '';

                return <div className={styles.listItem} data-hashover="true" data-id={item.letterGroupId}
                            key={item.letterGroupId} onClick={that.clickHandler.bind(that)}>
                    <div className={styles.item}>
                        <div className={styles.avatar}>
                            <img src={imageSrc}/>
                        </div>
                        <div className={styles.info}>
                            <h4>{item.nickName || ''}</h4>
                            <p>{item.lastMessage && (item.lastMessage.content || '')}</p>
                        </div>
                        <div className={styles.time}>{createTime}</div>
                    </div>
                </div>
            });
        }

        return (
            <div ref="nDialogueListWrap" className={`${styles.listWrap}`}>
                {dialogHtml}
            </div>
        );
    }
}

List.contextTypes = {
    router: React.PropTypes.object.isRequired
};

List.propTypes = {};

export default List;


