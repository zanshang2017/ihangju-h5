/**
 * NotFoundPage
 */

import React from 'react';

/* eslint-disable react/prefer-stateless-function */
export default class NotFound extends React.Component {

    componentDidMount() {
        console.warn('NotFoundPage DidMount');
    }

    render() {
        return (
            <div className="notFoundPage">
                <h1>Page Not Found</h1>
            </div>
        );
    }
}
