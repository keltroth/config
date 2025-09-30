# @keltroth/config

Configuration loader

## How to use

Install

```bash
npm install --save @keltroth/config
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
import {config} from '@keltroth/config';
console.log(config.get('application.port'));
```

## TODO

Save values (only if already present in json file)
