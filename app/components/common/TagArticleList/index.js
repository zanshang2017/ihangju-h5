import React from 'react';

import styles from './styles.css';

import TagArticleListItem from '../TagArticleListItem';

import Result from 'antd-mobile/lib/page-result';

function TagArticleList(props) {

    var items = (props.items && props.items.toJS) ? props.items.toJS() : [];
// console.log(items);

    var noContent = '';

    if (!items || items.length === 0) {
        noContent = <Result
            imgUrl="https://o82zr1kfu.qnssl.com/@/image/5813164ee4b0edf1e7b90b15.png?imageMogr2/auto-orient/"
            title="还没有内容哦~"
        />;
    }

    return (
        <div className={styles.articleList}>
            {
                items.map(function (item) {
                    return <TagArticleListItem {...props} item={item} key={item.id}/>
                })
            }
            {noContent}
        </div>
    );
}

TagArticleList.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

export default TagArticleList;


