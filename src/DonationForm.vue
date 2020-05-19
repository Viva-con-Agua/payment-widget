<template>
    <div id="donation-form">
        <sui-form>
            <sui-form-field>
                <MoneyInput v-model="donation.money" :amount="donation.money"/>
            </sui-form-field>
            <sui-form-fields fields="two">
                <sui-form-field>
                    <input
                        type="text"
                        name="shipping[first-name]"
                        placeholder="First Name"
                        />
                </sui-form-field>
                <sui-form-field>
                    <input
                        type="text"
                        name="shipping[last-name]"
                        placeholder="Last Name"
                        />
                </sui-form-field>
            </sui-form-fields>
            <sui-form-field>
                <input
                    type="text"
                    name="shipping[last-name]"
                    placeholder="Email"
                    />
            </sui-form-field>
            <sui-tab >
                <sui-tab-pane title="Circle">
                    <SEPA/>
                </sui-tab-pane>
                <sui-tab-pane title="Box">
                    <CreditCard/>
                </sui-tab-pane>
                <sui-tab-pane title="Triangle">
                    Triangle
                </sui-tab-pane>
            </sui-tab>
        </sui-form>
    </div>
</template>
<script>

import MoneyInput from './components/MoneyInput'
import SEPA from './components/SEPA'
import CreditCard from './components/CreditCard'
export default {
    name: 'DonationForm',
    components: {MoneyInput, SEPA, CreditCard},
    data() {
        return {
            donation: {
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
            }
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
