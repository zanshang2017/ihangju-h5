import styles from './styles.scss';
import React from 'react';

import LazyLoad from 'react-lazy-load';

import {
    addImageParam,
    IMAGE_SIZE_TYPE,
} from 'utils/util.js';

import _ from 'underscore';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

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

        that.nWrap = that.refs.J_ListWrap;
        that.nScrollOuter = that.nWrap.parentElement;

        //滑动底部加载下一页
        that.scrollHanderBinded = _.throttle(that.scrollHandler.bind(that), 300, {leading: false});
        that.nScrollOuter.addEventListener('scroll', that.scrollHanderBinded);
    }

    componentWillUnmount() {
        console.log('Collection List: willUnmount.');

        //移除侦听
        if (this.scrollHanderBinded) {
            this.nScrollOuter.removeEventListener('scroll', this.scrollHanderBinded);
            this.scrollHanderBinded = null;
        }
    }

    scrollHandler(e) {
        var nWrapH = this.nWrap.getBoundingClientRect().height;
        var nOuterH = this.nScrollOuter.getBoundingClientRect().height;

        // console.log(Math.ceil((this.nScrollOuter.scrollTop + nOuterH) - nWrapH) > 0);

        if (Math.ceil((this.nScrollOuter.scrollTop + nOuterH) - nWrapH) >= 0) {
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

    render() {
        this.page = this.props.page;
        this.isLast = this.props.isLast;
        this.loading = this.props.loading;
        this.items = this.props.items ? this.props.items : [];

        var that = this;

        //     "nickName": "丝丝张",
        //     "projectNumber": 0,
        //     "avatar": "/image/571dc8a4e4b00659abdd0300.jpg",
        //     "id": "571dc841e4b0d50d21e7b566",
        //     "follow": true,
        //     "tutor": true

        return (
            <div ref="J_ListWrap" className={`${styles.listWrap}`}>
                {
                    this.items.map(function (item) {
                        let imageSrc = addImageParam(IMG_CDN_PATH + item.avatar, IMAGE_SIZE_TYPE.AVATAR_SMALL);

                        return <div className={styles.item} data-id={item.id} key={item.id}
                                    onClick={that.authorClickHandler.bind(that)}>
                            <div className={styles.avatar}>
                                <LazyLoad>
                                    <img src={imageSrc}/>
                                </LazyLoad>
                            </div>
                            <div className={styles.info}>
                                <h4>{item.nickName}</h4>
                                <p>{item.projectNumber}个作品</p>
                            </div>
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


