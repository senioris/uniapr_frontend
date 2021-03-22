import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { AppState } from './redux/App';

declare module '@material-ui/core/styles/createPalette' {}

export const theme = (state: AppState): Theme => {
  return createMuiTheme({
    palette: {
      primary: {
        light: '#5c67a3',
        main: state.isDark ? '#a1046d' : '#004771',
        dark: '#2e355b',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff79b0',
        main: '#ff4081',
        dark: '#c60055',
        contrastText: '#000',
      },
      type: state.isDark ? 'dark' : 'light',
    },
  });
};

export default theme;
