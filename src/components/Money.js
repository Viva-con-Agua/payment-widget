import React, { Component } from 'react'
import { Form, Dropdown } from 'semantic-ui-react'
import Money from '../utils/Money'

export default class MoneyInput extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        amount: 0,
        currency: 'EUR'
    }
    displayAmount = () => {
        return Money.getInputString(this.state.amount, this.state.currency)
    }
    handleChange = (name, value) => {
        this.props.handleChange(name, value)
    }
    handleAmount = (e) => {
        const amount = Money.getAmount(e.target.value)
        this.setState({amount: amount})
        this.handleChange('amount', amount)
       
    } 
    handleCurrency = (e, data) => {
        this.setState({currency: data.value})
        this.handleChange('currency', data.value)
    }
    currencyOption = [
    
        { key: 'EUR', value: 'EUR', text: '€' },
  
        { key: 'USD', value: 'USD', text: '$' },
  
        { key: 'FR', value: 'FR', text: 'Fr' },
    ]
    render() {
        return (
            <Form.Input fluid label='Betrag'  name='displayAmount' value={this.displayAmount()} onChange={this.handleAmount} >
            <input />
            <Dropdown button placeholder="€" options={this.currencyOption} onChange={this.handleCurrency}/>
            </Form.Input>
        )
    }
}
