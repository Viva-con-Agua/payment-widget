import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import VcaUi from 'vca-ui'
import VueCountryRegionSelect from 'vue-country-region-select'

import Vuelidate from 'vuelidate'
import PaymentWidget from './PaymentWidget.vue'

Vue.use(Vuelidate)
Vue.use(VcaUi)
Vue.use(VueCountryRegionSelect)   
Vue.use(vueCustomElement)
Vue.config.productionTip = false
Vue.customElement('payment-widget', PaymentWidget)
