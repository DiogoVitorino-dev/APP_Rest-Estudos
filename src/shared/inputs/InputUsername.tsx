import React from 'react';
import {StyleSheet} from 'react-native';
import { InputDefault } from './InputDefault';

interface IProps {
	value:string
	onChangeText: (text:string) => void
	error?:string
}

export function InputUsername({onChangeText,value,error}:IProps) {
	return (
		<InputDefault 
			textInputProps={{					
				value,
				textContentType:'familyName',
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