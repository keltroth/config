# @keltroth/config

Configuration loader

## How to use

Install

```bash
npm install --save mereconf
```

Create a `config.json` file :

```json
{
  "application": {
    "port": 8080
  }
}
```


## Override value with env

To enable 12 factor app way of overriding config :

```dotenv
APPLICATION_PORT=9090
```

Use configuration value :

```javascript
import {config} from 'mereconf';
console.log(config.application.port);
```

Update configuration value :

```javascript
config.application.port=8080;
config.save();
```

