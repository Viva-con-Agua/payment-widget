<template>
    <div class="stepone">
        <vca-field label="Wähle deinen Spendenturnus">
            <div class="interval">
                <button class="selectbutton simple-button"  @click.prevent="selectInterval('year')">Jahresbeitrag</button>
                <button class="selectbutton simple-button" @click.prevent="selectInterval('month')">Monatsbeitrag</button>
            </div>
        </vca-field>
        <vca-field label="Wähle deinen Spendenbetrag">
            <div v-if="interval === 'month'" class="paymentsteps">
                <button class="selectbutton" @click.prevent="selectAmount(500)">5 €</button>
                <button class="selectbutton" @click.prevent="selectAmount(1000)">10 €</button>
                <button class="selectbutton" @click.prevent="selectAmount(2000)">20 €</button>

            </div>
            <div v-if="interval === 'year'" class="paymentsteps">
                <button class="selectbutton" @click.prevent="selectAmount(6000)">60 €</button>
                <button class="selectbutton" @click.prevent="selectAmount(12000)">120 €</button>
                <button class="selectbutton" @click.prevent="selectAmount(24000)">240 €</button>

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
        <button class="submit membership-button" @click.prevent="submit"> Weiter zu Schritt 2 </button>
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
            interval: "year",
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
