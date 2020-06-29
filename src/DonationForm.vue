<template>
    <div class="simple-donation">
        <div class="donation-form" v-if="!successView">
            <div class="vca">
                <vca-form>
                    <vca-field label="Betrag" >
                    <vca-field-row>
                        <div class="vca-label">
                            <label>{{ amountString}}  {{ currency }}</label>
                        </div>
                        <vca-money-input v-if="!isCH" ref="money" v-model="payment.money" :currency="currencies" :money="payment.money" :rules="$v.payment.money" errorMsg="Bitte wähle mindestens 1 Cent"  @change="replyAmount" topText="anderer Betrag?"/>
                    </vca-field-row>
                    </vca-field>
                    <vca-field v-if="!isCH" label="Kontaktinformationen">
                        <vca-input 
                            ref="email"
                            errorMsg="Bitte E-Mail Adresse eintragen"
                            placeholder="E-Mail Adresse"
                            v-model.trim="payment.supporter.email" 
                            :rules="$v.payment.supporter.email"/>
                        <vca-field-row>
                        <vca-input 
                            ref="first_name"
                            first
                            errorMsg="Bitte Vornamen eintragen"
                            placeholder="Vorname"
                            v-model.trim="payment.supporter.first_name" 
                            :rules="$v.payment.supporter.first_name">
                        </vca-input>
                        <vca-input
                            ref="last_name"
                            last
                            errorMsg="Bitte Nachnamen eintragen"
                            placeholder="Nachname"
                            v-model.trim="payment.supporter.last_name" 
                            :rules="$v.payment.supporter.last_name">
                        </vca-input>
                        </vca-field-row>
                        <div v-if="reqNewsletter" class="vca-input-checkbox">
                            <label class="container">
                                <input type="checkbox" v-model="payment.offset.newsletter">
                                <span class="checkmark"></span>
                                 Ich würde mich gerne zusätzlich zur Viva con Agua Flaschenpost eintragen.
                            </label>
                        </div>
                    </vca-field>
                    <Payment v-if="!isCH" v-on:success="success" :payment="payment" :label="getLabel" :country="country" :valid="$v.payment" @notValid="validate"/>
                </vca-form>
            </div>
        </div>
        <div class="success-view" v-if="successView">
            <h2> Danke für deine Spende </h2>
            <a @click="successView = false" style="cursor: pointer;">Erneut spenden!</a>
        </div>
    </div>
</template>

<script>
import { required, email, minValue } from 'vuelidate/lib/validators'
import Payment from './components/Payment'
import Money from './utils/Money'

export default {
    name: 'DonationForm',
    components: {Payment},
    props: {
        description: {
            type: String,
            default: 'donation'
        },
        country: {
            type: String,
            default: 'DE'
        },
        currency: {
            type: String,
            default: 'EUR'
        },
        campaign: {
            type: Object,
            default() {
                return {}
            }
        },
        reqNewsletter: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            successView: false,
            payment: {
                campaign: {
                    id: '',
                    name: '',
                    description: ''
                },
                transaction: {
                    id: '',
                    provider: '',
                },
                loop: 'single',
                supporter: {
                    email: '',
                    first_name: '',
                    last_name: ''
                },
                money: {
                    amount: 0,
                    currency: 'EUR'
                },
                offset: {
                    newsletter: false
                }
            },
            currencies: [
                {
                    label: '€',
                    value: 'EUR'
                }
            ]
        }
    },
    validations: {
        payment: {
            supporter: {
                email: {
                    required,
                    email
                },
                first_name: {
                    required
                },
                last_name: {
                    required
                }
            },
            money: {
                amount: {
                    required,
                    minValue: minValue(1)
                }
            }
        }
    },
    computed: {
        isCH() {
            return this.country == 'CH'
        },
        isDE() {
            return this.country == 'DE'
        },
        getLabel() {
            if (this.country == 'DE' || this.country == 'CH' || this.country == 'AT') {
                return "Spenden"
            }
            return "Donate"
        },
        amountString () {
                return Money.getInputString(this.payment.money.amount, this.payment.money.currency)
        }
    },
    mounted() {
        this.payment.campaign = this.campaign
        this.payment.money.currency = this.currency
    },
    methods: {
        setAmount (value) {
            this.payment.money.amount = value
        },
        replyAmount () {
            this.$emit("replyAmount", this.payment.money.amount)
        },
        setLastName (value){
            this.donation.lastName = value
        },
        success(e) {
            this.successView = true
            this.$emit("success", e)
        },
        validate () {
            this.$refs.email.validate()
            this.$refs.first_name.validate()
            this.$refs.last_name.validate()
            this.$refs.money.validate()
        },

    }

}
</script>
<style>
body {
    min-width: auto;
}
.simple-donation {
    font-family: Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    width: 100%;
    position: center;
    font-size: 15px;
    line-height: 15px;
}
.vca-form {
    width: 100%;
    max-width: 100%;
    padding: 0.6em 0.6em;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;   
}
.vca-field {
    display: flex;
    flex-direction: column;
    margin: 0 0 1em;
}
.vca-field-label {
    font-size: 1rem;
    margin-bottom: 1em;
}
.vca-field-content{
    flex-direction: column;
    margin: 0 0 1em;
}
.vca-field-row {
    width: 100%;
    box-shadow: none;
    display: flex;
    flex-wrap: wrap;
}
.vca-field-row .first {
    width: 100%;
    box-shadow: none;
    padding-right: 0.6em;
}

