import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';

import Membership from './Membership'

class Payment extends HTMLElement {
    connectedCallback() {
        const mountPoint = document.createElement('div')
        this.attachShadow({ mode: 'open' }).appendChild(mountPoint)

        const name = this.getAttribute('name')
        if (name === 'membership') {
            ReactDOM.render(<Membership />, this.mountPoint);

        }
    }
    disconnectedCallback() {
        ReactDOM.unmountComponentAtNode(this.mountPoint);
    }
}
window.customElements.define('Payment', Payment);
