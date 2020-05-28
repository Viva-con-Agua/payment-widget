<template>
    <PayPal
        :amount="pAmount"
        :currency="payment.money.currency"
        :client="credentials"
        :items="items"
        @payment-completed="success"
        env="sandbox">
    </PayPal>
</template>

<script>
import Money from '@/utils/Money'
import PayPal from 'vue-paypal-checkout'
export default {
    name: 'PayPalButton',
    components: {PayPal},
    props: ['payment'],
    computed : {
        pAmount () {
            return Money.getPayPalString(this.payment.money.amount)
        },
        items () {
            return [{
                name: "test donation",
                description: "for test",
                quantity: "1",
                price: Money.getPayPalString(this.payment.money.amount),
                currency: this.payment.money.currency
            }]
        }
    },
    data () {
        return {
            credentials: {
                sandbox: 'AcZoPYe27lkRTq651m-q_3XFdv_kph3PEDpOUzdWZ3QNj7sBMi7dovF0N8fxQ69-G46kRqHPz4ThRo4V',
                production: '<production client id>'
            },
            myItems: [
                {
                    "name": "test donation",
                    "description": "for test",
                    "quantity": "1",
                    "price": this.pAmount,
                    "currency": this.payment.money.currency
                },
            ]
        }
    },
    methods: {
        success(e) {
            this.payment.provider.id = e.id,
            this.payment.provider.name = 'paypal'
            this.$emit("success")
        },
    }
}
</script> 
