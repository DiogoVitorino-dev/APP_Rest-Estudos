
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import Colors  from '@/constants/Colors';

export type TMaterialIconNames = keyof typeof MaterialIcons.glyphMap

export interface IMaterialIconProps {
	name: TMaterialIconNames
  size?:number
  color?:string | OpaqueColorValue
	style?:StyleProp<TextStyle>
}

export function MaterialIcon({name, color, size, style}:IMaterialIconProps) {
	const theme = useTheme();	
	return (
		<MaterialIcons
			name={name}
			size={size || 25}
			color={color || Colors[theme.dark ? 'dark' : 'light'].iconDefault}
			style={[style]}
		/>
	);
};
