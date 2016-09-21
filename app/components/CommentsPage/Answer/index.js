import styles from './styles.scss';
import React from 'react';

import {convertDate} from '../../../utils/util.js';

/* eslint-disable react/prefer-stateless-function */
export default class Answer extends React.Component {

    constructor(props) {
        super(props);
        // 目前无分页
        this.loading = false;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    clickHandler(e) {
        let id = e.currentTarget.dataset['id'];
        let name = e.currentTarget.dataset['name'];
        let type = 'to_answer';

        console.log('answer click', type, name, id);
        this.props.listClickHandler(e, {id, name, type});

        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        let that = this;
        this.items = this.props.items ? this.props.items : [];

        //     {
        //         "id": "57cfd67fe4b0857f686c0313",
        //         "content": "hū\uD83D\uDC2F",
        //         "fromUserId": "571dab71e4b0d50d21e7a9fc",
        //         "fromUserName": "门神4",
        //         "toUserName": "门神4",
        //         "toUserId": "571dab71e4b0d50d21e7a9fc"
        //     }

        return (
            <div className={`${styles.listWrap}`}>
                {
                    this.items.map(function (item) {
                        return <div className={`${styles.listItem}`} key={item.id}>
                            <span className={styles.basis} data-id={item.id} data-name={item.fromUserName} onClick={that.clickHandler.bind(that)}>
                                {item.fromUserName}回复{item.toUserName}: {item.content}
                                <i className={styles.arrow}></i>
                            </span>
                        </div>
                    })
                }
            </div>
        );
    }
}

Answer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

Answer.propTypes = {};

export default Answer;


