const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const borderColorLight = 'rgb(220,220,220)';
const borderColorDark = 'rgb(50,50,50)';

export default {
  light: {
    text: '#000',
    borderColor:borderColorLight,
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    borderColor:borderColorDark,
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
