<template>
    <vca-field label="Ich spende via">
        <Payment v-on:success="success" :payment="payment" :label="label" :country="country" :valid="valid" @notValid="notValid"/>
    </vca-field>
</template>
<script>
import Payment from '../Payment'
export default {
    name: 'StepThree',

    props: ['payment', 'country', 'valid', 'label'],
    components: {Payment},
    methods: {
        success() {
            this.$emit("success")
        },
        notValid() {
            this.$emit("notValid")
        }

    }

}
</script>
