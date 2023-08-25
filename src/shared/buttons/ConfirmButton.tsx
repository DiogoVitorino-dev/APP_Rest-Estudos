import React from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';

import { Button } from './Button';

interface IProps {
	title?:string
	loading?:boolean
	disabled?:boolean
	showIcon?:boolean
	style?:StyleProp<Omit<ViewStyle , 'backgroundColor'>>
	onPress: () => void
}

export function ConfirmButton({onPress,disabled,showIcon,style,loading,title}:IProps) {
	return (
		<Button 
			title={title || 'Confirmar'} 
			loading={loading}
			disabled={disabled}
			style={[styles.button,style]}
			icon={showIcon ? {name:'check'} : undefined}
		 	onPress={() => onPress()} 
		/>
	);
};

const styles = StyleSheet.create({
	button:{
		margin:3
	},
});