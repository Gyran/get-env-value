# get-env-value

Easily get parsed values from your environment.

Good to be used together with [dotenv](https://www.npmjs.com/package/dotenv)

## Install

### npm

```
npm install get-env-value --save
```

### yarn

```
yarn add get-env-value
```

## Usage

```js
import * as getEnvValue from 'get-env-value';

const Config = {
  DATABASE: {
    HOST: getEnvValue.stringValue('DATABASE_HOST'),
    NAME: getEnvValue.stringValue('DATABASE_NAME', 'woop'),
    PORT: getEnvValue.integerValue('DATABASE_PORT', 5432),
    USER: getEnvValue.stringValue('DATABASE_USER', 'user'),
    PASSWORD: getEnvValue.stringValue('DATABASE_PASSWORD'),
  },

  PORT: getEnvValue.integerValue('DATABASE_PORT', 3000),
};
```
