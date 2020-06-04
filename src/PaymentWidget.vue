<template>
    <div id=payment-widget>
    <div v-if="donation">
        <DonationForm v-on:success="success" :campaign="campaign"/>
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
export default {
    name: 'PaymentWidget',
    components:{DonationForm, MembershipForm},
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
            }else{
                return false
            }
        },
    },
    methods: {
       success(e) {
            console.log("Will send data to iRobert:")
            console.log(JSON.stringify(e))
            axios.post('http://localhost:1323/api/v1/payment/success', e)
                .then(response => (
                    console.log(response.data)
                ))
        },
    }
}
</script>
