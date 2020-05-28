# payment-widget

## Setup

### HTML  

Embedded in Website:
```
<payment-widget type=donation></payment-widget>
<script src=/payment-widget.js></script>
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
    "provider":{
        "id":"",
        "name":"paypal"
    },
    "loop":"single",
    "supporter":{
        "email":"",
        "first_name":"",
        "last_name":""
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
