<template>
    <vca-field label="Ich spende via">
        <PaymentButtons v-on:success="success" :payment="payment" :label="label" :country="country" :valid="valid" @notValid="notValid"/>
    </vca-field>
</template>
<script>
import PaymentButtons from '../PaymentButtons'
export default {
    name: 'StepThree',

    props: ['payment', 'country', 'valid', 'label'],
    components: {PaymentButtons},
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
