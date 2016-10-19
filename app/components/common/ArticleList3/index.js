import React from 'react';

import styles from './styles.css';

import ArticleListItem3 from '../ArticleListItem3';

function ArticleList3(props) {

    var items = props.items || [];

    return (
        <div className={styles.articleList}>
            {
                items.map(function (item, key) {
                    return <div>
                        <ArticleListItem3 {...props} item={item} key={item.projectId}/>
                        <div className="blockGapTag"></div>
                    </div>
                })
            }
        </div>
    );
}

ArticleList3.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

export default ArticleList3;


