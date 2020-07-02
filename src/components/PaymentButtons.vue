<template>
    <div>
        <div class="payment-buttons">
            <button v-if="isDE" :class="getPaymnetType('sepa')" class="selectbutton"  @click.prevent="setPaymentType('sepa')">SEPA</button>
            <button v-if="isDE" :class="getPaymnetType('card')" class="selectbutton"  @click.prevent="setPaymentType('card')">Kreditkarte</button>
            <button v-if="isDE" :class="getPaymnetType('paypal')" class="selectbutton"  @click.prevent="setPaymentType('paypal')">Paypal</button>
        </div>
        <div class="payment-type">
            <SEPA v-if="getPaymnetType('sepa')" v-on:success="success" :payment="payment" :label="label" :valid="valid" @notValid="notValid"/>
            <CreditCard v-if="getPaymnetType('card')" v-on:success="success" :payment="payment" :label="label" :valid="valid" @notValid="notValid"/>
            <PayPalButton v-if="getPaymnetType('paypal')" v-on:success="success" v-on:error="error" :payment="payment" :valid="valid" @notValid="notValid"/>
        </div>
    </div>
</template>
<script>
import SEPA from './payments/SEPA'
import PayPalButton from './payments/PayPal'
import CreditCard from './payments/CreditCard'
export default {
    name: 'PaymentButtons',
    components: {SEPA, CreditCard, PayPalButton}, 
    props: ['payment', 'country', 'valid', 'label'],
    data () {
        return {
            paymentType: "sepa"
        }
    },
    computed: {
        isCH() {
            return this.country == 'CH'
        },
        isDE() {
            return this.country == 'DE'
        },
    },
    methods: {
        success(e) {
            this.$emit("success", e)
        },
        error(e) {
            this.$emit("error", e)
        },
        notValid() {
            this.$emit("notValid")
        },
        getPaymnetType(val) {
            return this.paymentType == val
        },
        setPaymentType(val) {
            this.paymentType = val
        }
    },
};
</script>