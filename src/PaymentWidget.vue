<template>
    <div id=payment-widget>
    <div v-if="donation">
        <DonationForm/>
    </div>
    <div v-if="membership">
        <MembershipForm/>
    </div>
    </div>
</template>
<script>

import MembershipForm from './MembershipForm'
import DonationForm from './DonationForm'
export default {
    name: 'PaymentWidget',
    components:{DonationForm, MembershipForm},
    props: {
        type: {
            type: String,
            default: 'donation'
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


    }
}
</script>
