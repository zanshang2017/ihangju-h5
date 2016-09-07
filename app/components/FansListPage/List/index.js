import styles from './styles.scss';
import React from 'react';

import _ from 'underscore';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

/* eslint-disable react/prefer-stateless-function */
export default class List extends React.Component {

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
        var winH = document.body.clientHeight;
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
            <div className={`${styles.listWrap}`}>
                {
                    this.items.map(function (item) {
                        let imageSrc = IMG_CDN_PATH + item.avatar;

                        return <div className={styles.item} data-id={item.id} key={item.id} onClick={that.authorClickHandler.bind(that)}>
                            <div className={styles.avatar}>
                                <img src={imageSrc}/>
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


