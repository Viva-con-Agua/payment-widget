<template>
    <sui-tab >
        <sui-tab-pane title="SEPA">
            <SEPA/>
        </sui-tab-pane>
        <sui-tab-pane title="CARD">
            <CreditCard v-on:success="success" :payment="payment"/>
        </sui-tab-pane>
        <sui-tab-pane title="PAYPAL">
            <PayPalButton v-on:success="success" :payment="payment"/>
        </sui-tab-pane>
    </sui-tab>
</template>
<script>
import SEPA from './payments/SEPA'
import PayPalButton from './payments/PayPal'
import CreditCard from './payments/CreditCard'
export default {
    name: 'Payment',
    components: {SEPA, CreditCard, PayPalButton}, 
    props: {
        payment: {
            type: Object,
            default: function () {
                return {
                    name: {
                        first: '',
                        last: ''
                    },
                    email: '',
                    loop: 'single',
                    money: {
                        amount: 0,
                        currency: 'EUR'
                    },
                    newsletter: false

                }
            }
        }
    },

    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        success() {
            this.$emit("success")
        },
    },
};
</script>
