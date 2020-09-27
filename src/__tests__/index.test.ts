import * as getEnvValue from '../index';

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

      expect(value).toEqual(expected);
    });

    test('returns empty string if key is not defined', () => {
      delete process.env.STRING;

      const value = getEnvValue.stringValue('STRING');
      const expected = '';

      expect(value).toEqual(expected);
    });

    test('returns provided default value if key is not defined', () => {
      delete process.env.STRING;

      const value = getEnvValue.stringValue('STRING', 'default');
      const expected = 'default';

      expect(value).toEqual(expected);
    });

    test('returns value if defined even if we provide a default value', () => {
      process.env.STRING = 'string';

      const value = getEnvValue.stringValue('STRING', 'default');
      const expected = 'string';

      expect(value).toEqual(expected);
    });
  });
});
