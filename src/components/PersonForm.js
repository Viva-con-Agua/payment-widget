import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

export default class PersonForm extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        firstName: '',
        lastName: ''
    }
    handleChange = (e) => {
        this.props.handleChange(e.target.name, e.target.value)
    }
    render() {
        return (
            <Form.Group widths='equal'>
            <Form.Input fluid label='First name' placeholder='First name' name="firstName" onChange={this.handleChange} />
            <Form.Input fluid label='Last name' placeholder='Last name' name='lastName' onChange={this.handleChange} />
            </Form.Group>
        )
    }
}

