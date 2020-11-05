# payment-widget

## Setup

### HTML  

Embedded in Website:
```
<payment-widget type="donation" campaign_id=123 campaign_name="Campaign 1" campaign_description="Campaign description 1" country="DE"></payment-widget>
<script src=/payment-widget.js></script>
```

### PARAMETER

**type => [donation|membership]**

The parameter describes the type of contribution that was made using the form

**campaign_id => (int)**

The parameter describes the ID of the campaign, which was created in civiCRM for the form

**campaign_name => (string)**

The parameter describes the name of the campaign, which was created in civiCRM for the form

**campaign_description => (string)**

The parameter describes campaign, which was created in civiCRM for the form

**country => [DE|CH|AT]** (!Not fully implemented yet!)

The parameter describes if the newsletter will requested in widget

**req_newsletter => (boolean)**

The parameter set the count of steps in slide. Default 10 for 10 Cups in Cupslide.

**slide_count => (Number)** 

The parameter set the default amount in cents. The slide recognizes the amount an set for example cups.

**amount => (Number)**

The parameter describes the country in which the form is used. Depending on this, the corresponding payment methods respectively recipient accounts are used

### Success for Donation

Send Json to crm service.
```
{
    "campaign":{
        "id":"",
        "name":"",
        "description":""
    },
    "transaction":{
        "id":"",
        "provider":""           # possible providers "", "paypal" and "stripe"
    },
    "loop":"single",
    "supporter":{
        "email":"",
        "first_name":"",
        "last_name":"",
        "country":""
    },
    "money":{
        "amount":12000,
        "currency":"EUR"
    },
    "offset":{
        "newsletter":false
    }
}
```

### Success for Membership

Send Json to crm service.
```
{
    campaign: {
        id: '',
        name: '',
        description: ''
    },
    transaction: {
        id: '',
        provider: '',           # possible providers "", "paypal" and "stripe"
        abo: true,
        interval: ''   // 'month' or 'year'        
        payment_type: 'sepa'   # possible payment_types "sepa", "paypal", "creditcard"   
        account: {
            iban:'',
            bic:''
        },
    },
    supporter: {
        email: '',
        first_name: '',
        last_name: '',
        street: '',
        zip: '',
        city: '',
        country: 'DE',                          // We need the country code for seperating AT CH and DE Payments.(Other payment Provider)
        country_name: 'Deutschland',            // Country fullname for correct addresses. ? country code part of the supporter model ?
        company_name: ''
    },
    money: {
        amount: 0,
        currency: 'EUR'
    },
    offset: {
        company: false,
        data_privacy: false,
        newsletter: false,
        known_from: ""            
    }
}
```


## Develop

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
