<template>
    <div>
        <div ref="element"></div>
        <button type="button" v-on:click.prevent="purchase"> Donate </button>
    </div>
</template>

<script>

import axios from 'axios'
const style = {
    base: {
        color: '#32325d',
        fontSize: '16px',
        '::placeholder': {
            color: '#aab7c4'
        },
        ':-webkit-autofill': {
            color: '#32325d',
        },
    },
    invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
        ':-webkit-autofill': {
            color: '#fa755a',
        },
    },
};
const options = {
    style,
    supportedCountries: ['SEPA'],
    // Elements can use a placeholder as an example IBAN that reflects
    // the IBAN format of your customer's country. If you know your
    // customer's country, we recommend passing it to the Element as the
    // placeholderCountry.
    placeholderCountry: 'DE',
};
let stripe = window.Stripe('pk_test_XWflMvuFJqV9fLbCH9cUVLsV00fZ9g4zXq'),
    elements = stripe.elements(),
    element = elements.create('iban', options)

export default {
    name: 'SEPA',
    mounted () {
        element.mount(this.$refs.element)
    },
    methods: {

        stripeRequestIBAN (client_secret) {
            stripe.confirmSepaDebitPayment(
                client_secret,
                {
                    payment_method: {
                        sepa_debit: element,
                        billing_details: {
                            name: 'dennis',
                            email: 'dennis_kleber@mailbox.org',
                        },
                    },
                })
        },
        purchase () {
            axios.post('http://localhost/api/v1/payment/iban', {amount: 1000, currency: 'EUR'})
                .then(response => (
                    console.log(response.data),
                    this.stripeRequestIBAN(response.data.client_secret)
                ))
        }
    }


}
</script> 
