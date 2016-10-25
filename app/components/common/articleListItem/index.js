import React from 'react';

import styles from './styles.css';

import {convertDate} from '../../../utils/util.js';

function ArticleListItem(props) {
    let item = props.item;
    let source = [];

    item.sources.forEach(function (v, k) {
        source.push(v.name);
    });

    let modifyTime = convertDate(item.modifyTime, 'YYYY-MM-DD');

    //    {
    //        "browsNumber": 24,
    //        "commentNumber": 1,
    //        "modifyTime": 1464513347761,
    //        "sources": [{
    //            "name": "温润",
    //            "id": "57381461e4b0afac484dcbe9",
    //            "type": "user"
    //        }, {
    //            "name": "小说",
    //            "id": "569c59bde4b0e66de0ec4a99",
    //            "type": "tag"
    //        }],
    //        "description": "一个寒冷阴郁的冬日，医院门口，一个包裹严实的女人和一个稚气未脱的女孩，还有一个瘦小的男人，费力地招呼着出租车……",
    //        "id": "574ab02ae4b0960c06612328",
    //        "projectName": "那是冬天",
    //        "likeNumber": 0
    //    }

    return (
        <div className={styles.articleListItem} data-id={item.id} onClick={props.articleClickHandler}>
            <span className={styles.source}><strong>{source}</strong> 更新了</span>
            <div className={styles.read}>{modifyTime}</div>
            <h3>{item.projectName}</h3>
            <p>{item.description}</p>
            <div className={styles.info}>
                <div className="fl">
                    <span className="like"><i className="iconfont icon-hearto"></i> {item.likeNumber}</span>
                </div>
                <div className="fr">
                    {item.browsNumber || 0}人已阅读
                </div>
            </div>
        </div>
    );
}

ArticleListItem.propTypes = {};

export default ArticleListItem;


