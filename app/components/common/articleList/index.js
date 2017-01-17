import React from 'react';

import styles from './styles.css';

import ArticleListItem from '../ArticleListItem';

function ArticleList(props) {

    var items = props.items || [];

    return (
        <div className={styles.articleList}>
            {
                items.map(function (item, key) {
                    {/*console.log(key, ':', item.id);*/}
                    return <ArticleListItem {...props} item={item} key={item.id} />
                })
            }
        </div>
    );
}

ArticleList.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

export default ArticleList;


