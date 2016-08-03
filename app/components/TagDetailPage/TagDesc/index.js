import React from 'react';

import styles from './styles.css';

function TagDesc(props) {

    //if (!props.items) {
    //    return <div className={styles.bannerDesc}></div>;
    //}

    let desc = '《收获》是1957年7月创办的一份。《收获》是1957年7月创办的一份。《收获》是1957年7月创办的一份。《收获》是1957年7月创办的一份。《收获》是1957年7月创办的一份。';

    let browseHTML = <div className={`${styles.tagDesc} blockGap`}>
                        {desc}
                    </div>;

    let editHTML = '';

    return (
        browseHTML
    );
}

TagDesc.propTypes = {
    //info: React.PropTypes.object
};

export default TagDesc;


