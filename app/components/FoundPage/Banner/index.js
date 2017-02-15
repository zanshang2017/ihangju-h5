import React from 'react';
import {connect} from 'react-redux';
import styles from './styles.css';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

import {
    addImageParam,
    IMAGE_SIZE_TYPE
} from 'utils/util.js';

import Carousel from 'antd-mobile/lib/carousel';

export class Banner extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.items) {
            if (this.props.items.length != nextProps.items.length) {
                return true;
            }

            if(this.isSameBanner(this.props.items, nextProps.items)) {
                return false;
            }
        }

        return true;
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    isSameBanner(o1, o2) {
        if (o1 && o2) {
            for (let i = 0; i < o1.length; i++) {
                for (let k in o1[i]) {
                    if (o1[i].hasOwnProperty(k)) {
                        if (o1[i][k] != o2[i][k]) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    render() {
        let that = this;

        if (!this.props.items) {
            return (
                <div className={styles.banner}></div>
            );
        }

        let imageSrc = '';

        let bannerItems = this.props.items.map(function (item, key) {
            imageSrc = addImageParam(IMG_CDN_PATH + item.image, IMAGE_SIZE_TYPE.BANNER_IMAGE);
            return <div key={key} data-target={item.target} data-type={item.type} onClick={that.props.articleClickHandler}>
                <img src={imageSrc}/>
            </div>
        });

        return (
            <div className={styles.banner}>
                <Carousel ref="J_Carousel" autoplay="true" infinite="true" autoplayInterval="1000" mode="banner">
                    {bannerItems}
                </Carousel>
            </div>
        );

    }
}

Banner.propTypes = {
    items: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ]),
    articleClickHandler: React.PropTypes.func
};


export default connect()(Banner);
