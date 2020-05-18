import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';

import Membership from './Membership'

class Payment extends HTMLElement {
    mountPoint;

    connectedCallback() {
        this.mountReactApp();
    }

    disconnectedCallback() {
        ReactDOM.unmountComponentAtNode(this.mountPoint);
    }

    mountReactApp() {
        if (!this.mountPoint) {
            this.mountPoint = document.createElement('div');
            this.attachShadow({ mode: 'open' }).appendChild(this.mountPoint);
        }

        ReactDOM.render(<Membership />, this.mountPoint);
    }
}
window.customElements.define('payment-widget', Payment);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
