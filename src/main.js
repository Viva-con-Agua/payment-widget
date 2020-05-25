import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'

import DonationForm from './DonationForm.vue'
import MembershipForm from './Membership.vue'
import VeeValidate from 'vee-validate'

Vue.use(SuiVue)
Vue.use(VeeValidate, {fieldsBagName: 'formFields'})
Vue.use(vueCustomElement)
Vue.config.productionTip = false
Vue.customElement('donation-form', DonationForm)
Vue.customElement('membership-form', MembershipForm)
