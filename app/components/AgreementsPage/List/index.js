import styles from './styles.scss';
import React from 'react';

import LoadingBar from 'components/common/LoadingBar';
import ListItem from 'components/AgreementsPage/ListItem';

import Result from 'antd-mobile/lib/page-result';

/* eslint-disable react/prefer-stateless-function */
class List extends React.Component {

    constructor(props) {
        super(props);
        this.hasData = false;
    }

    componentWillUnmount() {
        console.log('Collection List: willUnmount.');
    }

    componentDidUpdate() {
        if (this.props.setBg) {
            this.props.setBg(!this.hasData);
        }
    }

    render() {
        let projs = this.props.agreements ? this.props.agreements.toJS() : {};
        let items = projs.data ? projs.data : [];
        let loading = projs.loading || false;
        let _content = <LoadingBar />;

        if (!loading) {
            if (items.length > 0) {
                _content = items.map(function (v) {
                    return <ListItem key={v.agreementid} item={v}></ListItem>
                });

                this.hasData = true;

            } else {
                _content = <Result
                    imgUrl="https://o82zr1kfu.qnssl.com/@/image/584785a3e4b0281dbb591352.png"
                    title="还没有版权哦~"
                />;

                this.hasData = false;
            }
        }

        return (
            <div ref="J_ListWrap" className={`${styles.listWrap}`}>
                {_content}
            </div>
        );
    }
}

List.contextTypes = {
    router: React.PropTypes.object.isRequired
};

List.propTypes = {};

export default List;


