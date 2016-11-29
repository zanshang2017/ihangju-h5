import React from 'react';

import LoadingList from 'components/common/LoadingList';
import ArrowList from 'components/common/ArrowList';

import styles from './styles.css';

export class TagList extends React.Component { // eslint-disable-line react/prefer-stateless-function

    componentDidMount() {
    }

    clickHandler(item) {
        this.context.router.push(`/tag/${item.id}`);
    }

    loadHandler() {
        if (this.props.currentTab == '1') {
            this.props.loadNextHandler();
        }
    }

    render() {

        let data = this.props.searchData ? this.props.searchData.toJS() : {};
        let items = [];

        if (data.tags) {
            data.tags.forEach(function (v, k) {
                let o = {};
                o.text = v.name;
                o.id = v.id;
                items.push(o);
            });
        }

        let list = '';

        this.outer = this.props.outer; // this.refs.J_TagListWrap && this.refs.J_TagListWrap.parentElement;
        this.page = this.props.searchStatus.get('page') || 0;
        this.isLast = this.props.searchStatus.get('isTagsLast') || false;
        this.loading = this.props.searchStatus.get('loading') || false;

        if (items && items.length > 0 && this.outer) {
            list = <LoadingList outer={this.outer}
                         isLast={this.isLast}
                         isLoading={this.loading}
                         loadHandler={this.loadHandler.bind(this)}
                         offset="350">
                <ArrowList items={items} icon="iconTag" clickHandler={this.clickHandler.bind(this)}></ArrowList>
            </LoadingList>
        } else {
            list = <div className={styles.noContent}>没有相应的搜索结果</div>
        }

        return (
            <div ref="J_TagListWrap">
                {list}
            </div>
        )
    }

}

TagList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

TagList.propTypes = {};

export default TagList;


