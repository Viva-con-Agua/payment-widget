<template>
    <div>
        <vca-tabs>
            <vca-tab v-if="isDE" title="SEPA">
                <SEPA v-on:success="success" :payment="payment" :valid="valid" @notValid="notValid"/>
            </vca-tab>
            <vca-tab v-if="isDE" title="CARD">
                <CreditCard v-on:success="success" :payment="payment" :valid="valid" @notValid="notValid"/>
            </vca-tab>
            <vca-tab v-if="isDE" title="PAYPAL">
                <PayPalButton v-on:success="success" v-on:error="error" :payment="payment" :valid="valid" @notValid="notValid"/>
            </vca-tab>
            <vca-tab v-if="isCH" title="TWINT">
            </vca-tab>
        </vca-tabs>
    </div>
</template>
<script>
import SEPA from './payments/SEPA'
import PayPalButton from './payments/PayPal'
import CreditCard from './payments/CreditCard'
export default {
    name: 'Payment',
    components: {SEPA, CreditCard, PayPalButton}, 
    props: ['payment', 'country', 'valid'],
    computed: {
        isCH() {
            return this.country == 'CH'
        },
        isDE() {
            return this.country == 'DE'
        }
    },
    methods: {
        success(e) {
            this.$emit("success", e)
        },
        error(e) {
            this.$emit("success", e)
        },
        notValid() {
            this.$emit("notValid")
        }
    },
};
</script>


