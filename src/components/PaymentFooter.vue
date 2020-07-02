<template>
    <div class="payment-footer" stlye="clear: both;">
        <div class="payment-footer-text">Danke, dass du unsere Projekte für sauberes Trinkwasser mit {{ money.amount }} {{ money.currency }} {{ getInterval }} unterstützen möchtest!</div>
        <div class="payment-footer-image"><img src="~@/assets/icon_vca_white.png" /></div>
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
}
.payment-footer-image {
    flex-grow: 1;
}
@media only screen and (max-width: 600px) {
    .amountButton {
        max-width: 170px;
    }
    .paymentsteps {
        flex-wrap: wrap;
    }
    .amountType {
        font-size: 12px;
    }
    .amountAmount {
        font-size: 14px;
    }
}

</style>