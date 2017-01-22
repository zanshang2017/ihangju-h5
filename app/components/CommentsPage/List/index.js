import styles from './styles.scss';
import React from 'react';

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
import LoadingList from 'components/common/LoadingList';

import Result from 'antd-mobile/lib/page-result';

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
    }

    componentWillUnmount() {
        console.log('Comments List: willUnmount.');
    }

    loadHandler() {
        if (!this.loading) {
            if (!this.loading && !this.isLast) {
                this.props.nextPageHandler(this.page + 1);
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

    clickUserHandler(e) {
        let userId = e.currentTarget.dataset['id'];
        this.context.router.push(`/person/${userId}`);
        e.stopPropagation();
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

        let _list = <div style={{background: '#fff'}}><Result
            imgUrl="https://o82zr1kfu.qnssl.com/@/image/5813164ee4b0edf1e7b90b15.png?imageMogr2/auto-orient/"
            title="还没有任何评论哦~"
        /></div>;

        if (this.items && this.items.length > 0) {
            _list = this.items.map(function (item) {
                let imageSrc = addImageParam(IMG_CDN_PATH + item.avatar, IMAGE_SIZE_TYPE.AVATAR);
                let modifyTime = convertDate(item.modifyTime, 'YYYY-MM-DD hh:mm:ss');

                return <div className={styles.listItem} data-id={item.id} data-name={item.userName}
                            key={item.id + '-' + parseInt(Math.random() * 100000)}
                            onClick={that.clickHandler.bind(that)}>
                    <div className={styles.basis}>
                        <div className={styles.avatar} data-id={item.userId} onClick={that.clickUserHandler.bind(that)}>
                            <img src={imageSrc}/>
                        </div>
                        <div className={styles.info}>
                            <span>{item.userName || ''}</span>
                            <p className={styles.time}>{modifyTime}</p>
                        </div>
                    </div>
                    <div className={styles.content}>{item.content || ''}</div>
                    <Answer items={item.answers} listClickHandler={that.props.listClickHandler}></Answer>
                </div>
            })
        }

        return (
            <div ref="J_Wrap" className={`${styles.listWrap}`}>
                <LoadingList outer={this.nWrap}
                             isLast={this.isLast}
                             isLoading={this.loading}
                             showLastNotice={false}
                             loadHandler={this.loadHandler.bind(this)}
                             offset="350">
                    {_list}
                    {
                        !this.isLast ? <div className="blockGapTag"></div>  : ''
                    }
                </LoadingList>
            </div>
        );
    }
}

List.contextTypes = {
    router: React.PropTypes.object.isRequired
};

List.propTypes = {};

export default List;


