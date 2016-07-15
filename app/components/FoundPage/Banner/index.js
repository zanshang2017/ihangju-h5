import React from 'react';

import styles from './styles.css';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

import { Carousel } from 'antd';

function Banner(props) {

    if( !props.items ){
        //todo +loading动画
        return <div className={styles.banner}></div>;
    }

    return (
        <div className={styles.banner}>
            <Carousel>
                {
                    props.items.map(function (item, key) {
                        var imageSrc = IMG_CDN_PATH + item.image;
                        return <div key={key}><img src={imageSrc} /></div>
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
    ])
};

export default Banner;


