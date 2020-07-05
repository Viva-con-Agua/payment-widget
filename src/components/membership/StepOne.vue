<template>
    <div class="stepone">
        <vca-field label="Wähle deinen Spendenturnus">
            <div class="interval">
                <button id="interval-month" :class="getIntervalClass('month')" class="selectbutton" @click.prevent="selectInterval('month')">Monatsbeitrag</button>
                <button id="interval-year" :class="getIntervalClass('year')" class="selectbutton" @click.prevent="selectInterval('year')">Jahresbeitrag</button>
            </div>
        </vca-field>
        <vca-field label="Wähle deinen Spendenbetrag">
            <div v-if="interval === 'month'" class="paymentsteps">
                <button class="btn_drop" :class="getAmountClass(500)" @click.prevent="selectAmount(500)">
                    <img v-if="money.amount != 500" src="~@/assets/icon_vca.png"/>
                    <img v-else src="~@/assets/icon_vca_white.png"/><br/>
                    <span class="amountAmount">5 EURO</span><br/><div class="amountType">TROPFEN Fördermitglied</div>
                </button>
                <button class="btn_drop" :class="getAmountClass(1000)" @click.prevent="selectAmount(1000)">
                    <img v-if="money.amount != 1000" src="~@/assets/icon_well.png"/>
                    <img v-else src="~@/assets/icon_well_white.png"/><br/>
                    <span class="amountAmount">10 EURO</span><br/><div class="amountType">BRUNNEN Fördermitglied</div>
                </button>
                <button class="btn_drop" :class="getAmountClass(2000)" @click.prevent="selectAmount(2000)">
                    <img v-if="money.amount != 2000" src="~@/assets/icon_fountain.png"/>
                    <img v-else src="~@/assets/icon_fountain_white.png"/><br/>
                    <span class="amountAmount">20 EURO</span><br/><div class="amountType">QUELLEN Fördermitglied</div>
                </button>
            </div>

            <div v-if="interval === 'year'" class="paymentsteps">
                <button class="btn_drop" :class="getAmountClass(6000)" @click.prevent="selectAmount(6000)">
                    <img v-if="money.amount != 6000" src="~@/assets/icon_vca.png"/>
                    <img v-else src="~@/assets/icon_vca_white.png"/><br/>
                    <span class="amountAmount">60 EURO</span><br/><div class="amountType">TROPFEN Fördermitglied</div>
                </button>
                <button class="btn_drop" :class="getAmountClass(12000)" @click.prevent="selectAmount(12000)">
                    <img v-if="money.amount != 12000" src="~@/assets/icon_well.png"/>
                    <img v-else src="~@/assets/icon_well_white.png"/><br/>
                    <span class="amountAmount">120 EURO</span><br/><div class="amountType">BRUNNEN Fördermitglied</div>
                </button>
                <button class="btn_drop" :class="getAmountClass(24000)" @click.prevent="selectAmount(24000)">
                    <img v-if="money.amount != 24000" src="~@/assets/icon_fountain.png"/>
                    <img v-else src="~@/assets/icon_fountain_white.png"/><br/>
                    <span class="amountAmount">240 EURO</span><br/><div class="amountType">QUELLEN Fördermitglied</div>
                </button>
            </div>
        </vca-field>
        <vca-field :label="customPaymentMin">
            <vca-field-row>
                <vca-money-input 
                        ref="money" 
                        v-model="money" 
                        :money="money"
                        :rules="$v.money" 
                        errorMsg="Bitte wähle mindestens 60 Euro"  
                        topText="anderer Betrag?"/>
            </vca-field-row>
        </vca-field>
        <button class="submit btn_nav" @click.prevent="submit" :disabled="$v.$invalid"> Weiter zu Schritt 2 </button>
    </div>

</template>
<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
    name: 'StepOne',
    props: {
    },
    data () {
        return {
            interval: "month",
            money: {
                amount: 0,
                currency: "EUR"
            }
        }
    },
    validations() {
        return {
            money: {
                amount: {
                    required,
                    minValue: this.paymentMin
                }
            }
        }
    },
    computed: {
        customPaymentMin: function () {
            if (this.interval === 'month') {
                return "Du willst einen anderen Betrag spenden? Kein Problem! (ab 5 Euro)"
            } else {
                return "Du willst einen anderen Betrag spenden? Kein Problem! (ab 60 Euro)"
            }
        },
        paymentMin: function () {
            if (this.interval === 'month') {
                return minValue(500)
            } else {
                return minValue(6000)
            }
        } 
    },
    methods: {
        getIntervalClass(val) {
            return (this.interval == val) ? 'btn_selected' : 'btn_deselected'
        },
        getAmountClass(val) {
            return (this.money.amount == val) ? 'btn_selected_amount' : 'btn_drop_deselected'
        },
        selectInterval(interval) {
            this.interval = interval
        },
        selectAmount(amount) {
            this.money.amount = amount
        },
        submit() {
            if (!this.$v.$invalid) {
                this.$emit("submit", this.interval, this.money )
            } else {
                this.$refs.money.validate()
            }
        }
    }
}
</script>
<style type="text/css">
.amountAmount {
    font-size: 1.4em;
}
.amountType {
    max-width: 180px;
    margin: 0 auto;
    text-align: center;
    font-size: .9em;
}
.paymentsteps {
    display: flex;
}

@media only screen and (max-width: 600px) {
    .paymentsteps {
        flex-wrap: wrap;
    }
    .amountType {
        font-size: .8em;
    }
    .amountAmount {
        font-size: .9em;
    }
}

</style>