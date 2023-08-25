import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import { useTheme } from '@react-navigation/native';

import Colors from '@/constants/Colors';
import { Button } from './Button';

interface IProps {
	title?:string
	loading?:boolean
	showIcon?:boolean
	style?:StyleProp<Omit<ViewStyle , 'backgroundColor'>>
	onPress: () => void
}

export function CancelButton({title,onPress,showIcon,loading,style}:IProps) {
	const theme = useTheme();
	return (
		<Button 
			title={title || 'Cancelar'}
			loading={loading}
			icon={showIcon ? {name:'close'} : undefined}
			style={[
				styles.button,{
					borderWidth:1,
					borderColor: Colors[theme.dark ? 'dark' : 'light'].borderColor
				},style]}
			rippleColor={Colors[theme.dark ? 'dark' : 'light'].borderColor + 50}
			backgroundColor='transparent'				
			onPress={() => onPress()}							
		/>
	);
};

const styles = StyleSheet.create({
	button:{
		margin:3
	},
});