import styles from './styles.scss';
import React from 'react';

import _ from 'underscore';

import ArticleList3 from 'components/common/ArticleList3';
import Result from 'antd-mobile/lib/page-result';

/* eslint-disable react/prefer-stateless-function */
class CollectionList extends React.Component {

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
        console.log(Math.ceil(this.nWrap.scrollTop + nWrapH), this.nWrap.scrollHeight);

        // if (window.debugLog) {
        //     window.debugLog((nWrap.scrollTop + nWrapH) + '>=' +  nWrap.scrollHeight);
        // }
        var dist = this.nWrap.scrollHeight - (this.nWrap.scrollTop + nWrapH);

        if (dist <= 200 && !this.loading && !this.isLast) {
            //加载下一页
            this.props.nextPageHandler(this.page + 1);
        }
    }

    authorClickHandler(e) {
        let authorId = e.currentTarget.dataset['id'];
        this.context.router.push(`/person/${authorId}`);
        e.stopPropagation();
        e.preventDefault();
    }

    articleClickHandler(e) {
        let projectId = e.currentTarget.dataset['id'];
        this.context.router.push(`/projectDetail/${projectId}`);
    }

    render() {
        this.page = this.props.page;
        this.isLast = this.props.isLast;
        this.loading = this.props.loading;
        this.items = this.props.items ? this.props.items : [];

        let listHtml = <Result
            imgUrl="https://o82zr1kfu.qnssl.com/@/image/5813164ee4b0edf1e7b90b15.png?imageMogr2/auto-orient/"
            title="还没有收藏过文章哦~"
        />;

        if (this.items.length > 0) {
            listHtml = <ArticleList3 items={this.items}
                                     articleClickHandler={this.articleClickHandler.bind(this)}
                                     authorClickHandler={this.authorClickHandler.bind(this)}></ArticleList3>
        }

        return (
            <div ref="J_CollectionListWrap" className={`${styles.listWrap}`}>
                {listHtml}
            </div>
        );
    }
}

CollectionList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

CollectionList.propTypes = {};

export default CollectionList;


