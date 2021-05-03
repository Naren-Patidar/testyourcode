import type { Config } from '@jest/types';
import { config } from '../../../jest.config';

module.exports = {
  ...config,
  testMatch: ['**/**.test.ts'],
};
export const sampleConfig: Config.InitialOptions = {};
