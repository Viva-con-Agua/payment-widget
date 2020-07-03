<template>
    <div class="payment-footer" stlye="clear: both;">
        <div class="payment-footer-text">Danke, dass du unsere Projekte für sauberes Trinkwasser mit {{ getAmount }} {{ getCurrency }} {{ getInterval }} unterstützen möchtest!</div>
        <div class="payment-footer-image"><img src="~@/assets/thank_you_small.png" /></div>
    </div>

</template>
<script>

export default {
    name: 'PaymentFooter',
    props: {
        money: {
            type: Object,
            default: function () {
                return {
                    "amount": 1312,
                    "currency": "EUR"
                }
            }
        },
        interval: {
            type: String,
            default: 'month'
        }
    },
    computed: {
        getInterval() {
            return (this.interval == 'month') ? 'monatlich' : 'jährlich'
        },
        getAmount() {
            return this.money.amount / 100
        },
        getCurrency() {
            return this.money.currency
        }
    }
}
</script>
<style type="text/css">
.payment-footer {
    background-color: #008fc2;
    margin: 0;
    color: white;
    padding: 1em;
    vertical-align: middle;
    display: flex;
    width: 100%;
}
.payment-footer-text {
    flex-grow: 2;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    position: relative;
    line-height: 1.3;
    flex-basis: 80%;
    margin: auto 0;
}

.payment-footer-image img {
    margin: 0 10px;
}

.payment-footer-image {
    flex-grow: 1;
    display: flex;
}
@media only screen and (max-width: 600px) {

    .payment-footer {
        flex-wrap: wrap;
    }
    .payment-footer-text {
        font-size: 14px;
        text-align: center;
        margin-bottom: 10px;
    }

    .payment-footer-image {
        width: 100%;
    }

    .payment-footer-image img {
        margin: 0 auto !important;
    }

}

</style>