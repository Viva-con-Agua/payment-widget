<template>
    <div class="stripe-payment-container">
        <div class="vca-input-border"><div ref="card" class="stripe-payment"></div></div>
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
        color: '#dc3545',
        iconColor: '#dc3545',
        ':-webkit-autofill': {
            color: '#dc3545',
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
    style
};

let stripe = window.Stripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY),
    elements = stripe.elements(),
    element = elements.create('card', options);

export default {
    name: 'CreditCard',
    props: ['payment', 'valid', 'label'],
    mounted () {
        element.mount(this.$refs.card)
    },
    methods: {
        stripeRequestCard(client_secret) {
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
            if (this.valid.$invalid === false) {
                axios.post(process.env.VUE_APP_BACKEND_URL + '/api/v1/payment/card', 
                    { 
                        amount: this.payment.money.amount,
                        currency: this.payment.money.currency,
                        name: this.payment.supporter.first_name + ' ' + this.payment.supporter.last_name,
                        email: this.payment.supporter.email,
                        locale: this.payment.supporter.country
                    })
                    .then(response => (
                        console.log(response.data),
                        this.stripeRequestCard(response.data.client_secret)
                    ))
            }else {
                this.$emit('notValid')
            }
        },
        validate () {
            this.$emit('validate') 
        }
    }


}
</script>
