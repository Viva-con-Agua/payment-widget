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
    props: ['payment'],
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
                        name: this.payment.supporter.first_name + ' ' + this.payment.supporter.last_name,
                        email: this.payment.supporter.email
                    }
                }
            }).then(result => {
                if (result.error) {
                    // Show error to your customer (e.g., insufficient funds)
                    console.log(result.error.message);
                } else {
                    // The payment has been processed!
                    if (result.paymentIntent.status === 'succeeded') {
                        this.payment.transaction.id = result.paymentIntent.id,
                        this.payment.transaction.provider = "stripe"
                        this.$emit('success', this.payment)
                    }
                }
            });
        },
        purchase () {
            axios.post('http://localhost:1323/api/v1/payment/card', 
                { 
                    amount: this.payment.money.amount,
                    currency: this.payment.money.currency
                })
                .then(response => (
                    console.log(response.data),
                    this.stripeRequestCard(response.data.client_secret)
                ))
        },
        validate () {
           this.$emit('validate') 
        }
    }


}
</script> 
