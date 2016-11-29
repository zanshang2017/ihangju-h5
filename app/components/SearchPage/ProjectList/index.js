import React from 'react';

import styles from './styles.css';

import LoadingList from 'components/common/LoadingList';
import ArticleList from 'components/common/ArticleList';

export class ProjectList extends React.Component { // eslint-disable-line react/prefer-stateless-function

    componentDidMount() {

    }

    loadHandler() {
        if (this.props.currentTab == '2') {
            this.props.loadNextHandler();
        }
    }

    clickHandler(e) {
        this.context.router.push(`/projectDetail/${e.currentTarget.dataset.id}`);
    }

    render() {

        let data = this.props.searchData ? this.props.searchData.toJS() : {};
        let items = data.projects || [];
        let list = '';

        this.outer = this.props.outer; //this.refs.J_SearchResult && this.refs.J_SearchResult.parentElement;
        this.page = this.props.searchStatus.get('page') || 0;
        this.isLast = this.props.searchStatus.get('isProjectsLast') || false;
        this.loading = this.props.searchStatus.get('loading') || false;

        if (this.page == 0 && items.length == 0 && this.outer) {
            list = <div className={styles.noContent}>没有相应的搜索结果</div>
        } else {
            console.log(this.outer, this.isLast, this.loading)
            list = <LoadingList outer={this.outer}
                                isLast={this.isLast}
                                isLoading={this.loading}
                                loadHandler={this.loadHandler.bind(this)}
                                offset="150">
                <ArticleList items={items} articleClickHandler={this.clickHandler.bind(this)}/>
            </LoadingList>;
        }

        return (
            <div ref="J_ProjectListWrap">
                {list}
            </div>
        )
    }

}

ProjectList.contextTypes = {
    router: React.PropTypes.object.isRequired
};

ProjectList.propTypes = {};

export default ProjectList;


