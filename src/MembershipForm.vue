<template>
    <div class="membership">
        <div class="membership-form" v-if="!successView">
            <div class="vca">
                <vca-form>
                    <vca-field label="Betrag" >
                    <vca-field-row>
     
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
                    </vca-field>
                    <vca-field v-if="!isCH" label="Addresse">
                        <div class="vca-input-checkbox">
                            <label class="container">
                                <input type="checkbox" v-model="payment.offset.companey">
                                <span class="checkmark"></span>
                                Unternehmens-Fördermitgliedschaft?
                            </label>
                        </div>
                        <vca-input 
                            v-if="payment.offset.companey"
                            ref="email"
                            errorMsg="Bitte E-Mail Adresse eintragen"
                            placeholder="Name des Unternehmens"
                            v-model.trim="payment.supporter.companey" 
                            :rules="$v.payment.supporter.companey"/>
                        <vca-input 
                            ref="email"
                            errorMsg="Bitte E-Mail Adresse eintragen"
                            placeholder="Straße und Hausnummer"
                            v-model.trim="payment.supporter.street" 
                            :rules="$v.payment.supporter.street"/>
                        <vca-field-row>
                        <vca-input 
                            ref="first_name"
                            first
                            errorMsg="Bitte Vornamen eintragen"
                            placeholder="Plz"
                            v-model.trim="payment.supporter.zip" 
                            :rules="$v.payment.supporter.zip">
                        </vca-input>
                        <vca-input
                            ref="last_name"
                            last
                            errorMsg="Bitte Nachnamen eintragen"
                            placeholder="Ort"
                            v-model.trim="payment.supporter.city" 
                            :rules="$v.payment.supporter.city">
                        </vca-input>
                        </vca-field-row>
                        <div class="vca-input-checkbox">
                            <label class="container">
                                <input type="checkbox" v-model="payment.offset.data_privacy">
                                <span class="checkmark"></span>
Ich habe die <a href="https://www.vivaconagua.org/datenschutzerklaerung" target="_blank">Datenschutzerklärung</a> und die <a href="https://www.vivaconagua.org/agb" target="_blank">AGB</a> gelesen.
                            </label>
                        </div>
                        <div class="vca-input-checkbox">
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
export default {
    name: 'MembershipForm',
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
            companey: false,
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
                    abo: false,
                    interval: ''
                },
                loop: 'single',
                supporter: {
                    email: '',
                    first_name: '',
                    last_name: '',
                    street: '',
                    zip: '',
                    city: '',
                    country: 'DE',
                    companey: ''
                },
                money: {
                    amount: 0,
                    currency: 'EUR'
                },
                offset: {
                    companey: false,
                    data_privacy: false,
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
        }
    },
    methods: {
        setAmount (value) {
            if (value.amount > this.open) {
                this.unit.amount.amount = this.open
            } else {
                this.unit.amount = value
            }
        },
    }
}
</script>
