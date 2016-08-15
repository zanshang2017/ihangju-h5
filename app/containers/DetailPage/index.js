
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import TopBar from 'components/common/TopBar';
import ProjectDesc from 'components/DetailPage/ProjectDesc';
import ProjectTag from 'components/DetailPage/ProjectTag';

import styles from './style.css';
/* eslint-disable react/prefer-stateless-function */
export default class DetailPage extends React.Component {

  render() {
        return (
            <div className="pageInner hasTopBar">
                <TopBar data-has-back="true">
                    <div data-title>作品详情</div>
                    <div data-btns>
                        <span className={styles.catalog}></span>
                        <span className={styles.share}></span>
                    </div>
                </TopBar>

                <ProjectDesc />
                <ProjectTag items={this.props.projectTag}  />
            </div>
        );
  }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}
export default connect(null, mapDispatchToProps)(DetailPage);
