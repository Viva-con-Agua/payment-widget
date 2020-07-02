<template>
    <vca-field label="Ich spende via">
        <div class="paymentview">
            <PaymentButtons v-on:success="success" :payment="payment" :label="label" :country="country" :valid="valid" @notValid="notValid"/>
    
            <button class="submit" @click.prevent="back"> Zurück zu Schritt 2 </button>
        </div>
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
        },
        back() {
            this.$emit("back")
        }
    }

}
</script>
