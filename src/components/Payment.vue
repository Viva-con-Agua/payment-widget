<template>
    <sui-tab >
        <sui-tab-pane title="SEPA">
            <SEPA/>
        </sui-tab-pane>
        <sui-tab-pane title="CARD">
            <CreditCard/>
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
    data() {
        return {
            payment: 'first'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>
