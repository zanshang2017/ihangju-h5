import React from 'react';
import styles from './style.css';

// class ProjectTag extends React.Component{
// 	render(){
// 		return(
// 			<div>1111</div>

			
// 		)
// 	}
// }
function ProjectTag(props){

	let listContent = '';
	if(!props.items || props.items.size < 1){
		console.log(props.items);
        listContent = <li>加载中...</li>
    }
	return(
		<ul>
			<li>222</li>
			{listContent}
		</ul>
	)
}
export default ProjectTag;