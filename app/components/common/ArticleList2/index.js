import React from 'react';

import styles from './styles.css';

import ArticleListItem2 from '../ArticleListItem2';

function ArticleList2(props) {

    var items = props.items || [];

    return (
        <div className={styles.articleList}>
            {
                items.map(function (item, key) {
                    return <ArticleListItem2 {...props} item={item} key={item.projectId} />
                })
            }
        </div>
    );
}

ArticleList2.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

export default ArticleList2;


