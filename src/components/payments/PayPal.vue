<template>
    <div class="paypal-payment-container">
        <PayPal 
            ref="paypal"
            :amount="pAmount"
            :currency="payment.money.currency"
            :client="credentials"
            :items="items"
            :disabled="this.valid.$invalid"
            @payment_authorized="purchase"
            @payment-completed="success"
            @payment-validation-error="validationError">
        </PayPal>
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
                sandbox: process.env.VUE_PAYPAL_PUBLIC_KEY_SANDBOX,
                production: process.env.VUE_PAYPAL_PUBLIC_KEY_PRDOUCTION
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