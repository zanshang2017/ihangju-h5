import styles from './styles.scss';
import React from 'react';

import _ from 'underscore';

import ArticleList3 from 'components/common/ArticleList3';

/* eslint-disable react/prefer-stateless-function */
export default class CollectionList extends React.Component {

    constructor(props) {
        super(props);
        this.scrollHanderBinded = null;
        this.page = 0;
        this.isLast = false;
        this.loading = false;
    }

    componentDidMount() {
        var that = this;
        that.nWrap = that.refs.J_CollectionListWrap.parentElement;

        //滑动底部加载下一页
        that.scrollHanderBinded = _.throttle(that.scrollHandler.bind(that), 300, {leading: false});
        that.nWrap.addEventListener('scroll', that.scrollHanderBinded);
    }

    componentWillUnmount() {
        console.log('Collection List: willUnmount.');

        //移除侦听
        if (this.scrollHanderBinded) {
            this.nWrap.removeEventListener('scroll', this.scrollHanderBinded);
            this.scrollHanderBinded = null;
        }
    }

    scrollHandler(e) {
        var nWrapH = this.nWrap.getBoundingClientRect().height;

        // var nContentH = this.refs.J_CollectionListWrap.getBoundingClientRect().height;
        // console.log(Math.ceil(this.nWrap.scrollTop + nWrapH), this.nWrap.scrollHeight);

        // if (window.debugLog) {
        //     window.debugLog((nWrap.scrollTop + nWrapH) + '>=' +  nWrap.scrollHeight);
        // }

        if (Math.ceil(this.nWrap.scrollTop + nWrapH) >= this.nWrap.scrollHeight) {
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

        return (
            <div ref="J_CollectionListWrap" className={`${styles.listWrap}`}>
                <ArticleList3 items={this.items} authorClickHandler={this.authorClickHandler.bind(this)}></ArticleList3>
            </div>
        );
    }
}

CollectionList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

CollectionList.propTypes = {};

export default CollectionList;


