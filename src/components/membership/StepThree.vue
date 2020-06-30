<template>
    <div class="paymentview">
    <Payment v-on:success="success" :payment="payment" :label="label" :country="country" :valid="valid" @notValid="notValid"/>
    
    <button class="submit" @click.prevent="back"> Zurück zu Schritt 2 </button>
    </div>
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
        },
        back() {
            this.$emit("back")
        }

    }

}
</script>
