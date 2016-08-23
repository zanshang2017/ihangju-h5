import React from 'react';

import styles from './styles.css';

import {convertDate} from '../../../utils/util.js';

function TagArticleListItem(props) {
    let item = props.item;
    let modifyTime = convertDate(item.modifyTime);

    //{
    //    appreciateNumber: 0,
    //    authorId: "56efa744e4b047ac630824b1",
    //    authorName: "离线",
    //    browseNumber: 462,
    //    commentNumber: 10,
    //    description: "「但 Google 的成功能否说明， 20 世纪 90 年代后期的悲观情绪仅仅是错的？」",
    //    id: "574833fde4b0960c06605c33",
    //    image: "/image/574833e3e4b086edc812345a.jpg?imageMogr2/thumbnail/!66.66666666666667p/crop/!252.37894736842105x333a162a0",
    //    likeNumber: 0,
    //    isRecommdationProject: true,
    //    modifyTime: 1464349927724,
    //    projectName: "保持对互联网不合时宜的悲观"
    //}

    let recommendationBtn = '';

    if (item.isRecommdationProject) {
        recommendationBtn = <span className={styles.recommendationBtn} data-id={item.id}
                                  onClick={removeRecommendation}>取消推荐</span>
    } else {
        recommendationBtn =
            <span className={styles.recommendationBtn} data-id={item.id} onClick={addRecommendation}>推荐</span>
    }

    function addRecommendation(e) {
        props.recommendationHandler(e.target.dataset.id);
    }

    function removeRecommendation(e) {
        props.recommendationHandler(e.target.dataset.id, {isRemove: true});
    }

    return (
        <div className={styles.articleListItem}>
            <span className={styles.source}><strong>{item.authorName}</strong> 更新了</span>
            {recommendationBtn}
            <h3>{item.projectName}</h3>
            <p>{item.description}</p>
            <div className={styles.info}>
                <div className="fl">
                    <span className="like"><i className="iconfont icon-hearto"></i> {item.likeNumber}</span>
                    <span className="comment"><i className="iconfont icon-message"></i> {item.commentNumber}</span>
                </div>
                <div className="read fr">{modifyTime}</div>
            </div>
        </div>
    );
}

TagArticleListItem.propTypes = {};

export default TagArticleListItem;


