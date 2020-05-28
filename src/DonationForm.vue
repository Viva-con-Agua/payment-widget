<template>
    <div class="simple-donation">
        <div class="donation-form" v-if="!successView">
            <div class="vca">
                <form>
                    <NameInput v-model="payment.supporter"/>
                    <MoneyInput v-model="payment.money" :amount="payment.money"/>
                    <Payment v-on:success="success" :payment="payment"/>
                </form>
            </div>
        </div>
        <div class="success-view" v-if="successView">
            <h2> Danke für deine Spende </h2>
            {{ this.payment }}
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { required, between } from 'vuelidate/lib/validators'
import MoneyInput from './components/MoneyInput'
import Payment from './components/Payment'
import NameInput from './components/NameInput'

export default {
    name: 'DonationForm',
    components: {MoneyInput, Payment, NameInput},
    props: {
        description: {
            type: String,
            default: 'donation'
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
                provider: {
                    id: '',
                    name: '',
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
            }
        }
    },
    validators: {
        firstName: {
            between: between(0, 3),
            required
        }
    },
    computed: {
        validFirstName () {
            if ( this.payment.firstName === '' ) { return 'error' } else { return ''}
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
        setLastName (value){
            this.donation.lastName = value
        },

        success(e) {
            this.successView = true
            axios.post('http://localhost/api/v1/payment/success', e)
                .then(response => (
                    this.successContext = response.data
                ))
        },
        validate () {
            if ( this.formFields.email.invalid ) {
                this.er
            }
        },

    }

}
</script>
<style>
.simple-donation {
    width: 800px;
    position: center;

}
.vca form {
    width: 100%;
    max-width: 100%;
}
.vca form .fields {
    display: flex;
    flex-direction: row;
    margin: 0 0 1em;
}
.vca form .fields input {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 0.2rem;
    padding: 0.6em 1em;
    box-shadow: none;
}
.vca form .field {
    display: flex;
    flex-direction: row;
    margin: 0 0 1em;
}
.vca form .field input {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 0.2rem;
    padding: 0.6em 1em;
    box-shadow: none;
}
.vca form .fields .first {
    width: 100%;
    padding-right: 0.6em;
}
.vca form .fields .last {
    width: 100%;
    padding-left: 0.6em;
}



</style>
