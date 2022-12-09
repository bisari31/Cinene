import { DefaultTheme } from 'styled-components';

const colors = {
  red: '#de3a3a',
  purple: '#4e30ca',
  blue: '#3184fe',
  orange: '#f9690a',
  yellow: '#fdce00',
  pink: '#dd3b5f',
  navy: '#181920',
  navy50: '#2e2f3a',
  black: '#101010',
  black50: '#2e2e2e',
  white: '#ffffff',
  gray50: '#f2f2f2',
  gray100: '#e6e6e6',
  gray300: '#bbbbbb',
  gray500: '#8f8e8f',
};

const sizes = {
  tablet: '768px',
  laptop: '1024px',
};

export const config = {
  padding: '0 1em',
  header: '70px',
  border: '16px',
  main_margin_top: '0px',
};

const device = {
  mobile: `(max-width: ${sizes.tablet})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
};

const theme: DefaultTheme = {
  colors,
  sizes,
  device,
  config,
};

export type ColorsKey = keyof typeof colors;
export type Config = typeof config;
export type Colors = typeof colors;
export type Sizes = typeof sizes;
export type Device = typeof device;

export default theme;
