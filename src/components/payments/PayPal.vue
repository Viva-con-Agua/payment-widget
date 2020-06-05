<template>
    <div>
    <button @click.prevent="purchase"> 
    <PayPal 
        ref="paypal"
        :amount="pAmount"
        :currency="payment.money.currency"
        :client="credentials"
        :items="items"
        :disabled="this.valid.$invalid"
        @payment_authorized="purchase"
        @payment-completed="success"
        @payment-validation-error="validationError"
        env="sandbox">
    </PayPal>
    </button>
    </div>
</template>

<script>
import Money from '@/utils/Money'
import PayPal from './paypal/PayPalCheckout'
export default {
    name: 'PayPalButton',
    components: {PayPal},
    props: ['payment', 'valid'],
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
            ],
        }
    },
    methods: {
        success(e) {
            this.payment.transaction.id = e.id,
            this.payment.transaction.provider = 'paypal'
            this.$emit("success", this.payment)
        },
        error(e) {
            this.$emit("error", e)
        },
        validationError() {
            this.$emit("notValid")
        },
        purchase () {
            if (this.valid.$invalid === false ) {
                this.$refs.paypal 
            } else {
                this.$emit('notValid')
            }
        }

    }
}
</script> 
