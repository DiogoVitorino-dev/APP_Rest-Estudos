import React from 'react';
import { useTheme } from '@react-navigation/native';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';

import Colors from '@/constants/Colors';
import { View } from './Themed';

interface IProps {
	lightColor?:string
	darkColor?:string
	style?:StyleProp<ViewStyle>
	children?:React.JSX.Element | React.JSX.Element[]
}

export function StyledView({children,style,darkColor,lightColor}:IProps) {
	const theme = useTheme();

	
	return (
	 <View 
			lightColor={lightColor || Colors['light'].backdrop} 
			darkColor={darkColor || Colors['dark'].backdrop} 
			style={[styles.container,style,{
				borderColor:Colors[theme.dark ? 'dark': 'light'].borderColor,				
			}]}>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	container:{				
		boxShadow:'3px 3px 10px rgba(0,0,0,0.1)',
		borderRadius:20,
		borderWidth:StyleSheet.hairlineWidth,	
		elevation:5
	},
});