import React from 'react';
import {Link} from 'react-router';

import styles from './styles.css';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

function CatelogListItem(props) {
    var item = props.item;
    var imageSrc = IMG_CDN_PATH + item.image;

    return (
        <div className={styles.catelogListItemWrap}>
            <Link to={`/tag/${item.tag_id}#fliproute`}>
                <div className={styles.catelogListItem}>
                    <div className={styles.title}>{item.tag_name}</div>
                    <div className={styles.info}>
                        <div className={styles.infoImg}><img src={imageSrc}/></div>
                        <div className={styles.infoDesc}>
                            <div>
                                <strong>{item.attention_number}</strong><span>关注</span>
                            </div>
                            <div>
                                <strong>{item.project_number}</strong><span>作品</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

CatelogListItem.propTypes = {
    item: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ])
};

export default CatelogListItem;


