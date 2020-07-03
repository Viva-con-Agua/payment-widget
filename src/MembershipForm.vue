<template>
    <div class="membership">
        <div class="membership-form" v-if="!successView">
            <div class="vca">
                <vca-form>
                    <HeaderSteps :currentStep=step :steps=steps />
                    <StepOne v-if="step === 1" @submit="submitStepOne"/>
                    <StepTwo v-if="step === 2" @submit="submitStepTwo" @back="backStepOne" :supp="payment.supporter" :off="payment.offset"/>
                    <StepThree v-if="step === 3" :payment="payment" :country="country" :valid="$v.payment" @back="backStepTwo" @success="success"/>
                    <StepThanks v-if="step === 4"/>
                     <PaymentFooter v-if="step === 3 || step === 2" :money="payment.money" :interval="payment.interval" />
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
import HeaderSteps from './components/HeaderSteps'
export default {
    name: 'MembershipForm',
    components: {StepOne, StepTwo, StepThree, StepThanks, PaymentFooter, HeaderSteps },
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
            step: 1,
            steps: 
            [
                {id: 1, label: 'Meine Spende' },
                {id: 2, label: 'Meine Kontaktdaten' },
                {id: 3, label: 'Zahlungsart' },
                {id: 4, label: 'Danke!' }
            ],
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
            this.step = 2
        },
        backStepOne() {
            this.step = 1
        },
        backStepTwo() {
            this.step = 2
        },
        submitStepTwo(supporter, offset) {
            this.payment.supporter = supporter
            this.payment.offset = offset
            this.step = 3
        },
        success() {
            this.step = 4
        }
    }
}
</script>

<style>

/*
    CSS SELECTION BUTTON
*/

.btn_deselected {
    background: #fff  !important;
    color: #008fc3 !important;
    border: solid thin transparent !important;
    box-shadow: none !important;
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
}

.btn_deselected:hover {
    color: #008fc3 !important;
    border: solid thin #008fc3 !important;
}

/*
    CSS DROP BUTTON
*/
.btn_drop {
    cursor: pointer;
    background-image: url("~@/assets/icon_drop.png");
    background-size: contain;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    min-width: 170px;
    min-height: 200px;
    height: 100%;
    color: #fff;
    border: solid thin transparent;
    font-weight: bold;
    text-decoration: none;
    vertical-align: middle;
    flex: auto;
    flex-basis: 100%;
    margin: 0 auto;
}

.btn_drop_deselected:hover {
    color: #008fc3 !important;
    background-image: url("~@/assets/icon_drop_white_outline.png");
}
.btn_drop_deselected {
    color: #008fc2;
    background-image: none;
}

.btn_drop img {
    width: 40px;
    position: relative;
    bottom: 10px;
}

/*
    CSS NAVIGATION BUTTON
*/

.btn_nav,
.btn_nav_back {
    cursor: pointer;
    margin: 1em 5px;
    font-size: 1.3em;
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

.btn_nav:hover,
.btn_nav-back:hover {
    background-color: #0070ba;
}

.btn_nav:disabled,
.btn_nav_back:disabled {
    background: #fff;
    color: #008fc3;
    opacity: 0.3;
    cursor: default;
}

.btn_nav_back {
    float: left;
}


@media only screen and (max-width: 600px) {

    /*
        CSS SELECTION BUTTON
    */
    .btn_deselected {
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19) !important;
        -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19) !important;
        -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19) !important;
    }

    /*
        CSS DROP BUTTON
    */
    .btn_drop {
        max-width: 170px;
    }
    .btn_drop_deselected {
        background-image: url("~@/assets/icon_drop_white_outline.png");
    }

    /*
        CSS NAVIGATION BUTTON
    */
    .btn_nav,
    .btn_nav_back {
        font-size: 12px;
    }


}

</style>
