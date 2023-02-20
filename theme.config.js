import {Appearance} from 'react-native';
const theme = Appearance.getColorScheme(); // returns dark or light

const FontFamily = {
  regular: 'Lato-Regular',
  bold: 'Lato-Bold',
  black: 'Lato-Black',
  light: 'Lato-Light',
  thin: 'Lato-Thin',
  italic: 'Lato-Italic',
  blackItalic: 'Lato-BlackItalic',
  boldItalic: 'Lato-BoldItalic',
};

const ColorTheme = {
  light: {
    primary: '#EE4681',
    secondary: '#C51754',
    background: '#FBFBFB',
    error: '#D9381E',
    info: '#051094',
    success: '#7CFC00',
    warning: '#FEE227',
    accent: '#f0f6fc',
  },
  dark: {
    primary: '#EE4681',
    secondary: '#E990AF',
    background: '#28171D',
    error: '#B2544F',
    info: '#5B3169',
    success: '#98AF52',
    warning: '#D5B556',
    accent: '#E3DADD',
  },
};
export default {
  FontFamily,
  ColorTheme: ColorTheme[theme],
  defaultTheme: theme,
};
