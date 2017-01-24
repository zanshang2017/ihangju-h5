import styles from './styles.scss';
import React from 'react';

import _ from 'underscore';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

import LazyLoad from 'react-lazy-load';

import {
    addImageParam,
    IMAGE_SIZE_TYPE
} from 'utils/util.js';
import LoadingBar from 'components/common/LoadingBar';
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

        //滑动底部加载下一页
        that.scrollHanderBinded = _.throttle(that.scrollHandler.bind(that), 300, {leading: false});
        window.addEventListener('scroll', that.scrollHanderBinded);
    }

    componentWillUnmount() {
        console.log('Collection List: willUnmount.');

        //移除侦听
        if (this.scrollHanderBinded) {
            window.removeEventListener('scroll', this.scrollHanderBinded);
            this.scrollHanderBinded = null;
        }
    }

    scrollHandler(e) {
        var nWrap = document.body;
        var nWrapH = nWrap.getBoundingClientRect().height;

        if (nWrap.scrollTop + nWrapH >= nWrap.scrollHeight) {
            //加载下一页
            if (!this.loading) {
                if (!this.loading && !this.isLast) {
                    this.props.nextPageHandler(this.page + 1);
                }
            }
        }
    }

    authorClickHandler(e) {
        let authorId = e.currentTarget.dataset['id'];
        this.context.router.push(`/person/${authorId}`);
    }

    followClickHandler(e) {
        let isToFollow = e.currentTarget.dataset['follow'];
        let id = e.currentTarget.dataset['id'];
        this.props.followUserHandler(id, isToFollow !== 'true');

        e.preventDefault();
        e.stopPropagation();
    }

    render() {
        this.page = this.props.page;
        this.isLast = this.props.isLast;
        this.loading = this.props.loading;
        this.items = this.props.items ? this.props.items : [];

        var that = this;

        // "nickName": "吴越",
        // "projectNumber": 0,
        // "avatar": "/image/5722ef4ae4b09fd4197adfdb.jpg",
        // "id": "5720c6d1e4b0d50d21e8dcda",
        // "follow": true,
        // "tutor": true
        let _content = <LoadingBar />;
        if(this.items.length > 0) {
            _content = this.items.map(function (item) {
                        let imageSrc = addImageParam(IMG_CDN_PATH + item.avatar, IMAGE_SIZE_TYPE.AVATAR);

                        return <div className={styles.item} data-id={item.id} key={item.id}
                                    onClick={that.authorClickHandler.bind(that)}>
                            <div className={styles.avatar}>
                                <LazyLoad><img src={imageSrc}/></LazyLoad>
                            </div>
                            <div className={styles.info}>
                                <h4>{item.nickName}</h4>
                                <p>{item.projectNumber}个作品</p>
                            </div>
                            <div onClick={that.followClickHandler.bind(that)} data-id={item.id}
                                 data-follow={item.follow}
                                 className={item.follow ? styles.followed : styles.noFollowed}></div>
                        </div>
                    })
        }else {
            _content = <Result
                    imgUrl="https://o82zr1kfu.qnssl.com/@/image/5886ec6ee4b00ee0df52a06c.png"
                />;
        }
        return (
            <div className={`${styles.listWrap}`}>
                {_content}
            </div>
        );
    }
}

List.contextTypes = {
    router: React.PropTypes.object.isRequired
};

List.propTypes = {};

export default List;


