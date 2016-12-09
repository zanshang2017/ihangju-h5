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

import Result from 'antd-mobile/lib/page-result';

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
        //     "projectname": "上传图片专用",
        //     "competencepurview": [{
        //         "id": "57c79b89ad81f618ec4a1a4a",
        //         "title": "电子书"
        //     }],
        //     "agreementid": "583e77e4e4b0fcdbd9f8668e",
        //     "authorname": "小行行呀",
        //     "projectimage": "/image/56dd50f1e4b060f2db4e30ba.png?imageMogr2/thumbnail/!100p/crop/!288x380a0a0",
        //     "authorid": "56ef7757e4b0bf20e0cb7eac",
        //     "projectid": "57fdf75ae4b0223ac11879bf",
        //     "status": "authorize_pending",
        //     // "loading": true
        // };

        let _item = this.props.item;
        let projCover = IMG_CDN_PATH + _item.projectimage; //addImageParam(IMG_CDN_PATH + _item.projectimage, IMAGE_SIZE_TYPE.PROJ_COVER);
        let status = '';

        if (!_item.loading) {
            switch (_item.status) {
                case 'authorize_pending':

                    if (this.props.userId == _item.authorid) {
                        //是版权所有者
                        status = <div className={styles.btns}>
                            <div className={styles.agreeBtn} data-id={_item.agreementid}
                                 onClick={this.props.agreeHandler}>同意
                            </div>
                            <div className={styles.disagreeBtn} data-id={_item.agreementid}
                                 onClick={this.props.disagreeHandler}>拒绝
                            </div>
                        </div>
                    } else {
                        status = <div className={styles.status}>
                            <span>等待作者同意</span>
                            <i className={styles.iconContractPending}></i>
                        </div>;
                    }
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
        } else {
            status = <div className={`${styles.loading} iconLoading`}></div>;
        }

        return (

            <section ref="J_ListItemWrap" className={`${styles.listWrap}`}>
                <Link to={`/projectDetail/${_item.projectid}`} data-hashover="true">
                    <div className={`${styles.projectInfo} clearfix`}>
                        <img src={projCover}/>
                        <h4>{_item.projectname}</h4>
                        <span><i className={styles.iconAvatarDefault}></i>{_item.authorname}</span>
                    </div>
                </Link>

                <div className={styles.divider}>
                    <i className={styles.leftCorn}></i>
                    <i className={styles.rightCorn}></i>
                    <div className={styles.dashLine}></div>
                </div>

                <footer>

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

                    {status}

                </footer>

            </section>
        );
    }
}

ListItem.contextTypes = {
    router: React.PropTypes.object.isRequired
};

ListItem.propTypes = {};

export default ListItem;


