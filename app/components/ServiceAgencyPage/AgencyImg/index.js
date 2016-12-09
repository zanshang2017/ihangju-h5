import React from 'react';
import styles from '../../ServicePersonalpage/PersonalImg/style.css';

import {
    addImageParam,
    IMAGE_SIZE_TYPE,
} from 'utils/util.js';
import {
    IMG_CDN_PATH
} from 'apis.js';
import ImageUpload from 'components/common/ImageUpload';

class AgencylImg extends React.Component {
    constuctor(props) {
        supor(props);
        this._resultJS = {};
        this._resultData = {};
        this.assignObj = {};
    }
    cardBusinessClickHandler() {
        this.clickCard = 'business';
        this.refs.J_ImageUpload.showSheet();   
    }
    editAvatarImageHandler(url) {
        this._resultData.businesslicense = [];
        this._resultData.businesslicense.push(url);
        this.dispatchData();
    }
    deleteCardBusiness() {
        this._resultData.businesslicense.pop();
        this.dispatchData();
    }
    dispatchData() {
        this.assignObj.agency = this._resultData;
        let obj = Object.assign({}, this._resultJS, this.assignObj); 
        this.props.setAgencyData(obj);
    }
	render () {
        var _result = this.props.serviceAgencyData;
        if(_result.size < 1 ){
            return false; 
        }
        this._resultJS = _result.toJS();
        this._resultData = this._resultJS.agency;
        this.assignObj = {agency: {}};
        let businesslicense = '';
        if(this._resultData.businesslicense && this._resultData.businesslicense.length > 0 ) {
            businesslicense = addImageParam(IMG_CDN_PATH + this._resultData.businesslicense[0], IMAGE_SIZE_TYPE.AVATAR);
        }
        let businessCardhtml = '';
        if(this._resultData.businesslicense && this._resultData.businesslicense.length > 0 ) {
            businessCardhtml = <div className={styles.cardFrontImg}>
                                <i onClick={this.deleteCardBusiness.bind(this)}></i>
                                <img src={businesslicense} />    
                            </div>
        }else {
            businessCardhtml = <div onClick={this.cardBusinessClickHandler.bind(this)} className={styles.bgImg}>
                                <img src="https://o82zr1kfu.qnssl.com/@/image/584777b0e4b05c2d3be32388.png?imageView2/2/w/300" />
                                <span>添加名片照</span>
                            </div>
        }
		return (
			<div className={styles.personalImg}>
				<div className={styles.IDcard}>
                        <div className={styles.cardImg}>
                            {businessCardhtml}
                        </div>
                    </div>
                    <div className={styles.footerText}>
                         通过认证后，您可以出售作品版权
                    </div>
                    <ImageUpload ref="J_ImageUpload" onUploadComplete={this.editAvatarImageHandler.bind(this)} />
			</div>
		)
	}
}

export default AgencylImg;






