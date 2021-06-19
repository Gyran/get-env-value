export const stringValue = (key: string, defaultValue: string = '') => {
  const envValue = process.env[key];
  if (envValue) {
    return envValue;
  }

  return defaultValue;
};

export const integerValue = (key: string, defaultValue = 0): number => {
  const envValue = stringValue(key, '');
  const intValue = Number.parseInt(envValue, 10);
  if (Number.isInteger(intValue)) {
    return intValue;
  }

  return defaultValue;
};

export const booleanValue = (key: string, defaultValue = false) => {
  const envValue = stringValue(key);

  if (envValue === 'true') {
    return true;
  }

  if (envValue === 'false') {
    return false;
  }

  return defaultValue;
};

function parsedJSONValue<T>(key: string): T | undefined;
function parsedJSONValue<T>(key: string, defaultValue: T): T;
function parsedJSONValue<T>(key: string, defaultValue?: T): T | undefined {
  const envValue = stringValue(key);
  if (envValue) {
    try {
      return JSON.parse(envValue);
    } catch (error) {
      return defaultValue;
    }
  }

  return defaultValue;
}
export { parsedJSONValue };

const getEnvValue = {
  stringValue,
  integerValue,
  booleanValue,
  parsedJSONValue,
};

export default getEnvValue;
