<template>
    <div class="stepone">
        <vca-field label="Wähle deinen Spendenturnus">
            <div class="interval">
                <button class="selectbutton"  @click.prevent="selectInterval(event, 'year')">Jahresbeitrag</button>
                <button class="selectbutton" @click.prevent="selectInterval(event, 'month')">Monatsbeitrag</button>
            </div>
        </vca-field>
        <vca-field label="Wähle deinen Spendenbetrag">
            <div class="paymentsteps">
                <button class="selectbutton" @click.prevent="selectAmount(event, 6000)">60 €</button>
                <button class="selectbutton" @click.prevent="selectAmount(event, 12000)">120 €</button>
                <button class="selectbutton" @click.prevent="selectAmount(event, 24000)">240 €</button>

            </div>

        </vca-field>
        <vca-field label="Du willst einen anderen Betrag spenden? Kein Problem! (ab 60 Euro)">
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
        <button class="submit" @click.prevent="submit"> Weiter zu Schritt 2 </button>
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
    validations: {
        money: {
            amount: {
                required,
                minValue: minValue(6000)
            }
        }
    },
    methods: {
        selectInterval(e, interval) {
            this.interval = interval
        },
        selectAmount(e, amount) {
            this.money.amount = amount
        },
        submit() {
            this.$emit("submit", this.interval, this.money )
        }
    }
}
</script>
