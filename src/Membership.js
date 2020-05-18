import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import PaymentTab from './components/PaymentTab'
import DropdownCountry from './components/DropdownCountry'
import Interval from './components/Interval'
import MoneyInput from './components/Money'



export default class Membership extends Component {
    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this)
    }
    state = {
        amount: 0,
        currency: 'EUR',
        firstName: '',
        lastName: '',
        email: ''
    }

    handleChange = (name, value) => this.setState({ [name]: value })
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
            <MoneyInput handleChange={this.handleChange}/>
            </Form.Group>
            <Form.Field label='Spendenintervall auswählen' control={Interval}/>
            <Form.Group widths='equal'>
            <Form.Input fluid label='First name' placeholder='First name' name="firstName" onChange={this.handleChange} />
            <Form.Input fluid label='Last name' placeholder='Last name' name='lastName' onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group widths='equal'>
            <Form.Input fluid label='Email' placeholder='Email' name='email' onChange={this.handleChange} />
            </Form.Group>
            <Form.Group disable={true} widths='equal'>
            <Form.Input fluid label='Straße, Hausnummer' placeholder='Straße, Hausnummer' />
            </Form.Group>      
            <Form.Group widths='equal'>
            <Form.Input fluid label='PLZ' width={2} placeholder='PLZ' />
            <Form.Input fluid label='Stadt' placeholder='Stadt' />
            </Form.Group>
            <Form.Group>
            <DropdownCountry/>
            </Form.Group>
            <Form.Checkbox label='I agree to the Terms and Conditions' />
            <PaymentTab data={this.state}/>
            </Form>
        )
    }
}
