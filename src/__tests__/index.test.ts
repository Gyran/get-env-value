import getEnvValue from '../index';

describe('get-env-value', () => {
  const ENV_BACKUP = process.env;

  beforeEach(() => {
    jest.resetAllMocks();
    process.env = { ...ENV_BACKUP };
  });
  afterAll(() => {
    process.env = ENV_BACKUP;
  });

  describe('string value', () => {
    test('returns the value if defined', () => {
      process.env.STRING = 'string';

      const value = getEnvValue.stringValue('STRING');
      const expected = 'string';

      expect(value).toBe(expected);
    });

    test('returns empty string if key is not defined', () => {
      delete process.env.STRING;

      const value = getEnvValue.stringValue('STRING');
      const expected = '';

      expect(value).toBe(expected);
    });

    test('returns provided default value if key is not defined', () => {
      delete process.env.STRING;

      const value = getEnvValue.stringValue('STRING', 'default');
      const expected = 'default';

      expect(value).toBe(expected);
    });

    test('returns value if defined even if we provide a default value', () => {
      process.env.STRING = 'string';

      const value = getEnvValue.stringValue('STRING', 'default');
      const expected = 'string';

      expect(value).toBe(expected);
    });
  });

  describe('integer value', () => {
    test('returns the value if defined', () => {
      process.env.INTEGER = '7';

      const value = getEnvValue.integerValue('INTEGER');
      const expected = 7;

      expect(value).toBe(expected);
    });

    test('returns 0 if the value is not defined', () => {
      delete process.env.INTEGER;

      const value = getEnvValue.integerValue('INTEGER');
      const expected = 0;

      expect(value).toBe(expected);
    });

    test('returns provided default value if key is not defined', () => {
      delete process.env.INTEGER;

      const value = getEnvValue.integerValue('INTEGER', 5);
      const expected = 5;

      expect(value).toBe(expected);
    });

    test('returns value if defined even if we provide a default value', () => {
      process.env.INTEGER = '7';

      const value = getEnvValue.integerValue('INTEGER', 5);
      const expected = 7;

      expect(value).toBe(expected);
    });
  });

  describe('boolean value', () => {
    test('returns false if env is not defined', () => {
      delete process.env.BOOLEAN;

      const value = getEnvValue.booleanValue('BOOLEAN');
      const expected = false;

      expect(value).toBe(expected);
    });

    test('returns the default if env is not defined but a default is defined', () => {
      delete process.env.BOOLEAN;

      const value = getEnvValue.booleanValue('BOOLEAN', true);
      const expected = true;

      expect(value).toBe(expected);
    });

    test.each([
      ['true', undefined, true],
      ['false', undefined, false],
      ['TRUE', true, true],
      ['TRUE', false, false],
      ['FALSE', true, true],
      ['FALSE', false, false],
      ['TrUe', true, true],
      ['TrUe', false, false],
    ])(
      'get boolean value when env is "%s" and default is %s',
      (env, defaultValue, expected) => {
        process.env.JEST_TEST_ENV = env;
        const value = getEnvValue.booleanValue('JEST_TEST_ENV', defaultValue);

        expect(value).toBe(expected);
      },
    );
  });

  describe('parsed json value', () => {
    test.each([
      ['true', undefined, true],
      ['false', undefined, false],
      ['[]', undefined, []],
      ['{}', undefined, {}],
      ['{"foo": 1}', undefined, { foo: 1 }],
      ['{"foo": "bar"}', undefined, { foo: 'bar' }],
      ['{"foo": {"bar": "baz"}}', undefined, { foo: { bar: 'baz' } }],
    ])(
      'get boolean value when env is "%s" and default is %s',
      (env, defaultValue, expected) => {
        process.env.JEST_TEST_ENV = env;
        const value = getEnvValue.parsedJSONValue(
          'JEST_TEST_ENV',
          defaultValue,
        );

        expect(value).toEqual(expected);
      },
    );

    test("returns defaultValue if can't parse json string", () => {
      process.env.JSON = 'not valid json';
      const defaultValue = {};
      const value = getEnvValue.parsedJSONValue('JSON', defaultValue);

      expect(value).not.toBe({});
      expect(value).toBe(defaultValue);
    });

    test("returns default value if env isn't defined", () => {
      delete process.env.JSON;
      const defaultValue = {};
      const value = getEnvValue.parsedJSONValue('JSON', defaultValue);

      expect(value).not.toBe({});
      expect(value).toBe(defaultValue);
    });
  });
});
