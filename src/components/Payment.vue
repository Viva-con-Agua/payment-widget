<template>
    <sui-tab >
        <sui-tab-pane title="SEPA">
            <SEPA/>
        </sui-tab-pane>
        <sui-tab-pane title="CARD">
            <CreditCard v-on:success="success" :payment="payment"/>
        </sui-tab-pane>
        <sui-tab-pane title="PAYPAL">
            Triangle
        </sui-tab-pane>
    </sui-tab>
</template>
<script>
import SEPA from './SEPA'
import CreditCard from './CreditCard'
export default {
    name: 'Payment',
    components: {SEPA, CreditCard}, 
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

    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        success() {
            this.$emit("success")
        },
        validate

    },
};
</script>
