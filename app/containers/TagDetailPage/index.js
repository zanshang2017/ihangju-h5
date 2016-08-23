/*
 *
 * TagDetailPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import selectTagDetailPage from './selectors';
import TopBar from 'components/common/TopBar';
import BannerInfo from 'components/TagDetailPage/BannerInfo';
import TagDesc from 'components/TagDetailPage/TagDesc';
import ListGroup from 'components/TagDetailPage/ListGroup';

import styles from './styles.css';

export class TagDetailPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    handleEdit() {
        alert('Todo 编辑');
    }

    componentDidMount() {
        console.log(this.props.routeParams);
        if (this.props.routeParams) {
            var id = this.props.routeParams.id;
        }
    }

    render() {

        return (
            <div className="pageInner hasTopBar">
                <TopBar data-has-back="true">
                    <div data-title>标签详情</div>
                    <div data-btns>
                        <div onClick={this.handleEdit}>编辑</div>
                    </div>
                </TopBar>

                <BannerInfo />
                <TagDesc />
                <ListGroup />

            </div>
        );
    }
}

//const mapStateToProps = selectTagDetailPage();

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(createSelector(
    selectTagDetailPage(),
    (tagDetailPage) => ({tagDetailPage})
), mapDispatchToProps)(TagDetailPage);
//export default connect(null, mapDispatchToProps)(TagDetailPage);
