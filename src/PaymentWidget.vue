<template>
    <div id=payment-widget class="payment-widget">
        <div class="widget" v-if="donation">
            <CupSlide ref="amount_widget" @amount="setAmount"/>
        </div>
        <div style="display: flex" v-if="donation">
            <DonationForm ref="donation_form" v-on:success="success" :currency="currency" :campaign="campaign" :country="country" @replyAmount="replyAmount" :reqNewsletter="req_newsletter"/>
        </div>
        <div v-if="membership">
            <MembershipForm v-on:success="success"/>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
import MembershipForm from './MembershipForm'
import DonationForm from './DonationForm'
import CupSlide from './components/cups/CupSlide'
export default {
    name: 'PaymentWidget',
    components:{DonationForm, MembershipForm, CupSlide},
    props: {
        type: {
            type: String,
            default: 'donation'
        },
        campaign_id: {
            type: Number,
            default: 0
        },
        campaign_name: {
            type: String,
            default: 'Default campaign'
        },
        campaign_description: {
            type: String,
            default: 'Default description'
        },
        country: {
            type: String,
            default: 'DE'
        },
        currency: {
            type: String,
            default: 'EUR'
        },
        req_newsletter: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            campaign: {
                id: this.campaign_id,
                name: this.campaign_name,
                description: this.campaign_description
            }
        }
    },
    computed: {
        donation () {
            if (this.type === 'donation') {
                return true
            }else{
                return false
            }
        },
        membership () {
            if (this.type === 'membership') {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        success(e) {
            axios.post(process.env.VUE_APP_IROBERT_URL, JSON.stringify(e))
                .then(response => (
                    console.log(response.data)
                ))
        },
        setAmount(value) {
            this.$refs.donation_form.setAmount(value)
        },
        replyAmount(value) {
            this.$refs.amount_widget.replyAmount(value)
        }
    }
}
</script>
<style>
.payment-widget {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    width: auto;
    max-width: 1600px;
    position: center;
    margin: 0 auto;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;
}
.tabs-details {
    padding: 1em;
}

.selectbutton:hover {
    background-color: #0070ba;
}
.selectbutton {
    color: #fff;
    cursor: pointer;
    background-color: #008fc3;
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: none;
    
    border: solid thin transparent;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    
    
    width: auto;
    margin: 1em 2em;
    padding: 1.5em 2em;
}

@media only screen and (max-width: 600px) {
    .selectbutton {        
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
        -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
        -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);

        font-size: .9em;
        margin: 1em;

        padding: 1em 1.3em;
    }
}
</style>
