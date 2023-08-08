import React from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import { View } from './Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '@react-navigation/native';

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
				borderRadius:10,
				borderWidth:StyleSheet.hairlineWidth,
			}]}>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	container:{				
		boxShadow:'3px 3px 10px rgba(0,0,0,0.1)',		
		elevation:5
	},
});