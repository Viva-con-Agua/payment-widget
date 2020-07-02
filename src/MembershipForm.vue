<template>
    <div class="membership">
        <div class="membership-form" v-if="!successView">
            <div class="vca">
                <vca-form>
                    <vca-tabs>
                        <vca-tab title="Meine Spende">
                            <StepOne @submit="submitStepOne"/>
                        </vca-tab>
                         <vca-tab title="Meine Kontaktdaten">
                             <StepTwo @submit="submitStepTwo"/>
                             <PaymentFooter :money="payment.money" :interval="payment.interval" />
                        </vca-tab>                       
                        <vca-tab title="Zahlungsart">
                            <StepThree :payment="payment" :label="getLabel" :country="country" :valid="$v.payment"/>
                        </vca-tab>
                        <vca-tab title="Danke!">
                            <StepThanks/>
                        </vca-tab>
                    </vca-tabs>                       
                </vca-form>
            </div>
        </div>

    </div>
</template>
<script>
import { required, email, minValue } from 'vuelidate/lib/validators'
import StepOne from './components/membership/StepOne'
import StepTwo from './components/membership/StepTwo'
import StepThree from './components/membership/StepThree'
import StepThanks from './components/membership/StepThanks'
import PaymentFooter from './components/PaymentFooter'
export default {
    name: 'MembershipForm',
    components: {StepOne, StepTwo, StepThree, StepThanks, PaymentFooter},
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
                supporter: {
                    email: '',
                    first_name: '',
                    last_name: '',
                    street: '',
                    zip: '',
                    city: '',
                    country: 'DE',
                    company_name: ''
                },
                money: {
                    amount: 0,
                    currency: 'EUR'
                },
                offset: {
                    company: false,
                    data_privacy: false,
                    newsletter: false,
                    known_from: ""
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
                return "Jetzt absenden"
            }
            return "Pay now"
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
        submitStepOne(interval, money) {
            this.payment.transaction.interval = interval
            this.payment.money = money
        },
        submitStepTwo(supporter, offset) {
            this.payment.supporter = supporter
            this.payment.offset = offset
        }
    }
}
</script>

<style>
.btn_deselected {
    background: #fff  !important;
    color: #008fc3 !important;
    //box-shadow: none !important;
    //-moz-box-shadow: none !important;
    //-webkit-box-shadow: none !important;
    border: solid thin transparent !important;
}
.btn_deselected:hover {
    color: #008fc3 !important;
    border: solid thin #008fc3 !important;
}
.membership-button:hover {
    background-color: #0070ba;
}

.membership-button:disabled {
    background: #fff;
    color: #008fc3;
    opacity: 0.3;
    cursor: default;
}

.membership-button {
    cursor: pointer;
    margin-top: 1em;
    font-size: 1.3em;
    margin-bottom: 1em;
    height: auto;
    width: auto;
    background-color: #008fc3;
    color: #fff;
    padding: 0.5em 1.2em;
    float: right;
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
</style>