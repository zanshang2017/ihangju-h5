import React from 'react';

import styles from './styles.css';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

import {
    addImageParam,
    IMAGE_SIZE_TYPE
} from 'utils/util.js';

import Carousel from 'antd-mobile/lib/carousel';

function Banner(props) {
    if (!props.items) {
        return <div className={styles.banner}></div>;
    }

    let imageSrc = '';

    return (
        <div className={styles.banner}>
            <Carousel autoplay="true" infinite="true">
                {
                    props.items.map(function (item, key) {
                        imageSrc = addImageParam(IMG_CDN_PATH + item.image, IMAGE_SIZE_TYPE.BANNER_IMAGE);
                        return <div key={key} data-id={item.target} onClick={props.articleClickHandler}>
                            <img src={imageSrc}/>
                        </div>
                    })
                }
            </Carousel>
        </div>
    );
}

Banner.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ]),
    articleClickHandler: React.PropTypes.func
};

export default Banner;


