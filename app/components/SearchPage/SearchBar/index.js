import React from 'react';
import {hashHistory} from 'react-router';

import styles from './styles.css';

export class SearchBar extends React.Component { // eslint-disable-line react/prefer-stateless-function


    componentWillMount() {
    }

    componentDidMount() {
        this.items = this.props.items;
        this.setInputValue(this.props.searchKeyword);

        let nInput = this.refs.J_SearchInput;

        if (nInput) {
            setTimeout(function () {
                //计算居中位置
                let _fontSize = parseFloat(window.getComputedStyle(nInput, null).fontSize);
                let placeholderW = nInput.getAttribute('placeholder').length * _fontSize;
                let nInputW = nInput.offsetWidth;
                let placeholderOffset = (nInputW - placeholderW) / 2;

                this.nInputStyleStr = JSON.stringify({
                    'text-indent': placeholderOffset + 'px',
                    'background-position': (placeholderOffset - 1.5 * _fontSize) + 'px' + ' center'
                });

                nInput.style.cssText = nInputStyleStr.substr(1, nInputStyleStr.length - 2).replace(/\,/g, ';').replace(/\"/g, '');
            }, 0);
        }

    }

    componentWillUnmount(props) {
    }

    inputToggleHandler(e) {
        let editingCls = styles.editing;
        let nInput = this.refs.J_SearchInput;

        switch (e.type) {
            case 'focus':
                nInput.classList.add(editingCls);
                break;

            case 'blur':
                if (nInput.value === '') {
                    nInput.classList.remove(editingCls);
                }
                break;

            default:
                break;
        }
    }

    backClickHandler() {
        hashHistory.goBack();
    }

    submitHandler(e) {
        e.preventDefault();
        let input = this.refs.J_SearchInput;
        input.blur();
        this.props.searchHandler(input.value);
        return false;
    }

    setInputValue(v) {
        let editingCls = styles.editing;
        let nInput = this.refs.J_SearchInput;

        this.refs.J_SearchInput.value = v;

        if (nInput.value !== '') {
            nInput.classList.add(editingCls);
        }
    }

    render() {
        return (
            <div className={styles.wrap}>
                <form ref="J_searchForm" className={styles.searchInputWrap} onSubmit={this.submitHandler.bind(this)} action="">
                    <input type="search" ref="J_SearchInput"
                           placeholder="搜索标签、作品或用户"
                           onFocus={this.inputToggleHandler.bind(this)}
                           onBlur={this.inputToggleHandler.bind(this)}
                           className={`iconSearch hasTransition ${styles.searchInput}`}/>
                </form>
                <div ref="J_BackBtn" className={styles.backBtn} onClick={this.backClickHandler.bind(this)}>取消</div>
            </div>
        )
    }

}

SearchBar.propTypes = {};

export default SearchBar;


