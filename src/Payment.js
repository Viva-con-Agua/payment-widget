import React, { Component } from 'react'
import { Form, Label } from 'semantic-ui-react'
import PaymentTab from './PaymentTab'
import DropdownCountry from './DropdownCountry'
import Interval from './Interval'

class PaymentForm extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    return (
      <Form>
        <Form.Group widths='equal'>
            <Form.Input fluid label='Betrag' placeholder='First name'>
                <input />
                <Label>€</Label>
            </Form.Input>
        </Form.Group>
        <Form.Field label='Spendenintervall auswählen' control={Interval}/>
        <Form.Group widths='equal'>
          <Form.Input fluid label='First name' placeholder='First name' />
          <Form.Input fluid label='Last name' placeholder='Last name' />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Email' placeholder='Email' />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Straße, Hausnummer' placeholder='Straße, Hausnummer' />
        </Form.Group>       <Form.Group widths='equal'>
          <Form.Input fluid label='PLZ' width={2} placeholder='PLZ' />
          <Form.Input fluid label='Stadt' placeholder='Stadt' />
        </Form.Group>
        <Form.Group>
            <DropdownCountry/>
        </Form.Group>
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <PaymentTab/>
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}

export default PaymentForm
