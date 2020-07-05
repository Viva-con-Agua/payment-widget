<template>
    <div class="steptwo">
        <vca-field label="Ich spende via">
            <div class="paymentview">
                <PaymentButtons v-on:success="success" v-on:paymentType="setPaymentType" :payment="payment" :label="label" :country="country" :valid="valid" @notValid="notValid"/>
            </div>
        </vca-field>
        <vca-field  v-if="paymentType == 'sepa'" label="Weitere Angaben">
            <CheckBox
                errorMsg="Bitte bestätige die Ermächtigung">
                        Ich ermächtige Viva con Agua de Sankt Pauli e.V., Zahlungen von meinem Konto mittels Lastschrift zum 15. des Folgemonats einzuziehen. Zugleich weise ich mein Kreditinstitut an, die von Viva con Agua de Sankt Pauli e.V. auf mein Konto gezogene Lastschrift einzulösen.<br>
                        <strong>Hinweis:</strong> Ich kann innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrags verlangen. Es gelten dabei die mit meinem Kreditinstitut vereinbarten Bedingungen.
            </CheckBox>
        </vca-field>
        <div class="nav-btn-container">
            <div class="nav-back">
                <button class="submit nav-btn-back>" @click.prevent="back"> Zurück zu Schritt 2 </button>
            </div>
        </div>
    </div>
</template>
<script>
import PaymentButtons from '../PaymentButtons'
import CheckBox from '../utils/CheckBox'
export default {
    name: 'StepThree',

    props: ['payment', 'country', 'valid', 'label'],
    components: {PaymentButtons, CheckBox},
    data() {
        return {
            paymentType: 'sepa'
        }
    },
    methods: {
        success() {
            this.$emit("success")
        },
        notValid() {
            this.$emit("notValid")
        },
        back() {
            this.$emit("back")
        },
        setPaymentType(val) {
            this.paymentType = val
        }
    }

}
</script>