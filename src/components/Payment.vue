<template>
    <div>
        <Tabs>
            <Tab v-if="isDE" title="SEPA">
                <SEPA v-on:success="success" :payment="payment"/>
            </Tab>
            <Tab v-if="isDE" title="CARD">
                <CreditCard v-on:success="success" :payment="payment"/>
            </Tab>
            <Tab v-if="isDE" title="PAYPAL">
                <PayPalButton v-on:success="success" :payment="payment"/>
            </Tab>
            <Tab v-if="isCH" title="TWINT">
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
    props: ['payment', 'country'],
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
        }
    },
};
</script>


