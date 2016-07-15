import React from 'react';

import styles from './styles.css';

function ArticleListItem(props) {
    var item = props.item;

    return (
        <div className={styles.articleListItem}>
            <h3>{item.projectName}</h3>
            <span className={styles.author}>{item.authorName}</span>
            <p>{item.description}</p>
            <div className={styles.info}>
                <div className="fl">
                    <a href="javascript:;">分享</a>
                    <span className="like">{item.likeNumber}</span>
                    <span className="comment">{item.commentNumber}</span>
                </div>
                <div className="read fr">
                    阅读&nbsp;{item.browseNumber}
                </div>
            </div>
            <div className={styles.itemType}>作品</div>
        </div>
    );
}

ArticleListItem.propTypes = {

};

export default ArticleListItem;


