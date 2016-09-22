import React from 'react';

import styles from './styles.css';

export class TagDesc extends React.Component { // eslint-disable-line react/prefer-stateless-function

    getDesc() {
        return this.refs.J_DescTextarea.value;
    }

    render() {

        let _desc = this.props.description || '';
        let _html = '';

        if (this.props.isEditing) {
            _html = <div className={`${styles.tagDesc} blockGap`}>
                <textarea ref="J_DescTextarea" defaultValue={_desc} placeholder="请输入标签简介"></textarea>
            </div>;
        } else {
            _html = <div className={`${styles.tagDesc} blockGap`}>
                {_desc}
            </div>;
        }

        return (
            _html
        )
    }

}

TagDesc.propTypes = {
    //info: React.PropTypes.object
};

export default TagDesc;


