<template>
    <div class="simple-donation">
        <div class="donation-form" v-if="!successView">
            <div class="vca">
                <vca-form>
                    <vca-field label="Betrag" >
                        <vca-money-input v-model="payment.money" :amount="payment.money"/>
                    </vca-field>
                        <vca-field label="Personal INfo">
                            <vca-input 
                                         errorMsg="Required Email" 
                                         v-model="payment.supporter.email" 
                                         :rules="$v.payment.supporter.email"/>
                            <vca-field-row>
                            <vca-input 
                                   first
                                   errorMsg="Required Email" 
                                   v-model="payment.supporter.first_name" 
                                   :rules="$v.payment.supporter.first_name">
                            </vca-input>
                            <vca-input
                                last
                                errorMsg="Required Email" 
                                v-model="payment.supporter.last_name" 
                                :rules="$v.payment.supporter.last_name">
                            </vca-input>
                            </vca-field-row>
                        </vca-field>

                        <Payment v-on:success="success" :payment="payment" :country="country"/>
                </vca-form>
            </div>
        </div>
        <div class="success-view" v-if="successView">
            <h2> Danke für deine Spende </h2>
            {{ this.payment }}
        </div>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import Payment from './components/Payment'

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
        campaign: {
            type: Object,
            default() {
                return {}
            }
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
            }
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
            }
        }
    },
    computed: {
        validFirstName () {
            if ( this.payment.firstName === '' ) { return 'error' } else { return ''}
        }
    },
    mounted() {
        this.payment.campaign = this.campaign
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
            this.$emit("success", e)
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

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    width: 500px;
    position: center;

}
.vca-form {
    width: 100%;
    max-width: 100%;
    padding: 0.6em 0.6em;
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
    display: inline-flex;
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
}

.vca-input input {
    width: 100%;
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
    color: #dc3545;
}


.vca-form form .vca-field .vca-money-input {
    width: 100%;
    display: inline-flex;
    border-radius: 0em;
    border: 0em;
}






.vca-form form .vca-field .vca-money-input input {
    width: 80%;
    border-radius: 0em;
    border-radius: 0.2rem;
    padding: 0.6em 1em;
    border: 1px solid #ccc;
    border-right: none;
    border-top-right-radius: 0em;
    border-bottom-right-radius: 0em;
    outline-color: #008fc2;

}

.vca-form form .vca-field .vca-money-input select {
    background: rgba(34,36,38,.15);
    width: 20%;
    border: none;
    border-left: none;
    border-top-left-radius: 0em;
    border-bottom-left-radius: 0em;
}


.vca-tabs ul{
  overflow: hidden;
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
  float: left;
border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    border: 1px solid transparent;
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

  background-color: #fff;
    border-color: #ccc #ccc #fff;
}





</style>
