import styles from './styles.scss';
import React from 'react';
import {Link} from 'react-router';

import {
    IMG_CDN_PATH
} from '../../../apis.js';

import {
    addImageParam,
    IMAGE_SIZE_TYPE
} from 'utils/util.js';

/* eslint-disable react/prefer-stateless-function */
class ListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render() {
        // var _item = {
        //     "serviceproviderid": "576572ade4b07f763d3fee8d",
        //     "projectname": "123123123123123123",
        //     "competencepurview": [{
        //         "id": "57c79b89ad81f618ec4a1a4a",
        //         "title": "电子书"
        //     }, {
        //         "id": "57c79ba1ad81f618ec4a1a4b",
        //         "title": "出版"
        //     }],
        //     "agreementid": "582e79d6e4b05aec2a84365c",
        //     "authorname": "十三.",
        //     "projectimage": "/image/56dd50f1e4b060f2db4e30ba.png?imageMogr2/thumbnail/!100p/crop/!288x380a0a0",
        //     "authorid": "56ef7757e4b0bf20e0cb7eac",
        //     "projectid": "582e71ede4b05aec2a84364a",
        //     "serviceprovidername": "服务商",
        //     "serviceprovideravatar": "/image/57fef683e4b0d5d5f4825696.jpg",
        //     "status": "authorize_affirmance"
        // };

        let _item = this.props.item;
        let avatar = addImageParam(IMG_CDN_PATH + _item.serviceprovideravatar, IMAGE_SIZE_TYPE.AVATAR_SMALL);
        let projCover = IMG_CDN_PATH + _item.projectimage; //addImageParam(IMG_CDN_PATH + _item.projectimage, IMAGE_SIZE_TYPE.PROJ_COVER);
        let status = '';

        switch (_item.status) {
            case 'authorize_pending':
                status = <div className={styles.status}>
                    <span>等待作者同意</span>
                    <i className={styles.iconContractPending}></i>
                </div>;
                break;

            case 'authorize_affirmance':
                status = <div className={styles.status}>
                    <span>已签约</span>
                    <i className={styles.iconContractFinished}></i>
                </div>
                break;

            case 'authorize_refusal':
                status = <div className={styles.status}>
                    <span>已拒绝</span>
                    <i className={styles.iconContractRefusal}></i>
                </div>
                break;

            default:
                break;
        }

        return (
            <section ref="J_ListItemWrap" className={`${styles.listWrap}`}>
                <header>
                    <div className={styles.author}>
                        <Link to={`/person/${_item.serviceproviderid}`}>
                            <img src={avatar}/>
                            <span>{_item.serviceprovidername}</span>
                        </Link>
                    </div>

                    {status}

                    <div className={styles.purview}>
                        <div className={`iconAuthorization ${styles.iconAuthorizationCfg}`}>
                            作品授权
                        </div>
                        <ul>
                            {
                                _item.competencepurview.map(function (v) {
                                    return <li key={v.id}>{v.title}</li>
                                })
                            }
                        </ul>
                    </div>
                </header>
                <div className={styles.divider}>
                    <i className={styles.leftCorn}></i>
                    <i className={styles.rightCorn}></i>
                    <div className={styles.dashLine}></div>
                </div>

                <Link to={`/projectDetail/${_item.projectid}`} data-hashover="true">
                    <div className={`${styles.projectInfo} clearfix`}>
                        <img src={projCover} className="clearfix"/>
                        <h4>{_item.projectname}</h4>
                        <span>作者:{_item.authorname}</span>
                    </div>
                </Link>

            </section>
        )
            ;
    }
}

ListItem.contextTypes = {
    router: React.PropTypes.object.isRequired
};

ListItem.propTypes = {
    item: React.PropTypes.object.isRequired
};

export default ListItem;


