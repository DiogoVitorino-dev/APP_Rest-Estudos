import { Text as DefaultText, View as DefaultView } from 'react-native';

import Colors  from '@/constants/Colors';
import { useTheme } from '@react-navigation/native';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
	props: { light?: string; dark?: string },
	colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
	const theme = useTheme();
	const colorFromProps = props[theme.dark ? 'dark' : 'light'];

	if (colorFromProps) {
		return colorFromProps;
	} else {
		return Colors[theme.dark ? 'dark' : 'light'][colorName];
	}
}

export function Text(props: TextProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

	return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;  
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

	return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
