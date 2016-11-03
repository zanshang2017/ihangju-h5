import styles from './styles.scss';

import React from 'react';

import {
    IMG_CDN_PATH
} from 'apis.js';

import {
    CHOICE_TYPE
} from 'containers/FollowRecommendationPage/constants';

import {
    addImageParam
} from 'utils/util';

const CLS_SELECTED = 'recommendation-tag-selected';

/* eslint-disable react/prefer-stateless-function */
class TagList extends React.Component {

    constructor(props) {
        super(props);
        this.selected = [];
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    clickHandler(e) {
        let node = e.currentTarget;
        // let btn = node.getElementsByTagName('button')[0];
        let tagId = node.dataset['id'];
        this.props.toggleSelect(tagId, CHOICE_TYPE.TAGS);
    }

    render() {
        let that = this;
        this.items = this.props.items ? this.props.items : [];

        // {
        //  image: "/image/5735c621e4b0a12f0a73cbf8.jpg"
        //  id:"5735c5a6e4b0afac484d5249"
        //  name: "收获"
        // }

        return (
            <div className={`${styles.listWrap}`}>
                {
                    this.items.map(function (item) {

                        let imageSrc = '';

                        if (item.image) {
                            imageSrc = addImageParam(IMG_CDN_PATH + (item.image));
                        }

                        return <div className={styles.listItemWrap} data-id={item.id} key={item.id}
                                    onClick={that.clickHandler.bind(that)}>
                            <div className={styles.logo}>
                                <div className={styles.shadow}></div>
                                {
                                    imageSrc ? <img src={imageSrc}/> : ''
                                }
                            </div>
                            <h3>{item.name}</h3>
                            <button className={item.selected ? CLS_SELECTED : ''}></button>
                        </div>
                    })
                }
            </div>
        );
    }
}

TagList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

TagList.propTypes = {
    toggleSelect: React.PropTypes.func.isRequired
};

export default TagList;


