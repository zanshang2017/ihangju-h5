/**
 * demoPage
 */

import 'babel-polyfill';

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { selectDemoPage, selectDemoPageList } from './selectors';
import styles from './styles.css';

import TopBar from 'components/DemoPage/TopBar'
import DemoList from 'components/DemoPage/DemoList'

import Button from 'antd-mobile/lib/button';

import {
    delItem,
    loadList
} from './actions';


export class DemoPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

    delItemHandler = (index) => {
        this.props.dispatch(delItem(index));
    }

    componentDidMount() {
        this.props.dispatch(loadList());
        console.warn('DemoPage DidMount');
    }

    render() {

        let pageInnerClass = 'pageInner';

        return (
            <div className={`${pageInnerClass} ${styles.demoPage}`}>
                {/*<TopBar items={this.props.items} delItemHandler={this.delItemHandler}/>*/}
                {/*<DemoList items={this.props.listItems}></DemoList>*/}
                <Button type="primary">哈哈</Button>
                <Button type="primary" ghost>哈哈</Button>
            </div>
        );
    }
}

const mapStateToProps = createSelector(
    selectDemoPage(),
    selectDemoPageList(),
    (items, listItems) => {
        return {
            items,
            listItems,
        }
    }
);

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DemoPage);
