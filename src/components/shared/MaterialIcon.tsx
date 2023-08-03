import Colors from '@/constants/Colors';
import { TMaterialIconNames } from '@/constants/Types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle, useColorScheme } from 'react-native';

interface IProps {
	name: TMaterialIconNames
  size?:number
  color?:string | OpaqueColorValue
	style?:StyleProp<TextStyle>
}

export function MaterialIcon({name, color, size, style}:IProps) {
	const colorScheme = useColorScheme();
	return (
		<MaterialCommunityIcons
			name={name}
			size={size || 25}
			color={color || Colors['dark' ?? colorScheme].tabIconDefault}
			style={style}
		/>
	);
};
