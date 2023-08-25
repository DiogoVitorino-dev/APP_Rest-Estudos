import React from 'react';
import {StyleSheet} from 'react-native';
import { InputDefault } from './InputDefault';

interface IProps {
	value:string
	placeholder?:string
	onChangeText: (text:string) => void
	error?:string
}

export function InputNameCity({onChangeText,placeholder,value,error}:IProps) {
	return (
		<InputDefault 
			textInputProps={{					
				value,
				placeholder,
				textContentType:'addressCity',
				onChangeText					
			}}
			errorMessage={error}
			style={styles.input}
		/>	 
	);
};

const styles = StyleSheet.create({
	input:{
		marginBottom:10
	},
});