import React from 'react';
import styles from './style.css';

class PersonalCompetence extends React.Component {
	constructor(props) {
		super(props);
		this._resultJS = {};
		this._resultData = [];
		this.assignObj = {};
	}
	selectList(key) {
		if(this._resultData.competencepurview[key].select == 'disable') {
			this._resultData.competencepurview[key].select = 'enable';
		}else {
			this._resultData.competencepurview[key].select = 'disable';
		}
		this.dispatchData();

	}
	dispatchData() {
        this.assignObj.individual = this._resultData;
        let obj = Object.assign({}, this._resultJS, this.assignObj); 
        this.props.setPersonalData(obj);
    }
	render() {
		var _result = this.props.servicePersonalData;
        if(_result.size < 1 ){
            return false; 
        }
        this._resultJS = _result.toJS();
        this._resultData = this._resultJS.individual;
        this.assignObj = {individual: {}};

        this._resultData.competencepurview = this._resultJS.competencepurview || [];
        let arrListHtml = '';
        let that = this;
        
        if(this._resultData.competencepurview.length < 1) {
        	arrListHtml = <li>出版</li>
        }else {
        	arrListHtml = this._resultData.competencepurview.map(function (item, key) {
        		if(item.select == 'enable') {
        			return <li onClick={that.selectList.bind(that,key)} className={styles.select} key={key}>
							{item.title}        			
        				</li>	
        		}else {
        			return <li onClick={that.selectList.bind(that,key)} key={key}>
							{item.title}        			
        				</li>	
        		}
        	})
        }
        
		return (
			<div className={styles.personalCompetence}>
				<div className={styles.title}>请根据自己的业务范围，选择相应的签约权利</div>
				<div className={styles.competenceList}>
					<span className={styles.leftText}>签约权利</span>
					<ul>
						{arrListHtml}
					</ul>
				</div>
			</div>
		)
	}
}
export default PersonalCompetence;