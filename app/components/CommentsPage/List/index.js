import styles from './styles.scss';
import React from 'react';

import _ from 'underscore';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

import {convertDate} from '../../../utils/util.js';
import {
    ANSWER_TYPE
} from 'containers/CommentsPage/constants';

import {
    addImageParam,
    IMAGE_SIZE_TYPE
} from 'utils/util.js';

import Answer from '../Answer';

/* eslint-disable react/prefer-stateless-function */
class List extends React.Component {
    constructor(props) {
        super(props);
        this.scrollHanderBinded = null;
        this.page = 0;
        this.isLast = false;
        this.loading = false;
    }

    componentDidMount() {
        var that = this;

        that.nWrap = that.refs.J_Wrap.parentElement;

        //滑动底部加载下一页
        that.scrollHanderBinded = _.throttle(that.scrollHandler.bind(that), 300, {leading: false});
        that.nWrap.addEventListener('scroll', that.scrollHanderBinded);
    }

    componentWillUnmount() {
        console.log('Comments List: willUnmount.');

        //移除侦听
        if (this.scrollHanderBinded) {
            this.nWrap.removeEventListener('scroll', this.scrollHanderBinded);
            this.scrollHanderBinded = null;
        }
    }

    scrollHandler(e) {
        var nWrapH = this.nWrap.getBoundingClientRect().height;

        // console.log(nWrap.scrollTop + nWrapH, nWrap.scrollHeight, this.props.recommendationListStatus.toJS(), this.props.projectListStatus.toJS());

        if (Math.ceil(this.nWrap.scrollTop + nWrapH) >= this.nWrap.scrollHeight) {
            //加载下一页
            if (!this.loading) {
                if (!this.loading && !this.isLast) {
                    this.props.nextPageHandler(this.page + 1);
                }
            }
        }
    }

    clickHandler(e) {
        let id = e.currentTarget.dataset['id'];
        let name = e.currentTarget.dataset['name'];
        let type = ANSWER_TYPE.ANSWER;

        console.log('click list', type, name, id);
        this.props.listClickHandler(e, {id, name, type});
    }

    render() {
        let that = this;
        this.page = this.props.page;
        this.isLast = this.props.isLast;
        this.loading = this.props.loading;
        this.items = this.props.items ? this.props.items : [];

        // {
        //     "id": "57cd330ae4b084d7d0a0a64a",
        //     "userName": "门神4",
        //     "userId": "571dab71e4b0d50d21e7a9fc",
        //     "avatar": "/image/57c7e146e4b0ddd2e19eff99.jpg",
        //     "content": "ikokk ",
        //     "modifyTime": 1473065738134,
        //     "answers": [{
        //         "id": "57cfd67fe4b0857f686c0313",
        //         "content": "hū\uD83D\uDC2F",
        //         "fromUserId": "571dab71e4b0d50d21e7a9fc",
        //         "fromUserName": "门神4",
        //         "toUserName": "门神4",
        //         "toUserId": "571dab71e4b0d50d21e7a9fc"
        //     }, {
        //         "id": "57cfd68be4b0857f686c0315",
        //         "content": "古",
        //         "fromUserId": "571dab71e4b0d50d21e7a9fc",
        //         "fromUserName": "门神4",
        //         "toUserName": "门神4",
        //         "toUserId": "571da/b71e4b0d50d21e7a9fc"
        //     }]
        // }

        return (
            <div ref="J_Wrap" className={`${styles.listWrap}`}>
                {
                    this.items.map(function (item) {
                        let imageSrc = addImageParam(IMG_CDN_PATH + item.avatar, IMAGE_SIZE_TYPE.AVATAR);
                        let modifyTime = convertDate(item.modifyTime, 'YYYY-MM-DD hh:mm:ss');

                        return <div className={styles.listItem} data-id={item.id} data-name={item.userName}
                                    key={item.id} onClick={that.clickHandler.bind(that)}>
                            <div className={styles.basis}>
                                <div className={styles.avatar}>
                                    <img src={imageSrc}/>
                                </div>
                                <div className={styles.info}>
                                    <h4>{item.userName || ''}</h4>
                                    <p className={styles.time}>{modifyTime}</p>
                                </div>
                            </div>
                            <div className={styles.content}>{item.content || ''}</div>
                            <Answer items={item.answers} listClickHandler={that.props.listClickHandler}></Answer>
                        </div>
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


