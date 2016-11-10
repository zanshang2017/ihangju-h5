import React from 'react';

import styles from './styles.css';

import TagArticleListItem from '../TagArticleListItem';

function TagArticleList(props) {

    var items = (props.items && props.items.toJS) ? props.items.toJS() : [];
// console.log(items);

    return (
        <div className={styles.articleList}>
            {
                items.map(function (item) {
                    return <TagArticleListItem {...props} item={item} key={item.id}/>
                })
            }
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


