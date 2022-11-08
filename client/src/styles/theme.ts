import { DefaultTheme } from 'styled-components';

const colors = {
  black: '#3d3d40',
  blue: '#3184fe',
  red: '#de3a3a',
  yellow: '#fdce00',
  gray50: '#f2f2f2',
  gray100: '#e6e6e6',
  gray500: '#8f8e8f',
};

const sizes = {
  tablet: '768px',
  laptop: '1024px',
};

const config = {
  padding: '0 1em',
  tabletHeight: '100px',
  laptopHeight: '70px',
  header: '70px',
  border: '6px',
  main_margin_top: '20px',
};

const device = {
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
