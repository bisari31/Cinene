import 'styled-components';
import { Colors, Config, Device, Sizes } from 'styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    sizes: Sizes;
    device: Device;
    config: Config;
  }
}
