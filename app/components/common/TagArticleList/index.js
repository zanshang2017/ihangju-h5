import React from 'react';

import styles from './styles.css';

import TagArticleListItem from '../TagArticleListItem';

import Result from 'antd-mobile/lib/page-result';

function TagArticleList(props) {

    var items = (props.items && props.items.toJS) ? props.items.toJS() : [];
// console.log(items);

    var noContent = '';

    if (!items || items.length === 0) {
        //todo 替换图片
        noContent = <Result
            imgUrl="https://os.alipayobjects.com/rmsportal/MKXqtwNOLFmYmrY.png"
            title="内容为空"
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


