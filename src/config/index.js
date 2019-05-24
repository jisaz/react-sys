/**
 * 全局config配置
 *
 */
const isDevEnv = process.env.REACT_APP_ENV === 'dev';
const isQaEnv = process.env.REACT_APP_ENV === 'qa';
const isProdEnv = process.env.REACT_APP_ENV === 'production';

export const isDev = isDevEnv;
export const isQa = isQaEnv;
export const isProd = isProdEnv;
export const requestUrl = isProdEnv ? '' : '';
