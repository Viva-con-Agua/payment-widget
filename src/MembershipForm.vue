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
            <sui-form-field>
                    <input
                        type="text"
                        name="shipping[last-name]"
                        placeholder="Straße, Hausnummer"
                        />
                </sui-form-field>
            <sui-form-fields fields="two">
                <sui-form-field>
                    <input
                        type="text"
                        name="shipping[first-name]"
                        placeholder="PLZ"
                        />
                </sui-form-field>
                <sui-form-field>
                    <input
                        type="text"
                        name="shipping[last-name]"
                        placeholder="Stadt"
                        />
                </sui-form-field>
            </sui-form-fields>
            <Payment/>
        </sui-form>
    </div>
</template>
<script>

import MoneyInput from './components/MoneyInput'
import Payment from './components/Payment'
export default {
    name: 'MembershipForm',
    components: {MoneyInput, Payment},
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
