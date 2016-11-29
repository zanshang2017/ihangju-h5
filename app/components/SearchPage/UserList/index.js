import React from 'react';

import {
    IMG_CDN_PATH
} from 'apis.js';

import LazyLoad from 'react-lazy-load';

import {
    addImageParam,
    IMAGE_SIZE_TYPE
} from 'utils/util.js';

import styles from './styles.css';

import LoadingList from 'components/common/LoadingList';

export class UserList extends React.Component { // eslint-disable-line react/prefer-stateless-function

    componentDidMount() {

    }

    loadHandler() {
        if (this.props.currentTab == '3') {
            this.props.loadNextHandler();
        }
    }

    clickHandler(e) {
        this.context.router.push(`/person/${e.currentTarget.dataset.id}`);
    }

    render() {
        let that = this;
        let data = this.props.searchData ? this.props.searchData.toJS() : {};
        let items = data.users || [];
        let list = '';
        let itemsHtml = '';

        this.outer = this.props.outer; //this.refs.J_SearchResult && this.refs.J_SearchResult.parentElement;
        this.page = this.props.searchStatus.get('page') || 0;
        this.isLast = this.props.searchStatus.get('isUsersLast') || false;
        this.loading = this.props.searchStatus.get('loading') || false;

        // [{  avatar: "/image/5743b85fe4b00243fbd23456.jpg",
        //     description: "行距小管家",
        //     id: "56ef9c3ae4b0bf20e0cb7ed2",
        //     name: "小行行"
        // }, ...]

        if (items && items.length > 0) {
            itemsHtml = items.map(function (item) {
                let imageSrc = addImageParam(IMG_CDN_PATH + item.avatar, IMAGE_SIZE_TYPE.AVATAR);

                return <div className={styles.item}
                            data-hashover="true"
                            data-id={item.id}
                            key={item.id}
                            onClick={that.clickHandler.bind(that)}>
                    <div className={styles.avatar}>
                        <LazyLoad><img src={imageSrc}/></LazyLoad>
                    </div>
                    <div className={styles.info}>
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                    </div>
                    <i className={`${styles.afterIcon} iconRight`}></i>
                </div>
            });

            list = <LoadingList outer={that.outer}
                                isLast={that.isLast}
                                isLoading={that.loading}
                                loadHandler={that.loadHandler.bind(that)}
                                offset="150">
                {itemsHtml}
                <div className="blockGapTag"></div>
            </LoadingList>
        } else {
            list = <div className={styles.noContent}>没有相应的搜索结果</div>
        }

        return (
            <div className={styles.listWrap}>
                {list}
            </div>
        )
    }
}

UserList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

UserList.propTypes = {};

export default UserList;


