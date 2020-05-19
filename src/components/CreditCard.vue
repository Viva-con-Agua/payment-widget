<template>
    <div>
        <div ref="card"></div>

        <button type="button" v-on:click.prevent="purchase"> Donate </button>
    </div>
</template>

<script>
import axios from 'axios'


let stripe = window.Stripe('pk_test_XWflMvuFJqV9fLbCH9cUVLsV00fZ9g4zXq'),
    elements = stripe.elements(),
    element = elements.create('card');

export default {
    name: 'CreditCard',
    mounted () {

        element.mount(this.$refs.card)
    },
    methods: {
        stripeRequestCard(client_secret) {
            console.log(client_secret)
            stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: element,
                    billing_details: {
                        name: 'Dennis Rosen'
                    }
                }
            }).then(function(result) {
                if (result.error) {
                    // Show error to your customer (e.g., insufficient funds)
                    console.log(result.error.message);
                } else {
                    // The payment has been processed!
                    if (result.paymentIntent.status === 'succeeded') {
                        // Show a success message to your customer
                        // There's a risk of the customer closing the window before callback
                        // execution. Set up a webhook or plugin to listen for the
                        // payment_intent.succeeded event that handles any business critical
                        // post-payment actions.
                    }
                }
            });
        },
        purchase () {
            axios.post('http://localhost/api/v1/payment/card', {amount: 1000, currency: 'EUR'})
                .then(response => (
                    console.log(response.data),
                    this.stripeRequestCard(response.data.client_secret)
                ))
        }
    }


}
</script> 
