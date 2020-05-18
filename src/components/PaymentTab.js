import React from 'react'
import { Tab } from 'semantic-ui-react'
import {loadStripe} from '@stripe/stripe-js';

import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './iban/CheckoutForm';
import CheckoutFormCredit from './credit/CheckoutFormCredit'
import CheckoutPayPal from './paypal/CheckoutPayPal'
const stripePromise = loadStripe("pk_test_XWflMvuFJqV9fLbCH9cUVLsV00fZ9g4zXq");

export default function PaymentTab(props) {
    const panes = [
        { 
            menuItem: 'SEPA',
            pane: (
                <Tab.Pane key='tab1'> 
                <Elements stripe={stripePromise}>
                <CheckoutForm />
                </Elements>
                </Tab.Pane> 
            ),

        },
        { 
            menuItem: 'Credit',
            pane: (
                <Tab.Pane key='tab2'> 
                <Elements stripe={stripePromise}>
                <CheckoutFormCredit data={props.data}/>
                </Elements>
                </Tab.Pane> 
            ),

        },
        { 
            menuItem: 'PayPal',
            pane: (
                <Tab.Pane key='tab3'> 
                <CheckoutPayPal/>
                </Tab.Pane> 
            ), },
        { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    ]
    return (
        <Tab panes={panes} renderActiveOnly={false}/>
    )
}

