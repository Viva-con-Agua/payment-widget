<template>
    <div>
        <Tabs>
            <Tab title="SEPA">
                <SEPA v-on:success="success" :payment="payment"/>
            </Tab>
            <Tab title="CARD">
                <CreditCard v-on:success="success" :payment="payment"/>
            </Tab>
            <Tab title="PAYPAL">
                <PayPalButton v-on:success="success" :payment="payment"/>
            </Tab>
        </Tabs>
    </div>
</template>
<script>
import SEPA from './payments/SEPA'
import PayPalButton from './payments/PayPal'
import CreditCard from './payments/CreditCard'
import Tab from './utils/Tab'
import Tabs from './utils/Tabs'
export default {
    name: 'Payment',
    components: {SEPA, CreditCard, PayPalButton, Tabs, Tab}, 
    props: ['payment'],
    methods: {
        success(e) {
            this.$emit("success", e)
        }
    },
};
</script>