.vca-field-row .last {
    width: 100%;
    box-shadow: none;
    padding-left: 0.6em;
}
.vca-input {
    width: 100%;
    box-shadow: none;
    margin: 0 0 1em;

    flex-basis: 150px;
    flex-grow: 1;
    flex-shrink: 1; 
}


.vca-input input {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 0.2rem;
    padding: 0.6em 1em;
    box-shadow: none;
    outline-color: #008fc2;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;   
}

.vca-input input[type=checkbox] {
    border: 1px solid #ccc;
    border-radius: 0.2rem;
    padding: 0.6em 1em;
    box-shadow: none;
    outline-color: #008fc2;
}

.vca-input .error {
    border-color: #dc3545;
}

.error span {
    width: 100%;
    color: #dc3545;
}

.vca-label {
    width: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    border: none;
    border-left: none;
    border-top-left-radius: 0em;
    border-bottom-left-radius: 0em;
    margin: 0 0 1em;


    flex-basis: 150px;
    flex-grow: 1;
    flex-shrink: 1; 

}
.vca-label label {
    font-size: 22px;
    font-weight: 900;
    width: 100%;
    color:  #0070ba;

}


.vca-form form .vca-field .vca-money-input {
    width: 100%;
    display: inline-flex;
    border-radius: 0em;
    border: 0em;
}

.vca-money-container {
    width: 80%;

}
.vca-input-container input {
    width: 100%;
    border-radius: 0em;
    border-radius: 0.2rem;
    padding: 0.6em 1em;
    border: 1px solid #ccc;
    border-right: none;
    border-top-right-radius: 0em;
    border-bottom-right-radius: 0em;
    outline-color: #008fc2;
    text-align: right;

}
.vca-input-container label{
    position: absolute;
    padding-left: 0.4em;
    font-size: 10px;
    font-weight: 600;
    
}

.focus label {
    color: #0070ba;
    
}

.currency-select {
    width: 20%;
    border: none;
    border-left: none;
    border-top-left-radius: 0em;
    border-bottom-left-radius: 0em;
}

.currency-select select {
    width: 100%;
    height: 100%;
    border: none;
    border-left: none;
    border-top-left-radius: 0em;
    border-bottom-left-radius: 0em;
    background: rgba(34,36,38,.15);
    box-shadow: none;
}

.currency-label {
    background: rgba(34,36,38,.15);
    width: 20%;
    display: flex;
    align-items: center;
    text-align: center;
    border: none;
    border-left: none;
    border-top-left-radius: 0em;
    border-bottom-left-radius: 0em;

}
.currency-label label {
    width: 100%;
}

.vca-tabs ul {
    border-spacing: 5px 0;
    overflow: hidden;
    display: table;
    width: 100%;
    padding-left: 5px;
    border: 1px solid #ccc;

    margin-bottom: -1px;
    border-top: none;
    border-left: none;
    border-right: none;
    background-color: #fff;
}

ul li {
    list-style: none;
}
/* Style the buttons inside the tab */
.vca-tabs li {
    background-color: inherit;
    display: inline-flex;
    margin: 0 2px;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    border-top: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    border-left: 1px solid #dddddd;

    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    font-size: 17px;
}

/* Change background color of buttons on hover */
.vca-tabs li:hover {
    background-color: #ddd;
}

/* Create an active/current tablink class */
.vca-tabs li.is-active {

    background-color: #0070ba;
    border-color: #0070ba #0070ba #0070ba;
}

.vca-tabs li.is-active a {
    color: white;
}

.stripe-payment-container, .paypal-payment-container {
    padding-top: 10px;
}
.vca-input-border {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 0.2rem;
    padding: 0.6em 1em;
    box-shadow: none;
    outline-color: #008fc2;
}
.stripe-donation-button:hover, .vca-tabs li.is-active:hover {
    background-color: #006ab1;
}
.stripe-donation-button {
    cursor: pointer;
    margin-top: 1em;
    font-size: 1.3em;
    margin-bottom: 1em;
    height: 45px;
    width: 100%;
    background-color: #0070ba;
    color: #FFFFFF;
    padding: 0.5em 0;
    border: 0;
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: none;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
}

.newsletter input[type=checkbox] {
    border: none;
    color: #ccc;
}
</style>
