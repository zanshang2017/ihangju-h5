import React from 'react';

import ArrowList from 'components/common/ArrowList';

import styles from './styles.css';

export class HistoryList extends React.Component { // eslint-disable-line react/prefer-stateless-function

    componentDidMount() {
    }

    searchHandler(item) {
        this.props.searchHandler(item.text);
    }

    render() {

        this.items = this.props.items ? this.props.items.toJS() : [];
        let _html = <div></div>;

        if (this.items && this.items.length > 0) {

            let data = [];

            this.items.forEach(function (v) {
                let o = {};
                o.text = v;
                data.push(o);
            });

            _html = <div>
                <ArrowList items={data} icon="iconSearch" clickHandler={this.searchHandler.bind(this)}></ArrowList>
                <div data-hashover="true" className={styles.removeHistory} onClick={this.props.removeAllHistoryHandler}>
                    清除历史记录
                </div>
            </div>
        }

        return (
            <div>
                {_html}
            </div>
        )
    }

}

HistoryList.propTypes = {};

export default HistoryList;


