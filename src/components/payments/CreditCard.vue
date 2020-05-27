<template>
    <div>
        <div ref="card"></div>
        <button type="button" v-on:click.prevent="validate"> Donate </button>
    </div>
</template>

<script>
import axios from 'axios'


let stripe = window.Stripe('pk_test_XWflMvuFJqV9fLbCH9cUVLsV00fZ9g4zXq'),
    elements = stripe.elements(),
    element = elements.create('card');

export default {
    name: 'CreditCard',
    props: {
        payment: {
            type: Object,
            default: function () {
                return {
                    email: '',
                    firstName: '',
                    lastName:'',
                    loop: 'single',
                    money: {
                        amount: 0,
                        currency: 'EUR'
                    },
                    address: null,
                    newsletter: false

                }
            }
        }
    },
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
                        name: this.payment.name.first + ' ' + this.payment.name.last,
                        email: this.payment.email
                    }
                }
            }).then(result => {
                if (result.error) {
                    // Show error to your customer (e.g., insufficient funds)
                    console.log(result.error.message);
                } else {
                    // The payment has been processed!
                    if (result.paymentIntent.status === 'succeeded') {
                        this.$emit('success')  
                    }
                }
            });
        },
        purchase () {
            axios.post('http://localhost/api/v1/payment/card', 
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
