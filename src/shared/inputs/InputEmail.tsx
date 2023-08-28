
import {StyleSheet} from 'react-native';
import { InputDefault } from './InputDefault';

interface IProps {
	value:string
	placeholder?:string
	onChangeText: (text:string) => void
	error?:string
}

export function InputEmail({onChangeText,value, placeholder,error}:IProps) {
	return (
		<InputDefault 
			textInputProps={{
				placeholder,
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