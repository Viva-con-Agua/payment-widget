# payment-widget

## Setup

### HTML  

Embedded in Website:
```
<payment-widget type="donation" campaign_id=123 campaign_name="Campaign 1" campaign_description="Campaign description 1" country="DE"></payment-widget>
<script src=/payment-widget.js></script>
```

### PARAMETER

```
type => [donation|membership]

The parameter describes the type of contribution that was made using the form
----
campaign_id => (int)

The parameter describes the ID of the campaign, which was created in civiCRM for the form
----
campaign_name => (string)

The parameter describes the name of the campaign, which was created in civiCRM for the form
----
campaign_description => (string)

The parameter describes campaign, which was created in civiCRM for the form
----
!Not fully implemented yet!
country => [DE|CH|AT]

The parameter describes if the newsletter will requested in widget
----
req_newsletter => (boolean)

The parameter describes the country in which the form is used. Depending on this, the corresponding payment methods respectively recipient accounts are used
```


### Success

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
        "provider":"paypal"
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
