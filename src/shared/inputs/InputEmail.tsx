import React from 'react';
import {StyleSheet} from 'react-native';
import { InputDefault } from './InputDefault';

interface IProps {
	value:string
	onChangeText: (text:string) => void
	error?:string
}

export function InputEmail({onChangeText,value,error}:IProps) {
	return (
		<InputDefault 
			textInputProps={{
				placeholder:'E-mail',
				value,
				textContentType:'emailAddress',
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