<template>
    <div class="vca-input-checkbox">
        <label class="container">
            <input type="checkbox" v-model="value" @input="input">
            <span class="checkmark"></span>
            <slot></slot>
        </label>
        <span v-if="hasError">{{ errorMsg }}</span>
        <span v-else></span>
    </div>
</template>
<script>
export default {
    name: 'CheckBox',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        errorMsg: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: 'please fill'
        },
        rules: {
            type: Object,
            default: null
        },
        label: {
            type: String,
            default: ""
        }
    },
    data(){
        return {
            hasError: false
        }
    },
    methods: {
        input () {
            this.$emit('input', true)
        },
        // validate form via vuelidate
        validate () {
            // if validate is set
            if (this.rules !== null) {
                if (this.rules.$invalid) {
                    this.hasError = true
                } else {
                    this.hasError = false
                }
            }
        }
    }
}
</script>
