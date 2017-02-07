/*
 * GuidePage
 */

import React from 'react';
import {connect} from 'react-redux';
import {Env} from 'utils/env.js';
import {router} from 'react-router';

import styles from './styles.scss';

import Carousel from 'antd-mobile/lib/carousel';
import Flex from 'antd-mobile/lib/flex';

/* eslint-disable react/prefer-stateless-function */
class GuidePage extends React.Component {

    constructor() {
        super();
        this.images = __APP_CONFIG.guide.images;
        this.guideStyle = __APP_CONFIG.guide.style;

        for (let k in this.images) {
            if (this.images.hasOwnProperty(k)) {
                let item = this.images[k];
                item.width = k.split('x')[0];
                item.height = k.split('x')[1];
                item.ratio = item.width / item.height;
            }
        }
    }

    componentDidMount() {
        console.warn('GuidePage DidMount');
    }

    componentWillUnmount() {
    }

    beforeChange(from, to) {
        var that = this;
        var last = this.guideImages.length - 1;

        if (from === last) {
            that.refs.J_EnterBtn.classList.add('transparent', 'hide');
        }

        if (to === last) {
            that.refs.J_EnterBtn.classList.remove('hide');
            setTimeout(function () {
                that.refs.J_EnterBtn.classList.remove('transparent');
            }, 0);
        }
    }

    clickEnterBtnHandler() {
        this.context.router.replace('/');
    }

    render() {
        var that = this;
        var _width = document.documentElement.clientWidth;
        var _height = document.documentElement.clientHeight;

        var deviceWidth = _width * window.devicePixelRatio;
        var deviceHeight = _height * window.devicePixelRatio;

        if (this.images[deviceWidth + 'x' + deviceHeight]) {
            this.guideImages = this.images[deviceWidth + 'x' + deviceHeight].imgs;
        } else {
            this.guideImages = (window.devicePixelRatio > 2 ? this.images['1080x1920'].imgs : this.images['720x1080'].imgs);
        }

        var clientRatio = _width / _height;
        var imgStyle = null;

        if (that.images.ratio > clientRatio) { // 从宽
            imgStyle = {
                width: _width + 'px'
            }
        } else { // 从高
            imgStyle = {
                height: _height + 'px'
            }
        }

        var bgStyle = {
            backgroundColor: this.guideStyle.background
        };

        const settings = {
            dots: true,
            autoplay: false,
            infinite: false,
            framePadding: '0px',
            beforeChange: that.beforeChange.bind(that),
            // afterChange: that.afterChange,
        };

        return (
            <div className="pageInner">
                <div className="mainContent" style={bgStyle}>
                    <div className={styles.guideImage}>
                        <Carousel {...settings}>
                            {
                                that.guideImages.map(function (img, key) {
                                    var imageSrc = img;
                                    return <Flex
                                        key={key}
                                        justify="center"
                                        align="center"
                                        className="flex-container-justify"
                                    >
                                        <div>
                                            <img src={imageSrc} style={imgStyle}/>
                                        </div>
                                    </Flex>
                                })
                            }
                        </Carousel>
                        <div ref="J_EnterBtn" className={`${styles.enterBtn} transparent hide`}
                             onClick={that.clickEnterBtnHandler.bind(that)}>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        )
            ;
    }
}

GuidePage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(null, mapDispatchToProps)(GuidePage);
