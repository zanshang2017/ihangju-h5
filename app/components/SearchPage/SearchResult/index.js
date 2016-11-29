import React from 'react';

import ProjectList from 'components/SearchPage/ProjectList'
import TagList from 'components/SearchPage/TagList'
import UserList from 'components/SearchPage/UserList'

import styles from './styles.css';

export class SearchResult extends React.Component { // eslint-disable-line react/prefer-stateless-function

    render() {
        let curTab = this.props.currentTab;

        return (
            <div>
                <div className={${curTab == 1 ? '' : 'hide'} 'mainContent'}>
                    <TagList {...this.props} />
                </div>
                <div className={${curTab == 2 ? '' : 'hide'} 'mainContent'}>
                    <ProjectList {...this.props} />
                </div>
                <div className={${curTab == 3 ? '' : 'hide'} 'mainContent'}>
                    <UserList {...this.props} />
                </div>
            </div>
        )
    }

}

SearchResult.propTypes = {};

export default SearchResult;


