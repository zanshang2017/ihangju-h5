import React from 'react';
import style from './style.css';

class ProjectIntro extends React.Component{
	constructor(props) {
        super(props);
    }
	render(){
		var _result = this.props.items.toJS();
		let contentIntro = "";
		if(_result.description.length < 1) {
			contentIntro = "暂无简介";
		}else {
			 contentIntro = _result.description;
		}
		return(
			<div className={style.prodectIntro}><span className={style.title}>简介</span>{contentIntro}</div>
		)
	}	
}

export default ProjectIntro;