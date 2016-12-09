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

class AuthorAttestImg extends React.Component {
    constuctor(props) {
        supor(props);
        this._resultJS = {};
        this._resultData = {};
        this.clickCard = '';
        this.assignObj = {};
    }
    cardFrontClickHandler() {
        this.clickCard = 'front';
        this.refs.J_ImageUpload.showSheet();
        
    }
    cardBehindClickHandler() {
        this.clickCard = 'behind';
        this.refs.J_ImageUpload.showSheet();
    }
    editAvatarImageHandler(url) {
        
        switch(this.clickCard) {
            case 'front': 
                this._resultData.identityimagefront = url; break;
            case 'behind':
                this._resultData.identityimageback = url; break;
        }
        this.dispatchData();
    }

    deleteCardFront() {
        this._resultData.identityimagefront = '';
        this.dispatchData();
    }
    deleteCardBehind() {
        this._resultData.identityimageback = '';
        this.dispatchData();
    }
    dispatchData() {
        this.assignObj.individual = this._resultData;
        let obj = Object.assign({}, this._resultJS, this.assignObj); 
        this.props.setAuthorAttestData(obj);
    }
	render () {
        var _result = this.props.authorAttestData;
        if(_result.size < 1 ){
            return false; 
        }
        this._resultJS = _result.toJS();
        this._resultData = this._resultJS.author;
        this.assignObj = {individual: {}};
        let cardFronthtml = '';
        let cardBehindhtml = '';
        let identityimageback = addImageParam(IMG_CDN_PATH + this._resultData.identityimageback, IMAGE_SIZE_TYPE.AVATAR);
        let identityimagefront = addImageParam(IMG_CDN_PATH + this._resultData.identityimagefront, IMAGE_SIZE_TYPE.AVATAR);
        if(this._resultData.identityimagefront && this._resultData.identityimagefront != '' ) {
            cardFronthtml = <div className={styles.cardFrontImg}>
                                <i onClick={this.deleteCardFront.bind(this)}></i>
                                <img src={identityimagefront} />    
                            </div>
        }else{
            cardFronthtml = <div onClick={this.cardFrontClickHandler.bind(this)} className={styles.bgImg}>
                                <img src="https://o82zr1kfu.qnssl.com/@/image/583f932fe4b0d2bddbebdbbe.png?imageView2/2/w/300" />
                                 <span>添加身份证正面照</span>
                            </div>

        }

        if(this._resultData.identityimageback && this._resultData.identityimageback != '' ) {
            cardBehindhtml = <div className={styles.cardFrontImg}>
                                <i onClick={this.deleteCardBehind.bind(this)}></i>
                                <img src={identityimageback} />    
                            </div>
        }else {
            cardBehindhtml = <div  onClick={this.cardBehindClickHandler.bind(this)} className={styles.bgImg}>
                                <img src="https://o82zr1kfu.qnssl.com/@/image/583f932fe4b0d2bddbebdbbe.png?imageView2/2/w/300" />
                                <span>添加身份证反面照</span>
                            </div>
        }
        

		return (
			<div className={styles.personalImg}>
				<div className={styles.IDcard}>
                        <div className={styles.cardImg}>
                            {cardFronthtml}
                        </div>
                        <div className={styles.cardImg}>
                            {cardBehindhtml}
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

export default AuthorAttestImg;
