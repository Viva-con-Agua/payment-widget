<template>
    <div class="stripe-payment-container">
        <div class="vca-input-border"><div ref="element" class="stripe-payment"></div></div>
        <button type="button" v-on:click.prevent="purchase" class="stripe-donation-button"> {{ label }} </button>
    </div>
</template>

<script>

import axios from 'axios'
const style = {
    base: {
        color: '#32325d',
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
    empty: {
        color: '#0a6b91',
        iconColor: '#0a6b91',
        ':-webkit-autofill': {
            color: '#0a6b91',
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
let stripe = window.Stripe('pk_test_Se23Zwa0HzMj8OPt3ijaxz8X'),
    elements = stripe.elements(),
    element = elements.create('iban', options)

export default {
    name: 'SEPA',
    props: ['payment', 'valid', 'label'],
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
                            name: this.payment.supporter.first_name + ' ' + this.payment.supporter.last_name,
                            email: this.payment.supporter.email
                        },
                    },
                }).then(result => {
                    if (result.error) {
                        // Show error to your customer (e.g., insufficient funds)
                        console.log(result.error.message);
                    } else {
                        // The payment is state processing!
                        if (result.paymentIntent.status === 'processing') {
                            this.payment.transaction.id = result.paymentIntent.id,
                            this.payment.transaction.provider = "stripe"
                            this.$emit('success', this.payment)
                        }
                    }
                });
        },
        purchase () {
            if (this.valid.$invalid === false ) {
            axios.post('http://localhost:1323/api/v1/payment/iban', {amount: this.payment.money.amount, currency: this.payment.money.currency})
                .then(response => (
                    console.log(response.data),
                    this.stripeRequestIBAN(response.data.client_secret)
                ))
            } else {
                this.$emit('notValid')
            }
        }
    }


}
</script>