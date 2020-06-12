import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import 'semantic-ui-css/semantic.min.css'
import VcaUi from 'vca-ui'

import Vuelidate from 'vuelidate'
import PaymentWidget from './PaymentWidget.vue'

Vue.use(Vuelidate)
Vue.use(VcaUi)
Vue.use(vueCustomElement)
Vue.config.productionTip = false
Vue.customElement('payment-widget', PaymentWidget)
