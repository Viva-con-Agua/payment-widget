/**
* Use the CSS tab above to style your Element's container.
*/
import React from 'react';
import {IbanElement} from '@stripe/react-stripe-js';
import './IbanFormStyles.css'

// Custom styling can be passed as options when creating an Element.
const IBAN_STYLE = {
  base: {
    color: '#32325d',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    },
    ':-webkit-autofill': {
      color: '#32325d',
    },
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a',
    ':-webkit-autofill': {
      color: '#fa755a',
    },
  }
};

const IBAN_ELEMENT_OPTIONS = {
  supportedCountries: ['SEPA'],
  // Elements can use a placeholder as an example IBAN that reflects
  // the IBAN format of your customer's country. If you know your
  // customer's country, we recommend that you pass it to the Element as the
  // placeholderCountry.
  placeholderCountry: 'DE',
  style: IBAN_STYLE,
};

export default function IbanForm({onSubmit, disabled}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-row">
        <label>
          IBAN
          <IbanElement options={IBAN_ELEMENT_OPTIONS} />
        </label>
      </div>


      {/* Display mandate acceptance text. */}
      <div className="mandate-acceptance">
        By providing your IBAN and confirming this payment, you are authorizing
        Rocketship Inc. and Stripe, our payment service provider, to send
        instructions to your bank to debit your account in accordance with those
        instructions. You are entitled to a refund from your bank under the terms
        and conditions of your agreement with your bank. A refund must be claimed
        within eight weeks starting from the date on which your account was debited.
      </div>
    </form>
  );
};
