import styles from './styles.scss';
import React from 'react';

/* eslint-disable react/prefer-stateless-function */
export default class FloatTools extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    clickHandler(e) {
        this.refs.J_Wrap.style.display = 'none';
    }

    render() {
        let that = this;

        return (
            <div ref="J_Wrap" className={styles.wrap} style={{display:'none'}} onClick={this.clickHandler.bind(this)}>
                <div ref="J_Tools" className={styles.tools}>
                    <span onClick={this.props.clickReplyHandler}>回复</span>
                    <i></i>
                    <span onClick={this.props.clickReportHandler}>举报</span>
                </div>

                <div className={styles.mask}></div>
            </div>
        );
    }
}

FloatTools.contextTypes = {
    router: React.PropTypes.object.isRequired
};

FloatTools.propTypes = {
    clickReplyHandler: React.PropTypes.func.isRequired,
    clickReportHandler: React.PropTypes.func.isRequired,
};

export default FloatTools;


