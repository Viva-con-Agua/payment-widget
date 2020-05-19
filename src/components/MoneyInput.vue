<template>
    <div class="money-input">
    <input class="vca-input" ref="ta" v-model="displayAmount" :placeholder="label" :disabled="disabled" @change="change">
    <select v-model="amount.currency">
        <option label="€" value="EUR">€</option>
        <option label="$" value="USD">$</option>
        <option label="Fr" value="CHF">Fr</option>
    </select>
    </div>
</template>

<script>
    
import Money from '@/utils/Money'
export default {
  name: "MoneyInput",
  props: {
    amount: {
      type: Object,
      default: function () {
        return {
          "amount": 1233,
          "currency": "EUR"
        }
      }
    },
    rules: {
      type: Array,
      default: () => [{
        validator: () => false,
        msg: ""
      }]
    },
    label: {
      "type": String,
      "default": ""
    },
    disabled: {
      "type": Boolean,
      "default": false
    },
    size: {
      type: String,
      default: "medium"
    }
  },
  data () {
    return {
      "amountErrorState": false,
      "errorMsg": 'donation.hints.error.amount.pattern'
    }
  },
  computed: {
    displayAmount: {
      get: function () { 
        return Money.getInputString(this.amount.amount, this.amount.currency)
      },
      set: function(value) {
        this.amount.amount = Money.getAmount(value)
      }
    }
  },
  methods: {
    internalValidation(numeric) {
      return this.rules.reduce((acc, rule) => {
        var res = acc
        if(rule.validator(numeric)) {
          res = {
            "valid": false,
            "msg": rule.msg
          }
        }
        return res
      }, {
        "valid": true
      })
    },
    change() {
      this.$emit("change", this.amount)
    }
  }
}

</script>

<style scoped>
  .money-input {
    display: inline-flex;
  }
    .vca-money-wrapper.vca-error {
        margin-bottom: 2em;
    }
</style>
