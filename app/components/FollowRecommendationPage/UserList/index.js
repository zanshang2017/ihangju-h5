import styles from './styles.scss';

import React from 'react';

import {
    IMG_CDN_PATH
} from 'apis.js';

import {
    CHOICE_TYPE
} from 'containers/FollowRecommendationPage/constants';

const CLS_SELECTED = 'recommendation-user-selected';

import {
    addImageParam,
    IMAGE_SIZE_TYPE,
} from 'utils/util';

/* eslint-disable react/prefer-stateless-function */
class UserList extends React.Component {

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
        let userId = node.dataset['id'];

        this.props.toggleSelect(userId, CHOICE_TYPE.USERS);
    }

    render() {
        let that = this;
        this.items = this.props.items ? this.props.items : [];

        // {
        //  avatar: "/image/5735c621e4b0a12f0a73cbf8.jpg"
        //  description:null
        //  id:"5735c5a6e4b0afac484d5249"
        //  name: "吴飞"
        // }
        return (
            <div className={`${styles.listWrap}`}>
                {
                    this.items.map(function (item) {
                        let imageSrc = addImageParam(IMG_CDN_PATH + item.avatar, IMAGE_SIZE_TYPE.AVATAR_SMALL);

                        return <div className={styles.listItemWrap} key={item.id}>
                            <div className={styles.listItem}>
                                <div className={styles.item}>
                                    <div className={styles.avatar}>
                                        <img src={imageSrc}/>
                                    </div>
                                    <div className={styles.info}>
                                        <h4>{item.name || ''}</h4>
                                        <p>{item.description || ''}</p>
                                    </div>
                                    <div className={styles.followBtn}>
                                        <button className={item.selected ? CLS_SELECTED : ''} data-id={item.id}
                                                onClick={that.clickHandler.bind(that)}>
                                            <i className="iconfont icon-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        );
    }
}

UserList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

UserList.propTypes = {
    toggleSelect: React.PropTypes.func.isRequired
};

export default UserList;


