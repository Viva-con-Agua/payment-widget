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
                        </vca-tab>                       
                        <vca-tab title="Zahlungsart">
                            <StepThree/>
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
export default {
    name: 'MembershipForm',
    components: {StepOne, StepTwo, StepThree, StepThanks},
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
                    company_name: ''
                },
                money: {
                    amount: 0,
                    currency: 'EUR'
                },
                offset: {
                    company: false,
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
