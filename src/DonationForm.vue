<template>
    <div class="simple-donation">
        <div class="donation-form" v-if="!successView">
            <div class="vca">
                <form>
                <NameInput/>
                </form>
            </div>
            <MoneyInput v-model="payment.money" :amount="payment.money"/>
            <NameInput/>
            <sui-form>
                <sui-form-field class="classes.money">
                    <MoneyInput v-model="payment.money" :amount="payment.money"/>
                </sui-form-field>

                <sui-form-fields fields="two">
                    <sui-form-field :class="classes.firstNamae">
                        <input
                            v-model="payment.firstName"
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            v-validate="'required'"
                            />
                    </sui-form-field>
                    <sui-form-field :class="classes.lastName">
                        <input
                            v-model="payment.lastName"
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            v-validate="'required'"
                            />
                    </sui-form-field>
                </sui-form-fields>
                <sui-form-field :class="classes.email">
                    <input
                        v-model="payment.email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        v-validate="'required|email'"
                        @blur="validate"
                        />
                </sui-form-field>
                <Payment v-on:success="success" :payment="payment"/>
            </sui-form>
        </div>
        <div class="success-view" v-if="successView">
            <h2> Danke für deine Spende </h2>
            Bla blub blub plun gru tanablabla <br>
            Hmpfkle bimpkle Johnny Johnny Kaestle <br>
            UHHH NAA Freddy hnpg Frontend 
        </div>
    </div>
</template>
<script>
import { required, between } from 'vuelidate/lib/validators'
import MoneyInput from './components/MoneyInput'
import Payment from './components/Payment'
import NameInput from './components/NameInput'

export default {
    name: 'DonationForm',
    components: {MoneyInput, Payment, NameInput},
    data() {
        return {
            successView: false,
            payment: {
                email: '',
                firstName: '',
                lastName:'',
                loop: 'single',
                money: {
                    amount: 0,
                    currency: 'EUR'
                },
                address: null,
                newsletter: false
            },
            classes: {
                email: '',
                firstName: '',
                lastName: '',
                money: ''
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
        setFirstName (value){
            this.donation.firstName = value
        },
        setLastName (value){
            this.donation.lastName = value
        },

        success() {
            this.successView = true
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
    border: 1px solid #ccc;
    border-radius: 0.2rem;
    padding: 0.6em 1em;
    box-shadow: none;
}
.vca form .fields .first input {
    width: 100%;
    padding-right: 0.6em;
}
.vca form .fields .last input {
    width: 100%;
    padding-left: 0.6em;
}



</style>
